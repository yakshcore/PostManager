"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AttendeeGenerator } from "./AttendeeGenerator";
import { useEventConfig } from "@/hooks/useEventConfig";
import { decodeEvent } from "@/lib/event-config";

/** Uses the event from a shared link (`?e=`) when present, otherwise the organizer's saved settings. */
export function AttendeeView() {
  const params = useSearchParams();
  const [saved] = useEventConfig();
  const encoded = params.get("e");
  const shared = useMemo(() => (encoded ? decodeEvent(encoded) : null), [encoded]);

  return <AttendeeGenerator event={shared ?? saved} />;
}
