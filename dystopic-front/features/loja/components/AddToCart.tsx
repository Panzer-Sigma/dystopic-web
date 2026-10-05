"use client";

import { useState } from "react";
import { addToCart, setCartOpen, useCart } from "@/store/cart";
import type { Product } from "@/types/loja";

/** Size picker plus add button; sold-out sizes are marked Esgotado and adding opens the cart drawer. */
export default function AddToCart({ product }: { product: Product }) {
  const { lines } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const sizes = Object.entries(product.stock);
  const soldOut = sizes.every(([, units]) => units <= 0);
  const inCart = lines.find((l) => l.slug === product.slug && l.size === size);
  const atLimit = !!size && !!inCart && inCart.qty >= product.stock[size];

  return (
    <div className="flex flex-col gap-4">
      <fieldset className="flex flex-wrap gap-3">
        <legend className="mb-2 uppercase tracking-wider text-white/80">Tamanho</legend>
        {sizes.map(([s, units]) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            disabled={units <= 0}
            aria-pressed={size === s}
            aria-label={units <= 0 ? `${s}, esgotado` : s}
            className={`min-w-11 h-11 px-3 border-2 border-white cursor-pointer transition-colors disabled:cursor-default disabled:opacity-40 disabled:line-through ${size === s ? "bg-white text-black" : "enabled:hover:bg-white/15"}`}
          >
            {s}
          </button>
        ))}
      </fieldset>

      {atLimit ? (
        <button type="button" onClick={() => setCartOpen(true)} className="btn-primary self-start text-xl">
          Já está no carrinho
        </button>
      ) : (
        <button
          type="button"
          disabled={soldOut || !size}
          onClick={() => size && addToCart({ slug: product.slug, name: product.name, price: product.price, image: product.images[0], size, max: product.stock[size] })}
          className="btn-primary self-start text-xl"
        >
          {soldOut ? "Esgotado" : size ? "Adicionar ao carrinho" : "Escolha um tamanho"}
        </button>
      )}
    </div>
  );
}
