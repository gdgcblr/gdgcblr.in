import FooterSection from "./components/home/FooterSection";
import GallerySection from "./components/home/GallerySection";
import HeroSection from "./components/home/HeroSection";
import Navbar from "./components/home/Navbar";
import OpportunitiesSection from "./components/home/OpportunitiesSection";
import PastEventsSection from "./components/home/PastEventsSection";
import StatsSection from "./components/home/StatsSection";

const chapterHref = "https://gdg.community.dev/gdg-cloud-bengaluru/";
const registerHref =
  "https://gdg.community.dev/events/details/google-gdg-cloud-bengaluru-presents-deployfest/";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar registerHref={registerHref} />

      <main id="top">
        <HeroSection chapterHref={chapterHref} />
        <StatsSection />
        <PastEventsSection />
        <OpportunitiesSection chapterHref={chapterHref} />
        <GallerySection />
        <FooterSection />
      </main>
    </div>
  );
}
