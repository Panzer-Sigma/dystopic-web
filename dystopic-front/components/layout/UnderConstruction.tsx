import Image from "next/image";
import SectionPage from "@/components/layout/SectionPage";
import { type Section } from "@/components/layout/ChainNav";

interface UnderConstructionProps {
  section: Section;
  /** Section button art shown as the page heading. */
  src: string;
  alt: string;
  /** Tailwind aspect + width classes for the heading art. */
  box: string;
  message: string;
}

/** Placeholder page for sections that are not live yet: section art and a message inside the section shell. */
export default function UnderConstruction({ section, src, alt, box, message }: UnderConstructionProps) {
  return (
    <SectionPage section={section}>
      <section className="grow w-full flex flex-col items-center justify-center gap-6 px-6 z-10">
        <div className={`relative ${box}`}>
          <Image src={src} alt={alt} fill className="object-contain" priority />
        </div>
        <p className="max-w-prose text-center font-mono text-sm text-white/70">
          {message}
        </p>
      </section>
    </SectionPage>
  );
}
