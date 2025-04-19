import Link from "next/link";
import AboutItem from "./_fragment/AboutItem";
import ReadingText from "../common/reading-text";

export default function AboutSection({secondSectionRef, secondSectionBgRef}: 
  {secondSectionRef: React.Ref<HTMLElement>; secondSectionBgRef: React.Ref<HTMLDivElement>;}
){
  return (
    <section 
      ref={secondSectionRef} 
      className="min-h-screen bg-transparent relative pb-20"
    >
      <div 
        ref={secondSectionBgRef}
        className="absolute inset-0 w-full h-full opacity-0 z-0"
      ></div>
      
      <div className="relative z-10">
        <div className="mb-10 md:mb-[5vw]">
          <div className="flex flex-col gap-3">
            <span className="insights-text font-semibold text-xs uppercase block text-center">About Us</span>
            <div className="w-[max(280px,50%)] mx-auto">
              <ReadingText text="We offer trusted connectivity solutions to device makers, connectivity providers and IoT players worldwide" />
            </div>
            <div className="text-center py-4">
              <Link href="/about-us" className="gradient-border relative text-xs px-0.5 py-2.5">
                <span className="py-2 px-6 md:px-8 bg-el-black">More about us</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto w-[90vw] gap-5 lg:gap-8">
          <AboutItem title="+900" description="Millions connected devices use Valid's technology" />
          <AboutItem title="+100" description="Remote SIM provisioning Platform implemented worldwide" top="mt-16" />
          <AboutItem title="Top 5" description="SIM Manufacturer globally" top="mt-32" />
        </div>
      </div>
    </section>
  )
}