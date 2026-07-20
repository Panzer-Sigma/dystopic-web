import Image from "next/image";
import Link from "next/link";

type Section = "loja" | "archival" | "mapa";

interface ChainNavProps {
  current: Section;
}

const items: { section: Section; href: string; src: string; alt: string; box: string }[] = [
  { section: "loja", href: "/loja", src: "/assets/archival/btn-loja.png", alt: "Loja", box: "aspect-[119/49] w-[clamp(60px,9vw,110px)]" },
  { section: "archival", href: "/archival", src: "/assets/archival/btn-archival.png", alt: "Archival", box: "aspect-[230/49] w-[clamp(113px,17vw,208px)]" },
  { section: "mapa", href: "/mapa", src: "/assets/archival/btn-mapa.png", alt: "Mapa", box: "aspect-[136/49] w-[clamp(67px,10vw,124px)]" },
];

/** Section header: Dystopic logo above the chain nav strip (LOJA / ARCHIVAL / MAPA). */
export default function ChainNav({ current }: ChainNavProps) {
  return (
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
          {items.map((item) =>
            item.section === current ? (
              <Link key={item.section} href={item.href} aria-current="page" className={`relative ${item.box}`}>
                <Image src={item.src} alt={item.alt} fill className="object-contain" />
              </Link>
            ) : (
              <Link key={item.section} href={item.href} className={`relative ${item.box} hover:brightness-150 transition-all`}>
                <Image src={item.src} alt={item.alt} fill className="object-contain" />
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
