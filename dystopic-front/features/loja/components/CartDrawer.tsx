"use client";

import { useEffect, useRef } from "react";
import { setCartOpen, setQty, useCart } from "@/store/cart";
import ProductImage from "./ProductImage";
import { formatPrice } from "../data";

const qtyButton = "w-8 h-8 md:w-9 md:h-9 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer";
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
          <ul>
            {lines.map((line) => (
              <li key={`${line.slug}-${line.size}`} className="flex gap-4 py-6">
                <div className="w-[42%] shrink-0">
                  <ProductImage src={line.image} alt={line.name} sizes="180px" />
                </div>
                <div className="flex flex-col gap-2 tracking-wider">
                  <p className="uppercase">{line.name}</p>
                  <p>Tam. {line.size}</p>
                  <div className="flex items-center gap-5">
                    <button type="button" onClick={() => setQty(line.slug, line.size, line.qty - 1)} aria-label="Diminuir quantidade" className={qtyButton}>-</button>
                    <span className="text-xl tabular-nums" aria-live="polite">{line.qty}</span>
                    <button type="button" onClick={() => setQty(line.slug, line.size, line.qty + 1)} aria-label="Aumentar quantidade" className={qtyButton}>+</button>
                  </div>
                  <p>{formatPrice(line.price * line.qty)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={divider} />

        <div className="flex items-baseline justify-between mt-5 text-2xl font-semibold">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>

        {/* ponytail: no checkout backend yet; wire this to the payment flow when it exists. */}
        <button
          type="button"
          disabled={lines.length === 0}
          className="block mx-auto mt-8 px-8 py-2 bg-[#16164f] border-2 border-neutral-500 text-2xl font-semibold enabled:hover:brightness-125 disabled:opacity-50 cursor-pointer disabled:cursor-default"
        >
          &gt;Checkout
        </button>

        <p className="mt-8 text-center text-sm uppercase tracking-widest">A taxa de entrega é calculada no checkout.</p>
      </aside>
    </div>
  );
}
