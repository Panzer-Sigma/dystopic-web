import Image from "next/image";

interface PaginationProps {
  /** Zero-based current page. */
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/** Voltar / Avançar pager using the design's button art. */
export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <div className="relative flex items-center justify-center gap-10 md:gap-16 mt-6 md:mt-8 z-20">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, page - 1))}
        disabled={page === 0}
        className="relative aspect-[463/99] w-[clamp(116px,18vw,180px)] transition-all cursor-pointer enabled:hover:brightness-150 disabled:opacity-40 disabled:cursor-default"
      >
        <Image src="/assets/archival/btn-voltar.png" alt="Voltar" fill className="object-contain" />
      </button>

      <span className="sr-only" aria-live="polite">{`Página ${page + 1} de ${totalPages}`}</span>

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages - 1, page + 1))}
        disabled={page >= totalPages - 1}
        className="relative aspect-[572/118] w-[clamp(120px,19vw,196px)] transition-all cursor-pointer enabled:hover:brightness-150 disabled:opacity-40 disabled:cursor-default"
      >
        <Image src="/assets/archival/btn-avancar.png" alt="Avançar" fill className="object-contain" />
      </button>
    </div>
  );
}
