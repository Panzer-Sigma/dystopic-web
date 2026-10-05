"use client";

import { setCartOpen, useCart } from "@/store/cart";

/** Fixed filled bag with the item count inside (golfwang-style); opens the cart drawer. */
export default function CartButton() {
  const { lines } = useCart();
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      aria-label={`Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}`}
      className="fixed top-3 right-3 md:top-5 md:right-6 z-40 w-9 h-11 md:w-11 md:h-13 hover:brightness-125 transition-all cursor-pointer"
    >
      <svg viewBox="0 0 24 28" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="#e4e0ff" strokeWidth="2.6" />
        <rect x="2" y="10" width="20" height="17" fill="#e4e0ff" />
      </svg>
      <span className="absolute inset-x-0 bottom-[12%] text-center font-display font-bold text-[#16164f] text-base md:text-lg tabular-nums">
        {count}
      </span>
    </button>
  );
}
