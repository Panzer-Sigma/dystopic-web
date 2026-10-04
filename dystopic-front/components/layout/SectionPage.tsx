import Image from "next/image";
import Link from "next/link";
import ChainNav, { type Section } from "@/components/layout/ChainNav";

interface SectionPageProps {
  section: Section;
  children: React.ReactNode;
}

/** Shell for the chain-nav sections (loja, archival, mapa): background, chain nav, content, footer. */
export default function SectionPage({ section, children }: SectionPageProps) {
  return (
    <main className="relative w-full min-h-dvh flex flex-col items-center overflow-x-clip bg-black bg-[url('/assets/archival/bg-mobile.webp')] md:bg-[url('/assets/archival/bg-desktop.webp')] bg-cover bg-top bg-no-repeat">

      <ChainNav current={section} />

      {children}

      <footer className="w-full flex flex-col md:flex-row items-center justify-center gap-3 md:gap-20 mt-8 pb-4 z-10">
        <Link href="/termos" className="relative w-32 h-6 hover:brightness-150 transition-all">
          <Image src="/assets/archival/footer-termos.png" alt="Termos de Uso" fill className="object-contain" />
        </Link>
        <div className="relative w-48 h-5 pointer-events-none">
          <Image src="/assets/archival/footer-corp.png" alt="Dystopic Corp 2026" fill className="object-contain" />
        </div>
        <Link href="/privacidade" className="relative w-40 h-6 hover:brightness-150 transition-all">
          <Image src="/assets/archival/footer-privacidade.png" alt="Política de Privacidade" fill className="object-contain" />
        </Link>
      </footer>

    </main>
  );
}
