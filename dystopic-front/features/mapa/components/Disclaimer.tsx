import { DISCLAIMER } from "../data";

/** Safety notice shown under the map and district guide, above the footer. */
export default function Disclaimer() {
  return (
    <aside role="note" className="w-[94%] max-w-6xl mt-6 z-10 border-2 border-[#ff2fa8] bg-black/90 p-3 font-display text-sm md:text-base leading-relaxed text-[#e4e0ff]">
      <strong className="mr-1 font-bold text-[#ff2fa8]">CUIDADO:</strong>
      {DISCLAIMER}
    </aside>
  );
}
