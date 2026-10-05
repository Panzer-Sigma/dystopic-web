import SectionPage from "@/components/layout/SectionPage";
import { ProductGrid } from "@/features/loja";

export const metadata = { title: "Loja — DYSTOPIC CORP" };

export default function LojaPage() {
  return (
    <SectionPage section="loja">
      <ProductGrid />
    </SectionPage>
  );
}
