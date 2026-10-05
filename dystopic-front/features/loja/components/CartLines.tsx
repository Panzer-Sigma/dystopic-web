"use client";

import { setQty, type CartLine } from "@/store/cart";
import ProductImage from "./ProductImage";
import { formatPrice } from "../data";

const qtyButton = "w-8 h-8 md:w-9 md:h-9 border-2 border-white flex items-center justify-center enabled:hover:bg-white enabled:hover:text-black transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default";

/** Cart items with quantity steppers; shared by the cart drawer and the checkout page. */
export default function CartLines({ lines }: { lines: CartLine[] }) {
  return (
    <ul>
      {lines.map((line) => (
        <li key={`${line.slug}-${line.size}`} className="flex gap-4 py-6">
          <div className="w-[42%] max-w-44 shrink-0">
            <ProductImage src={line.image} alt={line.name} sizes="180px" />
          </div>
          <div className="flex flex-col gap-2 tracking-wider">
            <p className="uppercase">{line.name}</p>
            <p>Tam. {line.size}</p>
            <div className="flex items-center gap-5">
              <button type="button" onClick={() => setQty(line.slug, line.size, line.qty - 1)} aria-label="Diminuir quantidade" className={qtyButton}>-</button>
              <span className="text-xl tabular-nums" aria-live="polite">{line.qty}</span>
              <button type="button" onClick={() => setQty(line.slug, line.size, line.qty + 1)} disabled={line.qty >= line.max} aria-label="Aumentar quantidade" className={qtyButton}>+</button>
            </div>
            {line.qty >= line.max && <p className="text-xs uppercase text-white/60">Última peça neste tamanho</p>}
            <p>{formatPrice(line.price * line.qty)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
