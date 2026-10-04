import type { Product } from "@/types/loja";

// Catalog from DESIGN/SITE LOJA: one folder per product, metadata from its "Descrição" doc.
const COMMON = {
  sizes: ["P", "M"],
  availability: "Pronta entrega / sob encomenda",
  composition: "100% poliéster (Dry Fit)",
};

const description = (piece: string) =>
  `${piece} criada para vestir a estética de Camuflagem Rastreada no cotidiano. Confeccionada em Dry Fit 100% poliéster, a peça combina uma modelagem limpa e ajustada ao corpo com uma estampa exclusiva, aplicada por sublimação diretamente no tecido.`;

const photos = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/assets/loja/${slug}/${i + 1}.webp`);

export const PRODUCTS: Product[] = [
  { ...COMMON, slug: "camiseta-apocalypse", name: "Camiseta T-Shirt _apocalypse_", price: 20000, images: photos("camiseta-apocalypse", 4), category: "Camiseta T-Shirt", description: description("Uma camiseta") },
  { ...COMMON, slug: "camiseta-glitch-gengar", name: "Camiseta T-Shirt _Glitch Gengar_", price: 20000, images: photos("camiseta-glitch-gengar", 5), category: "Camiseta T-Shirt", description: description("Uma camiseta") },
  { ...COMMON, slug: "camiseta-toxina-arida", name: "Camiseta T-Shirt Toxina Arida", price: 20000, images: photos("camiseta-toxina-arida", 3), category: "Camiseta T-Shirt", description: description("Uma camiseta") },
  { ...COMMON, slug: "manga-longa-exp-dentes", name: "Camiseta Manga Longa EXP.Dentes", price: 15000, images: photos("manga-longa-exp-dentes", 4), category: "Camiseta T-Shirt Manga Longa", description: description("Uma camiseta") },
  { ...COMMON, slug: "regata-dont-enter", name: "Regata T-Shirt Don't Enter", price: 20000, images: photos("regata-dont-enter", 4), category: "Regata T-Shirt", description: description("Uma regata") },
  { ...COMMON, slug: "vestido-longo-ice-scream", name: "Vestido Longo Ice Scream", price: 25000, images: photos("vestido-longo-ice-scream", 3), category: "Vestido Longo", description: description("Um vestido") },
];

export const PAGE_SIZE = 6;
export const TOTAL_PAGES = Math.ceil(PRODUCTS.length / PAGE_SIZE);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatPrice(centavos: number): string {
  return brl.format(centavos / 100);
}
