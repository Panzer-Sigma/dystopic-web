import type { District } from "@/types/mapa";

interface CityMapProps {
  districts: District[];
  selected: string;
  onSelect: (slug: string) => void;
}

// Frame over central São Paulo: lon -46.75..-46.50, lat -23.45..-23.68, 2000 units per degree.
const W = 500;
const H = 460;
const project = (lon: number, lat: number) => ({ x: (lon + 46.75) * 2000, y: (-23.45 - lat) * 2000 });

// Rivers traced coarsely from their course; they orient the reader, they are not survey-accurate.
const RIVERS = [
  { name: "Rio Tietê", d: "M0 116 C80 126 170 132 250 140 S330 150 380 110 S460 70 500 60", label: { x: 60, y: 112 } },
  { name: "Rio Pinheiros", d: "M10 160 C50 210 90 260 100 300 S120 380 110 460", label: { x: 48, y: 330 } },
  { name: "Rio Tamanduateí", d: "M250 140 C250 170 255 195 280 220 S330 270 360 340 S395 410 400 460", label: { x: 368, y: 360 } },
];

/** Dark stylised map of central São Paulo; each district is a selectable region. */
export default function CityMap({ districts, selected, onSelect }: CityMapProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Mapa de São Paulo" className="w-full h-auto select-none">
      <defs>
        <pattern id="mapa-streets" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
          <path d="M0 0H18M0 0V18" stroke="#1d1d3f" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="#07071a" />
      <rect width={W} height={H} fill="url(#mapa-streets)" />

      {RIVERS.map((river) => (
        <g key={river.name}>
          <path d={river.d} fill="none" stroke="#1b2a6b" strokeWidth="5" strokeLinecap="round" />
          <text x={river.label.x} y={river.label.y} fill="#4b5aa6" fontSize="10" className="font-mono">{river.name}</text>
        </g>
      ))}

      {districts.map((district) => {
        const { x, y } = project(district.lon, district.lat);
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
            className="group cursor-pointer outline-none"
          >
            {active && (
              <circle cx={x} cy={y} r="22" fill="none" stroke={district.color} strokeWidth="2" className="animate-ping origin-center [transform-box:fill-box]" />
            )}
            <circle
              cx={x}
              cy={y}
              r="22"
              fill={district.color}
              fillOpacity={active ? 0.55 : 0.25}
              stroke={district.color}
              strokeWidth="2"
              className="transition-[fill-opacity] group-hover:[fill-opacity:0.55] group-focus-visible:[fill-opacity:0.55]"
            />
            <circle cx={x} cy={y} r="4" fill="#e4e0ff" />
            <text x={x + 28} y={y + 5} fill="#e4e0ff" stroke="#1b1a5c" strokeWidth="3" paintOrder="stroke" fontSize="14" fontWeight="700" className="font-display uppercase">
              {district.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
