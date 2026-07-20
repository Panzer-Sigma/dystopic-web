import Image from "next/image";
import HubButton from "@/components/ui/HubButton";

export default function Home() {
  return (
    <main className="relative w-full min-h-dvh flex flex-col items-center justify-between py-6 overflow-hidden bg-black bg-[url('/assets/bg-mobile.webp')] md:bg-[url('/assets/bg.webp')] bg-cover bg-center bg-no-repeat">

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
          md+: 3-column grid diamond (rato center top, sides row 2, mapa bottom) —
          grid cells cannot overlap at any viewport size. */}
      <div className="relative w-full max-w-5xl grow flex flex-col items-center justify-evenly gap-2 z-10 md:grid md:grid-cols-[1fr_auto_1fr] md:grid-rows-[auto_auto] md:w-[clamp(620px,58vw,860px)] md:max-w-none md:gap-x-4 md:content-center md:justify-items-center md:items-center">

        {/* Rato Dystopic (Center Top) */}
        <div className="relative aspect-square w-[38vw] max-w-[176px] sm:max-w-[200px] pointer-events-none z-30 md:w-[clamp(190px,20vw,300px)] md:max-w-none md:col-start-2 md:row-start-1">
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
            className="md:col-start-1 md:row-start-1 md:justify-self-end"
          />

          <HubButton
            href="/loja"
            iconSrc="/assets/icon-loja.png"
            textSrc="/assets/text-loja.png"
            altText="Loja"
            className="md:col-start-3 md:row-start-1 md:justify-self-start"
          />
        </div>

        {/* Mapa (Bottom Center) */}
        <HubButton
          href="/mapa"
          iconSrc="/assets/icon-mapa.png"
          textSrc="/assets/text-mapa.png"
          altText="Mapa"
          className="mix-blend-screen md:col-start-2 md:row-start-2 md:-mt-4"
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
