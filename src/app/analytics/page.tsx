import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Analytics · EventPulse" };

// No Stitch screen exists for Analytics yet; placeholder in the same design language.
export default function AnalyticsPage() {
  return (
    <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 sm:p-12 flex flex-col items-center text-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon name="insights" className="text-[26px]" />
      </div>
      <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Analytics is coming soon</h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
        Reach, engagement and hashtag performance will live here. For now, key metrics are on the Organizer Dashboard.
      </p>
      <Link
        href="/organizer"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary transition-all"
      >
        Go to Organizer Dashboard
        <Icon name="arrow_forward" className="text-[18px]" />
      </Link>
    </section>
  );
}
