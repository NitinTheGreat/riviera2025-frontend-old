import { Hero } from "@/components/Hero";
import AboutSections from "@/components/About-sections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="absolute left-0 w-full min-h-screen bg-background overflow-hidden z-50">
        <Hero />
        <AboutSections />
        <Footer />
      </div>
    </>
  );
}
