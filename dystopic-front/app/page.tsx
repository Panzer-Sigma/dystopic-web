import Image from "next/image";
import HubButton from "./components/HubButton";

export default function Home() {
  return (
    <main className="relative w-full min-h-dvh flex flex-col items-center justify-between py-6 overflow-hidden bg-black bg-[url('/assets/bg-mobile.png')] md:bg-[url('/assets/bg.png')] bg-cover bg-center bg-no-repeat">

      {/* TOP HEADER */}
      <div className="relative w-full max-w-5xl h-12 md:h-20 mt-2 md:mt-4 z-10 px-4">
        <Image
          src="/assets/title.png"
          alt="Dystopic Plataforma Transmidiatica Regenerativa"
          fill
          className="object-contain mix-blend-screen pointer-events-none"
          priority
        />
      </div>

      {/* CENTER INTERACTIVE CLUSTER
          Mobile: vertical flow — rato, archival+loja row, mapa.
          Desktop (md+): diamond via absolute positioning. */}
      <div className="relative w-full max-w-5xl grow flex flex-col items-center justify-evenly gap-2 z-10 md:block">

        {/* Rato Dystopic (Center Top) */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 pointer-events-none z-30 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[10%] md:w-72 md:h-72">
          <Image
            src="/assets/rato.png"
            alt="Rato Dystopic"
            fill
            className="object-contain mix-blend-screen"
            priority
          />
        </div>

        {/* Archival (Left) + Loja (Right) */}
        <div className="w-full flex items-center justify-evenly md:contents">
          <HubButton
            href="/archival"
            iconSrc="/assets/icon-archival.png"
            textSrc="/assets/text-archival.png"
            altText="Archival"
            className="md:absolute md:left-[20%] md:top-[30%]"
          />

          <HubButton
            href="/loja"
            iconSrc="/assets/icon-loja.png"
            textSrc="/assets/text-loja.png"
            altText="Loja"
            className="md:absolute md:right-[20%] md:top-[30%]"
          />
        </div>

        {/* Mapa (Bottom Center) */}
        <HubButton
          href="/mapa"
          iconSrc="/assets/icon-mapa.png"
          textSrc="/assets/text-mapa.png"
          altText="Mapa"
          className="mix-blend-screen md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-[5%]"
        />
      </div>

      {/* FOOTER — mobile: termos+privacidade row, corp below; desktop: termos / corp / privacidade */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-center gap-3 md:gap-20 pb-2 md:pb-4 z-10">
        <div className="flex items-center gap-8 md:contents">
          <a href="/termos" className="relative w-32 h-6 hover:brightness-150 transition-all md:order-1">
            <Image src="/assets/termos.png" alt="Termos de Uso" fill className="object-contain" />
          </a>

          <a href="/privacidade" className="relative w-40 h-6 hover:brightness-150 transition-all md:order-3">
            <Image src="/assets/privacidade.png" alt="Política de Privacidade" fill className="object-contain" />
          </a>
        </div>

        <div className="relative w-48 h-5 pointer-events-none md:order-2">
          <Image src="/assets/corp.png" alt="Dystopic Corp 2026" fill className="object-contain" />
        </div>
      </footer>

    </main>
  );
}
