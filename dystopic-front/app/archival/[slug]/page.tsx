import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChainNav from "@/components/layout/ChainNav";
import { ARCHIVAL_ENTRIES, getEntry } from "@/features/archival/data";

export function generateStaticParams() {
  return ARCHIVAL_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  return { title: entry ? `${entry.title} — DYSTOPIC ARCHIVAL` : "Archival — DYSTOPIC CORP" };
}

export default async function ArchivalEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  return (
    <main className="relative w-full min-h-dvh flex flex-col items-center overflow-x-clip bg-black bg-[url('/assets/archival/bg-mobile.webp')] md:bg-[url('/assets/archival/bg-desktop.webp')] bg-cover bg-top bg-no-repeat">

      <ChainNav current="archival" />

      <article className="w-[96%] md:w-[52%] flex flex-col gap-4 mt-4 md:mt-6 z-10">
        <div className="relative w-full" style={{ aspectRatio: entry.aspect }}>
          <Image
            src={entry.image}
            alt={entry.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96vw, 52vw"
            priority
          />
        </div>

        <header className="font-mono text-white">
          <h1 className="text-lg md:text-2xl tracking-wide">{entry.title}</h1>
          <p className="text-xs md:text-sm text-white/60 mt-1">{entry.year}</p>
        </header>

        <p className="max-w-prose font-mono text-sm text-white/70">{entry.description}</p>

        <Link href="/archival" className="relative aspect-[463/99] w-[clamp(116px,18vw,180px)] hover:brightness-150 transition-all">
          <Image src="/assets/archival/btn-voltar.png" alt="Voltar ao arquivo" fill className="object-contain" />
        </Link>
      </article>

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
