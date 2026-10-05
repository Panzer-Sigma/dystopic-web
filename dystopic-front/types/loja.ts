export interface Product {
  /** URL segment: /loja/product/<slug> */
  slug: string;
  name: string;
  /** Price in centavos, so sums stay exact. */
  price: number;
  /** Photos in display order; the first one is the grid and cart cover. */
  images: string[];
  /** Units available per size, in display order; 0 shows the size as Esgotado. */
  stock: Record<string, number>;
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
