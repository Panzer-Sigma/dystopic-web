import Image from "next/image";
import ChainNav, { type Section } from "@/components/layout/ChainNav";

interface UnderConstructionProps {
  section: Section;
  /** Section button art shown as the page heading. */
  src: string;
  alt: string;
  /** Tailwind aspect + width classes for the heading art. */
  box: string;
  message: string;
}

/** Placeholder page for sections that are not live yet: chain nav, section art, message, footer. */
export default function UnderConstruction({ section, src, alt, box, message }: UnderConstructionProps) {
  return (
    <main className="relative w-full min-h-dvh flex flex-col items-center overflow-x-clip bg-black bg-[url('/assets/archival/bg-mobile.webp')] md:bg-[url('/assets/archival/bg-desktop.webp')] bg-cover bg-top bg-no-repeat">

      <ChainNav current={section} />

      <section className="grow w-full flex flex-col items-center justify-center gap-6 px-6 z-10">
        <div className={`relative ${box}`}>
          <Image src={src} alt={alt} fill className="object-contain" priority />
        </div>
        <p className="max-w-prose text-center font-mono text-sm text-white/70">
          {message}
        </p>
      </section>

      <footer className="w-full flex flex-col md:flex-row items-center justify-center gap-3 md:gap-20 mt-8 pb-4 z-10">
        <a href="/termos" className="relative w-32 h-6 hover:brightness-150 transition-all">
          <Image src="/assets/archival/footer-termos.png" alt="Termos de Uso" fill className="object-contain" />
        </a>
        <div className="relative w-48 h-5 pointer-events-none">
          <Image src="/assets/archival/footer-corp.png" alt="Dystopic Corp 2026" fill className="object-contain" />
        </div>
        <a href="/privacidade" className="relative w-40 h-6 hover:brightness-150 transition-all">
          <Image src="/assets/archival/footer-privacidade.png" alt="Política de Privacidade" fill className="object-contain" />
        </a>
      </footer>

    </main>
  );
}
