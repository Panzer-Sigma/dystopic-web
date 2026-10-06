import Image from "next/image";
import type { District, StreetTone, TextRun } from "@/types/mapa";

const TONE: Record<StreetTone, string> = {
  orange: "text-[#ffa31a]",
  green: "text-[#2bd16a]",
  red: "text-[#ff3d55]",
};

// Navy band behind each wrapped line, as in the design's text blocks.
const LINE = "bg-[#16164f] box-decoration-clone px-1.5 py-0.5";

function Runs({ runs }: { runs: TextRun[] }) {
  return runs.map((run, i) =>
    typeof run === "string" ? run : <span key={i} className={TONE[run.tone]}>{run.text}</span>,
  );
}

/** Detail card for one district: its street map and the collection guide. */
export default function DistrictPanel({ district }: { district: District }) {
  return (
    <article aria-live="polite" className="flex flex-col">
      <h2 className="self-start bg-[#16164f] px-2 py-0.5 font-display text-outline text-xl md:text-2xl font-bold uppercase tracking-wide">
        {district.name}
      </h2>

      <div className="border-2 border-[#1b1a5c] bg-black/90 p-3 md:p-4 font-display text-sm md:text-base leading-8 text-[#e4e0ff]">
        <Image
          src={district.image.src}
          alt={`Mapa do ${district.name} com as ruas de coleta destacadas`}
          width={district.image.width}
          height={district.image.height}
          sizes="(max-width: 768px) 80vw, 320px"
          className="mx-auto mb-4 w-4/5 max-w-xs h-auto"
        />

        {district.sections.map((section) =>
          section.paragraphs.map((runs, i) => (
            <p key={`${section.label}-${i}`}>
              <span className={LINE}>
                {i === 0 && <strong className="font-semibold">{section.label}: </strong>}
                <Runs runs={runs} />
              </span>
            </p>
          )),
        )}

        {district.contacts && (
          <>
            <p><span className={LINE}>{district.contacts.intro}</span></p>
            <ul>
              {district.contacts.items.map((item) => (
                <li key={item}><span className={LINE}>▪ {item}</span></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}
