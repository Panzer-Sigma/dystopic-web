import SectionPage from "@/components/layout/SectionPage";
import { Checkout } from "@/features/loja";

export const metadata = { title: "Checkout — DYSTOPIC LOJA" };

export default function CheckoutPage() {
  return (
    <SectionPage section="loja">
      <Checkout />
    </SectionPage>
  );
}
