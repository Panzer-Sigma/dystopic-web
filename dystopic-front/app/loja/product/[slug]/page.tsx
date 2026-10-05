import { notFound } from "next/navigation";
import SectionPage from "@/components/layout/SectionPage";
import { AddToCart, PRODUCTS, ProductGallery, formatPrice, getProduct } from "@/features/loja";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.name} — DYSTOPIC LOJA` : "Loja — DYSTOPIC CORP" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <SectionPage section="loja">
      <article className="w-[94%] md:w-[72%] max-w-5xl grid md:grid-cols-2 gap-6 md:gap-12 mt-6 md:mt-8 z-10 font-display text-white">
        <ProductGallery images={product.images} alt={product.name} />
        <div className="flex flex-col gap-4">
          <p className="uppercase tracking-wider text-white/60 text-sm">{product.category}</p>
          <h1 className="text-outline text-2xl md:text-4xl leading-tight">{product.name}</h1>
          <p className="text-xl md:text-2xl tabular-nums">{formatPrice(product.price)}</p>
          <AddToCart product={product} />
          <p className="mt-4 text-white/80 leading-relaxed">{product.description}</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-white/70">
            {[
              ["Estampa", product.print],
              ["Modelagem", product.fit],
              ["Composição", product.composition],
              ["Tamanhos", product.sizes.join(" / ")],
              ["Disponibilidade", product.availability],
              ["Ano", product.year],
              ["Origem", product.origin],
              ["Código", product.code],
            ].map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="uppercase tracking-wider">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </SectionPage>
  );
}
