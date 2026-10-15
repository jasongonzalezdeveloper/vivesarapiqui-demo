import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/layout/PageShell";
import { BusinessDirectory } from "@/components/businesses/BusinessDirectory";

export const metadata: Metadata = { title: "Comercios" };

export default function ComerciosPage() {
  return (
    <PageShell>
      <div className="flex flex-col gap-4 px-5 pt-5 pb-8 lg:px-0 lg:pt-0">
        <PageIntro title="Comercios locales" />
        <BusinessDirectory />
      </div>
    </PageShell>
  );
}
