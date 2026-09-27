import { DeltaBadge, MetricCard, MetricValue } from "./MetricCard";

interface MetricsGridProps {
  topTag: string;
}

/** Metric values are the Stitch sample figures — wire to real analytics when a backend exists. */
export function MetricsGrid({ topTag }: MetricsGridProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Posts Generated"
        icon="auto_awesome"
        iconClass="bg-primary/10 text-primary-container"
        value={<MetricValue>842</MetricValue>}
        badge={<DeltaBadge>+24%</DeltaBadge>}
        footLeft="vs. 680 yesterday"
        footRight={<span className="font-medium text-primary">Peak 2:30 PM</span>}
        progress={80}
      />
      <MetricCard
        label="LinkedIn Impressions Reach"
        icon="trending_up"
        iconClass="bg-secondary-container/30 text-secondary"
        value={<MetricValue>128.4K</MetricValue>}
        badge={<DeltaBadge>+38%</DeltaBadge>}
        footLeft="Target: 100K reached"
        footRight={<span className="font-semibold text-tertiary">Goal Met</span>}
        progress={100}
        progressClass="bg-tertiary-container"
      />
      <MetricCard
        label="Attendee Generator Visits"
        icon="groups"
        iconClass="bg-primary-fixed/50 text-primary"
        value={<MetricValue>1,420</MetricValue>}
        badge={
          <span className="inline-flex items-center gap-0.5 text-label-sm font-label-sm text-on-surface font-semibold bg-surface-container px-1.5 py-0.5 rounded">
            59.3% conv.
          </span>
        }
        footLeft="From QR badges & slides"
        footRight={<span>842 authors</span>}
        progress={60}
      />
      <MetricCard
        label="Top Tag Activity"
        icon="tag"
        iconClass="bg-surface-container text-on-surface-variant"
        value={
          <span className="font-headline-lg text-headline-lg text-primary-container font-extrabold tracking-tight truncate">
            {topTag}
          </span>
        }
        footLeft="92% of posts included"
        footRight={<span className="font-medium text-tertiary">Viral trend</span>}
        progress={92}
      />
    </section>
  );
}
