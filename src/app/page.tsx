import { LandingPage } from "@/components/landing-page";
import { getHomeEvents, getMlagaSchedule, getSermons } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [mlagaItems, events, sermons] = await Promise.all([
    getMlagaSchedule(3),
    getHomeEvents(3),
    getSermons(1),
  ]);

  return (
    <LandingPage
      mlagaItems={mlagaItems}
      events={events}
      latestSermon={sermons[0] ?? null}
    />
  );
}
