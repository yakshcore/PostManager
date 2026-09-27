import type { Metadata } from "next";
import { Suspense } from "react";
import { AttendeeView } from "@/components/attendee/AttendeeView";

export const metadata: Metadata = { title: "Attendee View · PostManager" };

export default function AttendeePage() {
  return (
    <Suspense>
      <AttendeeView />
    </Suspense>
  );
}
