import Image from "next/image";
import ChainNav from "@/components/layout/ChainNav";

export const metadata = { title: "Mapa — DYSTOPIC CORP" };

export default function MapaPage() {
  return (
    <main className="relative w-full min-h-dvh flex flex-col items-center overflow-x-clip bg-black bg-[url('/assets/archival/bg-mobile.webp')] md:bg-[url('/assets/archival/bg-desktop.webp')] bg-cover bg-top bg-no-repeat">

      <ChainNav current="mapa" />

      <section className="grow w-full flex flex-col items-center justify-center gap-6 px-6 z-10">
        <div className="relative aspect-[136/49] w-[clamp(130px,28vw,240px)]">
          <Image src="/assets/archival/btn-mapa.png" alt="Mapa" fill className="object-contain" priority />
        </div>
        <p className="max-w-prose text-center font-mono text-sm text-white/70">
          O mapa Dystopic está sendo traçado.
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
