import Image from "next/image";
import Link from "next/link";
import { ArchivalFeed } from "@/features/archival";

export default function ArchivalPage() {
  return (
    <main className="relative w-full min-h-dvh flex flex-col items-center overflow-y-auto bg-black bg-[url('/assets/archival/bg-mobile.png')] md:bg-[url('/assets/archival/bg-desktop.png')] bg-cover bg-top bg-no-repeat">

      {/* HEADER: logo + chain nav */}
      <header className="w-full flex flex-col items-center pt-3 md:pt-4 z-10">
        <Link href="/" className="relative w-28 h-9 md:w-36 md:h-11 hover:brightness-150 transition-all">
          <Image src="/assets/archival/logo.png" alt="Dystopic" fill className="object-contain mix-blend-screen" priority />
        </Link>

        <nav className="relative w-full md:max-w-3xl h-10 md:h-12 mt-2 flex items-center justify-center">
          <Image
            src="/assets/archival/chain-header.png"
            alt=""
            fill
            className="object-cover pointer-events-none"
            priority
          />
          <div className="relative z-10 flex items-center justify-center gap-8 md:gap-16 w-full px-6">
            <Link href="/loja" className="relative w-14 h-6 md:w-20 md:h-6 hover:brightness-150 transition-all">
              <Image src="/assets/archival/btn-loja.png" alt="Loja" fill className="object-contain" />
            </Link>
            <Link href="/archival" aria-current="page" className="relative w-24 h-6 md:w-32 md:h-6">
              <Image src="/assets/archival/btn-archival.png" alt="Archival" fill className="object-contain" />
            </Link>
            <Link href="/mapa" className="relative w-16 h-6 md:w-20 md:h-6 hover:brightness-150 transition-all">
              <Image src="/assets/archival/btn-mapa.png" alt="Mapa" fill className="object-contain" />
            </Link>
          </div>
        </nav>
      </header>

      {/* ARCHIVE FEED + PAGINATION (Voltar / Avançar) */}
      <ArchivalFeed />

      {/* FOOTER */}
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
