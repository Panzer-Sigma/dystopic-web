import Image from "next/image";
import ChainNav from "@/components/layout/ChainNav";

export const metadata = { title: "Loja — DYSTOPIC CORP" };

export default function LojaPage() {
  return (
    <main className="relative w-full min-h-dvh flex flex-col items-center overflow-x-clip bg-black bg-[url('/assets/archival/bg-mobile.webp')] md:bg-[url('/assets/archival/bg-desktop.webp')] bg-cover bg-top bg-no-repeat">

      <ChainNav current="loja" />

      <section className="grow w-full flex flex-col items-center justify-center gap-6 px-6 z-10">
        <div className="relative aspect-[119/49] w-[clamp(120px,26vw,220px)]">
          <Image src="/assets/archival/btn-loja.png" alt="Loja" fill className="object-contain" priority />
        </div>
        <p className="max-w-prose text-center font-mono text-sm text-white/70">
          A loja Dystopic abre em breve.
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
