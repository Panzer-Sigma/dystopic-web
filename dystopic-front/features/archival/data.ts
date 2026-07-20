export interface ArchivalEntry {
  /** URL segment: /archival/<slug> */
  slug: string;
  title: string;
  year: string;
  /** Image shown in the feed and on the entry page. */
  image: string;
  /** Native aspect ratio of `image`, as a CSS aspect-ratio value. */
  aspect: string;
  description: string;
}

// Placeholder archive. The design ships one example capture; real entries
// replace this list without any component changes.
export const ARCHIVAL_ENTRIES: ArchivalEntry[] = [
  { slug: "colecao-dystopic-2022", title: "Coleção Dystopic 2022", year: "2022", image: "/assets/archival/example-single.png", aspect: "1688 / 844", description: "Registro da primeira coleção Dystopic." },
  { slug: "ensaio-rato-urbano", title: "Ensaio Rato Urbano", year: "2023", image: "/assets/archival/example-single.png", aspect: "1688 / 844", description: "Ensaio fotográfico nas ruas da cidade." },
  { slug: "biohazard-racing", title: "Biohazard Racing", year: "2023", image: "/assets/archival/example-single.png", aspect: "1688 / 844", description: "Série sobre velocidade e contaminação." },
  { slug: "corrente-fechada", title: "Corrente Fechada", year: "2024", image: "/assets/archival/example-single.png", aspect: "1688 / 844", description: "Estudo de correntes e clausura." },
  { slug: "plataforma-regenerativa", title: "Plataforma Regenerativa", year: "2024", image: "/assets/archival/example-single.png", aspect: "1688 / 844", description: "Documentação do conceito regenerativo." },
  { slug: "transmissao-noturna", title: "Transmissão Noturna", year: "2025", image: "/assets/archival/example-single.png", aspect: "1688 / 844", description: "Capturas da transmissão noturna." },
  { slug: "arquivo-morto", title: "Arquivo Morto", year: "2025", image: "/assets/archival/example-single.png", aspect: "1688 / 844", description: "O que sobrou do arquivo anterior." },
  { slug: "sinal-perdido", title: "Sinal Perdido", year: "2026", image: "/assets/archival/example-single.png", aspect: "1688 / 844", description: "Fragmentos de sinal interrompido." },
  { slug: "corp-2026", title: "Corp 2026", year: "2026", image: "/assets/archival/example-single.png", aspect: "1688 / 844", description: "Registro institucional Dystopic Corp." },
];

export const PAGE_SIZE = 3;
export const TOTAL_PAGES = Math.ceil(ARCHIVAL_ENTRIES.length / PAGE_SIZE);

export function getEntry(slug: string): ArchivalEntry | undefined {
  return ARCHIVAL_ENTRIES.find((e) => e.slug === slug);
}
