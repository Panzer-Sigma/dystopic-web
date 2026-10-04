import { useSyncExternalStore } from "react";

export interface CartLine {
  slug: string;
  name: string;
  /** Unit price in centavos. */
  price: number;
  image?: string;
  size: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  open: boolean;
}

const STORAGE_KEY = "dystopic-cart";
const SERVER_STATE: CartState = { lines: [], open: false };

// ponytail: module-level store, client-only, no cross-tab sync; swap for a server cart when checkout gets a backend.
let state: CartState | null = null;
const listeners = new Set<() => void>();

function getState(): CartState {
  if (state === null) {
    let lines: CartLine[] = [];
    try {
      lines = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      // Private mode or corrupt data: start with an empty cart.
    }
    state = { lines, open: false };
  }
  return state;
}

function setState(next: CartState) {
  if (next.lines !== getState().lines) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next.lines));
    } catch {
      // Storage unavailable: the cart still works for this visit.
    }
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

/** Adds one unit (merging with an existing line of the same size) and opens the cart. */
export function addToCart(item: Omit<CartLine, "qty">) {
  const { lines } = getState();
  const exists = lines.some((l) => l.slug === item.slug && l.size === item.size);
  const next = exists
    ? lines.map((l) => (l.slug === item.slug && l.size === item.size ? { ...l, qty: l.qty + 1 } : l))
    : [...lines, { ...item, qty: 1 }];
  setState({ lines: next, open: true });
}

/** Sets a line's quantity; zero or less removes it. */
export function setQty(slug: string, size: string, qty: number) {
  const { lines } = getState();
  const next =
    qty <= 0
      ? lines.filter((l) => !(l.slug === slug && l.size === size))
      : lines.map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l));
  setState({ ...getState(), lines: next });
}
