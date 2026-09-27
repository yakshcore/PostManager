import type { Metadata } from "next";
import { AttendeeEventView } from "@/components/attendee/AttendeeEventView";

export const metadata: Metadata = { title: "Attendee View · PostManager" };

export default async function AttendeeEventPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  return <AttendeeEventView eventId={eventId} />;
}
