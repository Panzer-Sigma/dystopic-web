"use client";

import { useState } from "react";
import { addToCart } from "@/store/cart";
import type { Product } from "@/types/loja";

/** Size picker plus add button; adding opens the cart drawer. */
export default function AddToCart({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <fieldset className="flex flex-wrap gap-3">
        <legend className="mb-2 uppercase tracking-wider text-white/80">Tamanho</legend>
        {product.sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            aria-pressed={size === s}
            className={`min-w-11 h-11 px-3 border-2 border-white cursor-pointer transition-colors ${size === s ? "bg-white text-black" : "hover:bg-white/15"}`}
          >
            {s}
          </button>
        ))}
      </fieldset>

      <button
        type="button"
        disabled={!size}
        onClick={() => size && addToCart({ slug: product.slug, name: product.name, price: product.price, image: product.images[0], size })}
        className="self-start px-8 py-2 bg-[#16164f] border-2 border-neutral-500 text-xl font-semibold enabled:hover:brightness-125 disabled:opacity-50 cursor-pointer disabled:cursor-default"
      >
        {size ? "Adicionar ao carrinho" : "Escolha um tamanho"}
      </button>
    </div>
  );
}
