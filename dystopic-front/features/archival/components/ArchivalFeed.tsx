"use client";

import Image from "next/image";
import { useState } from "react";

// Placeholder archive: the design provides one example capture; real content
// will replace this list later.
const TOTAL_ITEMS = 15;
const PAGE_SIZE = 5;
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);

export default function ArchivalFeed() {
  const [page, setPage] = useState(0);
  const start = page * PAGE_SIZE;
  const items = Array.from(
    { length: Math.min(PAGE_SIZE, TOTAL_ITEMS - start) },
    (_, i) => start + i + 1,
  );

  return (
    <>
      {/* ARCHIVE FEED */}
      <section className="w-[94%] md:w-[44%] flex flex-col gap-2 md:gap-4 mt-4 md:mt-6 z-10">
        {items.map((n) => (
          <div key={n} className="relative w-full aspect-[2/1]">
            <Image
              src="/assets/archival/example-single.png"
              alt={`Registro ${n} do arquivo Dystopic`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 94vw, 44vw"
            />
          </div>
        ))}
      </section>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-10 md:gap-16 mt-6 md:mt-8 z-10">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="relative w-32 h-8 md:w-40 md:h-9 transition-all cursor-pointer enabled:hover:brightness-150 disabled:opacity-40 disabled:cursor-default"
        >
          <Image src="/assets/archival/btn-voltar.png" alt="Voltar" fill className="object-contain" />
        </button>

        <span className="sr-only" aria-live="polite">{`Página ${page + 1} de ${TOTAL_PAGES}`}</span>

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))}
          disabled={page === TOTAL_PAGES - 1}
          className="relative w-36 h-8 md:w-44 md:h-9 transition-all cursor-pointer enabled:hover:brightness-150 disabled:opacity-40 disabled:cursor-default"
        >
          <Image src="/assets/archival/btn-avancar.png" alt="Avançar" fill className="object-contain" />
        </button>
      </div>
    </>
  );
}
