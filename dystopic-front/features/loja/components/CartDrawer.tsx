"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { setCartOpen, useCart } from "@/store/cart";
import CartLines from "./CartLines";
import { formatPrice } from "../data";

const divider = "border-t-4 border-dotted border-white/90";

/** Right-side cart panel ("SEU CARRINHO"), opened by the cart button or by adding a product. */
export default function CartDrawer() {
  const { lines, open } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        onClick={() => setCartOpen(false)}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Seu carrinho"
        className={`absolute inset-y-0 right-0 w-full sm:w-[440px] bg-black text-white font-display overflow-y-auto px-5 py-6 md:px-7 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-outline text-3xl md:text-4xl font-bold uppercase tracking-wide">Seu carrinho</h2>
          <button ref={closeRef} type="button" onClick={() => setCartOpen(false)} aria-label="Fechar carrinho" className="text-3xl leading-none px-1 hover:brightness-150 cursor-pointer">
            ×
          </button>
        </div>

        <div className={`${divider} mt-6`} />

        {lines.length === 0 ? (
          <p className="py-10 text-center uppercase tracking-wider text-white/70">Seu carrinho está vazio.</p>
        ) : (
          <CartLines lines={lines} />
        )}

        <div className={divider} />

        <div className="flex items-baseline justify-between mt-5 text-2xl font-semibold">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>

        <Link
          href="/loja/checkout"
          onClick={() => setCartOpen(false)}
          aria-disabled={lines.length === 0}
          className={`btn-primary block w-fit mx-auto mt-8 text-2xl ${lines.length === 0 ? "pointer-events-none opacity-50" : ""}`}
        >
          &gt;Checkout
        </Link>

        <p className="mt-8 text-center text-sm uppercase tracking-widest">A taxa de entrega é calculada no checkout.</p>
      </aside>
    </div>
  );
}
