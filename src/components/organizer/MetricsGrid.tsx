import { DeltaBadge, MetricCard, MetricValue } from "./MetricCard";
import { compact, type EventMetrics } from "@/lib/metrics";

export function MetricsGrid({ m }: { m: EventMetrics }) {
  const publishedShare = m.total ? Math.round((m.published / m.total) * 100) : 0;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Posts Generated"
        icon="auto_awesome"
        iconClass="bg-primary/10 text-primary-container"
        value={<MetricValue>{compact(m.total)}</MetricValue>}
        badge={m.delta !== null && m.delta >= 0 ? <DeltaBadge>+{m.delta}%</DeltaBadge> : null}
        footLeft={`${m.today} today · ${m.yesterday} yesterday`}
        footRight={m.peakHour && <span className="font-medium text-primary">Peak {m.peakHour}</span>}
        progress={m.conversion}
      />
      <MetricCard
        label="Published to LinkedIn"
        icon="trending_up"
        iconClass="bg-secondary-container/30 text-secondary"
        value={<MetricValue>{compact(m.published)}</MetricValue>}
        badge={
          m.total > 0 && (
            <span className="inline-flex items-center gap-0.5 text-label-sm font-label-sm text-tertiary font-semibold">
              {publishedShare}%
            </span>
          )
        }
        footLeft="Opened in LinkedIn by attendees"
        footRight={publishedShare >= 50 && <span className="font-semibold text-tertiary">Strong</span>}
        progress={publishedShare}
        progressClass="bg-tertiary-container"
      />
      <MetricCard
        label="Attendee Generator Visits"
        icon="groups"
        iconClass="bg-primary-fixed/50 text-primary"
        value={<MetricValue>{compact(m.visits)}</MetricValue>}
        badge={
          <span className="inline-flex items-center gap-0.5 text-label-sm font-label-sm text-on-surface font-semibold bg-surface-container px-1.5 py-0.5 rounded">
            {m.conversion}% conv.
          </span>
        }
        footLeft="From QR badges & shared links"
        footRight={<span>{m.total} post{m.total === 1 ? "" : "s"}</span>}
        progress={m.conversion}
      />
      <MetricCard
        label="Top Tag Activity"
        icon="tag"
        iconClass="bg-surface-container text-on-surface-variant"
        value={
          <span className="font-headline-lg text-headline-lg text-primary-container font-extrabold tracking-tight truncate">
            {m.topTag ?? "—"}
          </span>
        }
        footLeft={`${m.topTagShare}% of posts included`}
        footRight={m.topTagShare >= 80 && <span className="font-medium text-tertiary">Viral trend</span>}
        progress={m.topTagShare}
      />
    </section>
  );
}
