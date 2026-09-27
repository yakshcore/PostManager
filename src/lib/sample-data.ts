import type { CommunityPost } from "./types";

/** Sample content from the Stitch designs. Shown until real data exists. */

const MIN = 60_000;

export function sampleCommunityPosts(now: number): CommunityPost[] {
  return [
    {
      id: "sample-1",
      name: "Marcus Vance",
      role: "Cloud Fellow",
      createdAt: now - 3 * MIN,
      tone: "takeaways",
      text: "Thrilled to finish day 3 of #GoogleH2S Bootcamp! Built our first Gemini-powered agent architecture with scalable Kubernetes pods...",
      status: "published",
    },
    {
      id: "sample-2",
      name: "Priya Sharma",
      role: "ML Engineer",
      createdAt: now - 8 * MIN,
      tone: "thought-leader",
      text: "3 lessons on multi-modal latency from today's workshop at #GoogleDevelopers bootcamp. Big shoutout to our mentor squad!",
      status: "published",
    },
    {
      id: "sample-3",
      name: "David Chen",
      role: "Full Stack Dev",
      createdAt: now - 14 * MIN,
      tone: "hype",
      text: "Honored to be here in Mountain View for #GoogleH2S! Demoing our real-time translation app in under 1 hour. Let's build! 🚀",
      status: "published",
    },
    {
      id: "sample-4",
      name: "Aisha Larsson",
      role: "Data Scientist",
      createdAt: now - 21 * MIN,
      tone: "takeaways",
      text: "The future of enterprise analytics isn't just about faster queries, it's contextual memory. Key takeaway from the keynote at #CloudSkills...",
      status: "copied",
    },
  ];
}

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
