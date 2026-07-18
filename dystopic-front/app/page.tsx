import Image from "next/image";
import HubButton from "./components/HubButton";

export default function Home() {
  return (
    <main
      className="relative w-screen h-screen flex flex-col items-center justify-between py-6 overflow-hidden bg-black"
      style={{
        backgroundImage: "url('/assets/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* TOP HEADER */}
      <div className="relative w-full max-w-5xl h-12 md:h-20 mt-4 z-10 px-4">
        <Image
          src="/assets/title.png"
          alt="Dystopic Plataforma Transmidiatica Regenerativa"
          fill
          className="object-contain mix-blend-screen pointer-events-none"
          priority
        />
      </div>

      {/* CENTER INTERACTIVE CLUSTER */}
      <div className="relative w-full max-w-5xl grow flex items-center justify-center z-10">
        
        {/* Rato Dystopic (Center Top) */}
        <div className="absolute top-[5%] md:top-[10%] w-48 h-48 md:w-72 md:h-72 pointer-events-none z-30">
          <Image
            src="/assets/rato.png"
            alt="Rato Dystopic"
            fill
            className="object-contain mix-blend-screen"
            priority
          />
        </div>

        {/* Archival (Left) */}
        <HubButton
          href="/archival"
          iconSrc="/assets/icon-archival.png"
          textSrc="/assets/text-archival.png"
          altText="Archival"
          className="left-[10%] md:left-[20%] top-[35%] md:top-[30%]"
        />

        {/* Loja (Right) */}
        <HubButton
          href="/loja"
          iconSrc="/assets/icon-loja.png"
          textSrc="/assets/text-loja.png"
          altText="Loja"
          className="right-[10%] md:right-[20%] top-[35%] md:top-[30%]"
        />

        {/* Mapa (Bottom Center) */}
        <HubButton
          href="/mapa"
          iconSrc="/assets/icon-mapa.png"
          textSrc="/assets/text-mapa.png"
          altText="Mapa"
          className="bottom-[10%] md:bottom-[5%] mix-blend-screen"
        />
      </div>

      {/* FOOTER */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 pb-4 z-10">
        <a href="/termos" className="relative w-32 h-5 hover:brightness-150 transition-all">
          <Image src="/assets/termos.png" alt="Termos de Uso" fill className="object-contain" />
        </a>
        
        <div className="relative w-48 h-5 pointer-events-none">
          <Image src="/assets/corp.png" alt="Dystopic Corp 2026" fill className="object-contain" />
        </div>
        
        <a href="/privacidade" className="relative w-40 h-5 hover:brightness-150 transition-all">
          <Image src="/assets/privacidade.png" alt="Política de Privacidade" fill className="object-contain" />
        </a>
      </footer>

    </main>
  );
}