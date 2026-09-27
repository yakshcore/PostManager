"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { StatusCard } from "@/components/ui/StatusCard";
import { isOrganizer, useAuth } from "@/lib/firebase/auth";
import { useActiveEventId } from "@/hooks/useFirestoreData";

/** `/attendee` without an event: organizers jump to their active event's portal; others need a shared link. */
export function AttendeeLanding() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const activeId = useActiveEventId();
  const canPreview = isOrganizer(user) && !!activeId;

  useEffect(() => {
    if (canPreview) router.replace(`/attendee/${activeId}${window.location.hash}`);
  }, [canPreview, activeId, router]);

  if (loading || canPreview) return <StatusCard icon="progress_activity" title="Opening the attendee portal…" spinning />;

  return (
    <StatusCard icon="qr_code_2" title="Open your event's link">
      <p>Scan the QR code or open the link your event organizer shared to create your LinkedIn post.</p>
      <p>
        Organizer?{" "}
        <Link href="/organizer" className="font-semibold text-primary hover:underline">
          Sign in to the dashboard
        </Link>
      </p>
    </StatusCard>
  );
}
