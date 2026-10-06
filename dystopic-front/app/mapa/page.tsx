import SectionPage from "@/components/layout/SectionPage";
import { Disclaimer, MapaExplorer } from "@/features/mapa";

export const metadata = { title: "Mapa — DYSTOPIC CORP" };

export default function MapaPage() {
  return (
    <SectionPage section="mapa">
      <MapaExplorer />
      <Disclaimer />
    </SectionPage>
  );
}
