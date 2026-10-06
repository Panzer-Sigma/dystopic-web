import type { District } from "@/types/mapa";
import { AREAS, BASEMAP, VIEWBOX } from "../geo";

interface CityMapProps {
  districts: District[];
  selected: string;
  onSelect: (slug: string) => void;
}

/** Dark map of central São Paulo's real district boundaries; each collection area is selectable. */
export default function CityMap({ districts, selected, onSelect }: CityMapProps) {
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} role="group" aria-label="Mapa de São Paulo" className="w-full h-auto select-none bg-[#07071a]">
      {BASEMAP.map((district) => (
        <path key={district.name} d={district.d} fill="#0d0d26" stroke="#25255c" strokeWidth="1" />
      ))}

      {districts.map((district) => {
        const area = AREAS[district.slug];
        const active = district.slug === selected;
        return (
          <g
            key={district.slug}
            role="button"
            tabIndex={0}
            aria-pressed={active}
            aria-label={district.name}
            onClick={() => onSelect(district.slug)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(district.slug);
              }
            }}
            className={`group cursor-pointer outline-none ${active ? "text-[#ff2fa8]" : "text-[#5b63d9]"}`}
          >
            {active && (
              <path d={area.d} fill="none" stroke="currentColor" strokeWidth="2" className="animate-ping origin-center [transform-box:fill-box]" />
            )}
            <path
              d={area.d}
              fill="currentColor"
              fillOpacity={active ? 0.6 : 0.3}
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-[fill-opacity] group-hover:[fill-opacity:0.6] group-focus-visible:[fill-opacity:0.6]"
            />
            <text x={area.x} y={area.y} textAnchor="middle" dominantBaseline="middle" fill="#e4e0ff" stroke="#1b1a5c" strokeWidth="3" paintOrder="stroke" fontSize="11" fontWeight="700" className="font-display uppercase pointer-events-none">
              {district.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
