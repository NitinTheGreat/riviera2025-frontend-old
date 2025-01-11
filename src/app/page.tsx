import { Hero } from "@/components/Hero";
import AboutSections from "@/components/About-sections";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="absolute left-0 w-full min-h-screen bg-background overflow-hidden">
        <Hero />
        <AboutSections />
      </div>
      <div className="xl:mt-[356vh] z-20 mt-[360vh] sm:mt-[350vh] md:mt-[375vh] lg:mt-[335vh] "> 
        
       </div>
    </>
  );
}
