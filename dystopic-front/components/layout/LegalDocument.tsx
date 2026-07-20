import Image from "next/image";
import Link from "next/link";

interface LegalDocumentProps {
  /** Design PNG for the page heading (termos.png / privacidade.png). */
  titleSrc: string;
  titleAlt: string;
  /** Native aspect ratio of `titleSrc`, as a Tailwind aspect-[] value. */
  titleAspect: string;
  lastUpdated: string;
  children: React.ReactNode;
}

/**
 * Shared shell for the legal pages: hub background, PNG heading, and a
 * translucent reading panel that keeps long-form text legible over the busy art.
 */
export default function LegalDocument({ titleSrc, titleAlt, titleAspect, lastUpdated, children }: LegalDocumentProps) {
  return (
    <main className="relative w-full min-h-dvh flex flex-col items-center px-4 py-10 md:py-14 bg-black bg-[url('/assets/bg-mobile.webp')] md:bg-[url('/assets/bg.webp')] bg-cover bg-center bg-no-repeat bg-fixed">

      <article className="w-full max-w-3xl bg-[rgba(8,8,12,0.88)] backdrop-blur-md border border-slate-700 rounded shadow-[0_0_30px_rgba(0,0,0,0.9)] px-5 py-8 md:px-14 md:py-12 z-10">

        <header className="flex flex-col items-center text-center pb-6 mb-8 border-b border-white/80">
          <div className={`relative ${titleAspect} w-[clamp(200px,55vw,380px)]`}>
            <Image src={titleSrc} alt={titleAlt} fill className="object-contain" priority />
          </div>
          <p className="mt-5 font-mono text-sm text-slate-400">Última atualização: {lastUpdated}</p>
        </header>

        {/* Long-form legal copy. Typography rules live here so the documents
            themselves stay plain JSX. */}
        <div
          className="
            text-slate-300 text-[0.95rem] leading-relaxed
            [&_p]:mb-4 [&_p]:text-justify
            [&_h2]:font-mono [&_h2]:text-white [&_h2]:uppercase [&_h2]:tracking-wide
            [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:pb-2
            [&_h2]:border-b [&_h2]:border-dashed [&_h2]:border-slate-700
            [&_h3]:font-mono [&_h3]:text-slate-300 [&_h3]:text-lg [&_h3]:mt-7 [&_h3]:mb-3
            [&_ul]:mb-6 [&_ul]:pl-5 [&_ul]:list-[square] [&_ul]:list-outside
            [&_li]:mb-3 [&_li]:leading-relaxed
            [&_strong]:text-white [&_strong]:font-semibold
            [&_a]:text-slate-300 [&_a]:underline [&_a]:decoration-dashed [&_a]:decoration-slate-500
            [&_a]:underline-offset-4 hover:[&_a]:text-white hover:[&_a]:decoration-white
            [&_a]:transition-colors
          "
        >
          {children}
        </div>

        <nav className="mt-12 pt-6 border-t border-slate-700 flex flex-wrap items-center justify-center gap-6">
          <Link href="/" className="relative w-40 h-6 hover:brightness-150 transition-all">
            <Image src="/assets/corp.png" alt="Voltar ao hub — Dystopic Corp 2026" fill className="object-contain" />
          </Link>
        </nav>

      </article>
    </main>
  );
}
