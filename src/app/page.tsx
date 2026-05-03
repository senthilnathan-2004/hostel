import Hero from "@/components/frontend/Hero";
import QuickInfo from "@/components/frontend/QuickInfo";
import FeaturedRooms from "@/components/frontend/FeaturedRooms";
import Amenities from "@/components/frontend/Amenities";
import Story from "@/components/frontend/Story";
import Highlights from "@/components/frontend/Highlights";
import Testimonials from "@/components/frontend/Testimonials";
import CTABanner from "@/components/frontend/CTABanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedRooms />
      <Story />
      <Amenities />
      <Highlights />
      <Testimonials />
      <CTABanner />
    </div>
  );
}
