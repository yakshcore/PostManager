import type { Metadata } from "next";
import { AttendeeLanding } from "@/components/attendee/AttendeeLanding";

export const metadata: Metadata = { title: "Attendee View · PostManager" };

export default function AttendeePage() {
  return <AttendeeLanding />;
}
