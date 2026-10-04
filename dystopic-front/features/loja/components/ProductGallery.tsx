"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";

/** Large photo with a thumbnail strip to switch views (front, sides, back). */
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <ProductImage src={images[active]} alt={alt} aspect="aspect-[2/3]" sizes="(max-width: 768px) 94vw, 36vw" priority />
      <div className="grid grid-cols-5 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Foto ${i + 1} de ${images.length}`}
            aria-pressed={i === active}
            className={`border-2 cursor-pointer transition-all ${i === active ? "border-white" : "border-transparent opacity-60 hover:opacity-100"}`}
          >
            <ProductImage src={src} alt="" aspect="aspect-[2/3]" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
