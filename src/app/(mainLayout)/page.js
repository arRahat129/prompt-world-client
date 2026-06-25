import AboutMission from "@/components/homepage/AboutMission";
import FeaturedPrompts from "@/components/homepage/FeaturedPrompts";
import HeroBanner from "@/components/homepage/HeroBanner";
import Leaderboard from "@/components/homepage/Leaderboard";
import PlatformStats from "@/components/homepage/PlatformStats";
import RecentReviews from "@/components/homepage/RecentReviews";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <PlatformStats />
      <FeaturedPrompts />
      <WhyChooseUs />
      <Leaderboard />
      <RecentReviews />
      <AboutMission />
    </div>
  );
}
