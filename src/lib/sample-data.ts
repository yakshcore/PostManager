/** Sample content from the Stitch designs, shown until the attendee generates their own post. */

const MIN = 60_000;

export const SAMPLE_POST = `Still processing what an incredible week it was at the Google H2S Bootcamp 🚀

Over the past 5 days at Google Mountain View, I had the privilege to deep-dive into cutting-edge cloud infrastructure and build with Gemini 1.5 Pro. Our team architected an end-to-end multi-agent system deployed directly on Google Cloud Run.

3 big takeaways from this experience:
💡 Modular Architecture: Scalability starts with clear agent communication boundaries.
💡 Engineering Mentorship: Real-time code reviews from Google engineers shaved days off our debugging cycles.
💡 Community Power: The talent and energy in this cohort was unmatched!

Huge thank you to @Google for Developers, our dedicated mentor Alex Rivera, and all the event organizers for putting together such an empowering experience.

Excited for what's next! 💻✨

#GoogleH2S #GoogleDevelopers #GeminiSprint #TechBootcamp2025 #CloudSkills #WomenInTech`;

export const SAMPLE_HIGHLIGHTS =
  "Completed intensive 5-day hackathon sprint! Built an autonomous research agent using Gemini 1.5 Pro and Google Cloud Run. Immense gratitude to our mentor Alex Rivera and the whole Google Developer team for the hands-on code reviews. Loved connecting with fellow engineers from across the country.";

export const SAMPLE_PHOTOS = [
  { id: "sample-workshop", name: "hackathon_team.jpg", src: "/stitch/workshop.jpg", uploaded: false },
  { id: "sample-event", name: "bootcamp_certificate.jpg", src: "/stitch/event.jpg", uploaded: false },
];

export function relativeTime(ts: number, now = Date.now()): string {
  const mins = Math.max(0, Math.round((now - ts) / MIN));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
