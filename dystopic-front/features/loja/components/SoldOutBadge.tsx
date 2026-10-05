/** "Esgotado" tag laid over a product photo once every size is sold. */
export default function SoldOutBadge() {
  return (
    <span className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 md:px-3 md:py-1 bg-[#16164f] border-2 border-neutral-500 font-display font-semibold uppercase tracking-wider text-white text-xs md:text-base">
      Esgotado
    </span>
  );
}
