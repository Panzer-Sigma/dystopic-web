export interface Product {
  /** URL segment: /loja/product/<slug> */
  slug: string;
  name: string;
  /** Price in centavos, so sums stay exact. */
  price: number;
  /** Photos in display order; the first one is the grid and cart cover. */
  images: string[];
  sizes: string[];
  category: string;
  year: string;
  /** Modelagem */
  fit: string;
  availability: string;
  /** Estampa */
  print: string;
  /** Código do produto */
  code: string;
  origin: string;
  composition: string;
  description: string;
}
