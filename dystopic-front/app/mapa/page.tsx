import SectionPage from "@/components/layout/SectionPage";
import { MapaExplorer } from "@/features/mapa";

export const metadata = { title: "Mapa — DYSTOPIC CORP" };

export default function MapaPage() {
  return (
    <SectionPage section="mapa">
      <MapaExplorer />
    </SectionPage>
  );
}
