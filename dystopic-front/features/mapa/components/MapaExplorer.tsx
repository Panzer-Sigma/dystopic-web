"use client";

import { useState } from "react";
import CityMap from "./CityMap";
import Disclaimer from "./Disclaimer";
import DistrictPanel from "./DistrictPanel";
import { DISTRICTS } from "../data";

/** Interactive map: pick a district on the city map (or the buttons under it) to open its guide. */
export default function MapaExplorer() {
  const [selected, setSelected] = useState(DISTRICTS[0].slug);
  const district = DISTRICTS.find((d) => d.slug === selected) ?? DISTRICTS[0];

  return (
    <section className="w-[94%] max-w-6xl mt-6 md:mt-8 grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-start z-10">
      <div className="md:sticky md:top-4 flex flex-col gap-3">
        <div className="border-2 border-[#1b1a5c] shadow-[0_0_24px_#1b1a5c]">
          <CityMap districts={DISTRICTS} selected={selected} onSelect={setSelected} />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {DISTRICTS.map((d) => (
            <button
              key={d.slug}
              aria-pressed={d.slug === selected}
              onClick={() => setSelected(d.slug)}
              className="btn-primary px-3! py-1! font-display text-sm uppercase aria-pressed:border-[#ff2fa8]"
            >
              {d.name}
            </button>
          ))}
        </div>
        <Disclaimer />
      </div>

      <DistrictPanel district={district} />
    </section>
  );
}
