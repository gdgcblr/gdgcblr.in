import FooterSection from "./components/home/FooterSection";
import GallerySection from "./components/home/GallerySection";
import HeroSection from "./components/home/HeroSection";
import Navbar from "./components/home/Navbar";
import OpportunitiesSection from "./components/home/OpportunitiesSection";
import PastEventsSection from "./components/home/PastEventsSection";
import StatsSection from "./components/home/StatsSection";
import { getEventsData } from "./lib/sheets";

const chapterHref = "https://gdg.community.dev/gdg-cloud-bengaluru/";

export default async function Home() {
  const events = await getEventsData();
  const pastEvents = events.filter((e) => !e.isUpcoming);
  const featuredEvent = events.find((e) => e.isFeatured && e.isUpcoming) || events.find((e) => e.isUpcoming);
  const registerHref = featuredEvent?.link || "https://gdg.community.dev/events/details/google-gdg-cloud-bengaluru-presents-deployfest/";

  return (
    <div className="min-h-screen overflow-hidden bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar registerHref={registerHref} />

      <main id="top">
        <HeroSection chapterHref={chapterHref} />
        <StatsSection />
        <PastEventsSection events={pastEvents} />
        <OpportunitiesSection chapterHref={chapterHref} />
        <GallerySection />
        <FooterSection />
      </main>
    </div>
  );
}
