import UnderConstruction from "@/components/layout/UnderConstruction";

export const metadata = { title: "Archival — DYSTOPIC CORP" };

// ponytail: feed parked while archival is under construction; restore by rendering <ArchivalFeed /> from "@/features/archival" again.
export default function ArchivalPage() {
  return (
    <UnderConstruction
      section="archival"
      src="/assets/archival/btn-archival.png"
      alt="Archival"
      box="aspect-[230/49] w-[clamp(230px,49vw,420px)]"
      message="O archival Dystopic está sendo catalogado."
    />
  );
}
