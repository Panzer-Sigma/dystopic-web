"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ARCHIVAL_ENTRIES, PAGE_SIZE, TOTAL_PAGES } from "../data";

export default function ArchivalFeed() {
  const [page, setPage] = useState(0);
  const start = page * PAGE_SIZE;
  const items = ARCHIVAL_ENTRIES.slice(start, start + PAGE_SIZE);

  return (
    <>
      {/* ARCHIVE FEED — each entry links to its own route */}
      <section className="w-[96%] md:w-[52%] flex flex-col gap-2 md:gap-3 mt-4 md:mt-6 z-10">
        {items.map((entry) => (
          <Link
            key={entry.slug}
            href={`/archival/${entry.slug}`}
            className="group relative block w-full overflow-hidden transition-all hover:brightness-110"
            style={{ aspectRatio: entry.aspect }}
          >
            <Image
              src={entry.image}
              alt={entry.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96vw, 52vw"
            />
            <span className="absolute inset-x-0 bottom-0 px-3 py-2 font-mono text-xs md:text-sm text-white bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              {entry.title} · {entry.year}
            </span>
          </Link>
        ))}
      </section>

      {/* PAGINATION */}
      <div className="relative flex items-center justify-center gap-10 md:gap-16 mt-6 md:mt-8 z-20">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="relative aspect-[463/99] w-[clamp(116px,18vw,180px)] transition-all cursor-pointer enabled:hover:brightness-150 disabled:opacity-40 disabled:cursor-default"
        >
          <Image src="/assets/archival/btn-voltar.png" alt="Voltar" fill className="object-contain" />
        </button>

        <span className="sr-only" aria-live="polite">{`Página ${page + 1} de ${TOTAL_PAGES}`}</span>

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))}
          disabled={page === TOTAL_PAGES - 1}
          className="relative aspect-[572/118] w-[clamp(120px,19vw,196px)] transition-all cursor-pointer enabled:hover:brightness-150 disabled:opacity-40 disabled:cursor-default"
        >
          <Image src="/assets/archival/btn-avancar.png" alt="Avançar" fill className="object-contain" />
        </button>
      </div>
    </>
  );
}
