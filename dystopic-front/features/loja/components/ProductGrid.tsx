"use client";

import Link from "next/link";
import { useState } from "react";
import Pagination from "@/components/ui/Pagination";
import ProductImage from "./ProductImage";
import SoldOutBadge from "./SoldOutBadge";
import { PAGE_SIZE, PRODUCTS, TOTAL_PAGES, isSoldOut } from "../data";

export default function ProductGrid() {
  const [page, setPage] = useState(0);
  const start = page * PAGE_SIZE;
  const items = PRODUCTS.slice(start, start + PAGE_SIZE);

  return (
    <>
      <section className="w-[94%] md:w-[72%] max-w-5xl grid grid-cols-2 gap-x-3 gap-y-6 md:gap-x-14 md:gap-y-4 mt-6 md:mt-8 z-10">
        {items.map((product, i) => (
          <Link
            key={product.slug}
            href={`/loja/product/${product.slug}`}
            className="group flex flex-col items-center transition-all hover:brightness-125"
          >
            <div className="relative w-full">
              <ProductImage src={product.images[0]} alt={product.name} sizes="(max-width: 768px) 47vw, 36vw" priority={i < 2} />
              {isSoldOut(product) && <SoldOutBadge />}
            </div>
            <h2 className="mt-2 md:mt-3 font-display text-outline text-center text-sm md:text-2xl leading-tight">
              {product.name}
            </h2>
          </Link>
        ))}
      </section>

      <div className="mt-auto pt-10 md:pt-24">
        <Pagination page={page} totalPages={TOTAL_PAGES} onChange={setPage} />
      </div>
    </>
  );
}
