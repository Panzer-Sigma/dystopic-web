import { useSyncExternalStore } from "react";

export interface CartLine {
  slug: string;
  name: string;
  /** Unit price in centavos. */
  price: number;
  image?: string;
  size: string;
  qty: number;
  /** Units in stock for this size; qty never exceeds it. */
  max: number;
}

interface CartState {
  lines: CartLine[];
  open: boolean;
  /** Code of the last order sent to WhatsApp, kept so it can be tracked later. */
  lastOrder: string | null;
}

const LINES_KEY = "dystopic-cart";
const ORDER_KEY = "dystopic-last-order";
const SERVER_STATE: CartState = { lines: [], open: false, lastOrder: null };

// ponytail: module-level store, client-only, no cross-tab sync; swap for a server cart when checkout gets a backend.
let state: CartState | null = null;
const listeners = new Set<() => void>();

function getState(): CartState {
  if (state === null) {
    state = { ...SERVER_STATE };
    try {
      // Carts saved before stock limits existed have no `max`; every size holds one piece.
      state.lines = (JSON.parse(localStorage.getItem(LINES_KEY) ?? "[]") as (Omit<CartLine, "max"> & { max?: number })[]).map((l) => ({ ...l, max: l.max ?? 1 }));
      state.lastOrder = localStorage.getItem(ORDER_KEY);
    } catch {
      // Private mode or corrupt data: start with an empty cart.
    }
  }
  return state;
}

function setState(next: CartState) {
  const prev = getState();
  try {
    if (next.lines !== prev.lines) localStorage.setItem(LINES_KEY, JSON.stringify(next.lines));
    if (next.lastOrder !== prev.lastOrder && next.lastOrder) localStorage.setItem(ORDER_KEY, next.lastOrder);
  } catch {
    // Storage unavailable: the cart still works for this visit.
  }
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useCart(): CartState {
  return useSyncExternalStore(subscribe, getState, () => SERVER_STATE);
}

export function setCartOpen(open: boolean) {
  setState({ ...getState(), open });
}

const sameLine = (l: CartLine, slug: string, size: string) => l.slug === slug && l.size === size;

/** Adds one unit (up to the size's stock, merging with an existing line) and opens the cart. */
export function addToCart(item: Omit<CartLine, "qty">) {
  const { lines } = getState();
  const exists = lines.some((l) => sameLine(l, item.slug, item.size));
  const next = exists
    ? lines.map((l) => (sameLine(l, item.slug, item.size) ? { ...l, qty: Math.min(l.qty + 1, l.max) } : l))
    : [...lines, { ...item, qty: 1 }];
  setState({ ...getState(), lines: next, open: true });
}

/** Sets a line's quantity, capped at its stock; zero or less removes it. */
export function setQty(slug: string, size: string, qty: number) {
  const { lines } = getState();
  const next =
    qty <= 0
      ? lines.filter((l) => !sameLine(l, slug, size))
      : lines.map((l) => (sameLine(l, slug, size) ? { ...l, qty: Math.min(qty, l.max) } : l));
  setState({ ...getState(), lines: next });
}

/** Empties the cart, remembers a new order code for tracking, and returns that code. */
export function placeOrder(): string {
  // ponytail: client-made code, no backend; WhatsApp is the order book until payments exist.
  const code = `DYS-${Date.now().toString(36).toUpperCase()}`;
  setState({ lines: [], open: false, lastOrder: code });
  return code;
}
