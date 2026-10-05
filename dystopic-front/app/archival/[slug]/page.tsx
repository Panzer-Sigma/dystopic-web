import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionPage from "@/components/layout/SectionPage";
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
    <SectionPage section="archival">

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
    </SectionPage>
  );
}
