import Link from "next/link";
import ButtonCarousel from "../carousel/ButtonCarousel";
import NextEvent from "./_fragment/NextEvent";
import BlankInsights from "./_fragment/BlankInsights";

export default function InsightsSection({insightsSection, words}: {insightsSection: React.Ref<HTMLElement>; words: string[]; }){
  return (
    <section ref={insightsSection} className="w-full min-h-screen relative z-10">
      <div className="mb-20 md:mb-[10vw]">
        <div className="flex flex-col gap-3">
          <span className="insights-text font-semibold text-xs uppercase block text-center">Latest Insights</span>
          <div className="w-[max(280px,50%)] mx-auto">
            <div className="inline-flex items-center justify-center flex-wrap gap-x-1">
              {words.map((word, index) => (
                <span key={index} className="insights-word text-2xl md:text-3xl">
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center py-4">
            <a href="/insights" className="gradient-border relative text-xs px-0.5 py-2.5">
                <span className="py-2 px-6 md:px-8 bg-el-black">All Insights</span>
            </a>
          </div>
        </div>
      </div>
      <div className="px-2 md:px-3">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="w-full max-w-[450px] md:max-w-screen mx-auto h-[80vh] md:h-[55vw]">
            <ButtonCarousel />
          </div>
          <div className="w-full max-w-[450px] md:max-w-screen mx-auto h-[80vh] md:h-[55vw]">
            <NextEvent 
              title="MWC Barcelona 2025"
              description="MWC 2025 promises to be an unmissable event—where innovation, big ideas, and global change converge. It’s the only platform where you’ll hear from industry leaders, emerging voices, and visionary tech pioneers shaping the future of connectivity"
              src="/img/bg-events-7.jpg"
              link="/next-event"
            />
          </div>
          <div className="w-full max-w-[450px] md:max-w-screen mx-auto h-[55vh] md:h-[40vw]">
            <BlankInsights 
              tag="White Papers"
              text="Optimizing eSIM Adoption: Adoption Interoperability"
              link="/insights/papers"
            />
          </div>
          <div className="w-full max-w-[450px] md:max-w-screen mx-auto h-[55vh] md:h-[40vw]">
            <BlankInsights 
              tag="PRS"
              text="CATEL Selects Valid’s Quarter-Size SIM Cards solution: A Step Towards Innovation and Sustainability"
              link="/prs/sim-solution"
            />
          </div>
        </div>
      </div>
    </section>
  )
}