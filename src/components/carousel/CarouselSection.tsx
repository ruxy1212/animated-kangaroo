import Image from "next/image";
import Carousel from "./Carousel";

export default function CarouselSection({solutionsSection, words}: {solutionsSection: React.Ref<HTMLElement>; words: string[]; }){
  return (
    <section ref={solutionsSection} className="relative">
      <div className="relative mx-auto w-[calc(100%-40px)] md:w-[80vw]">
        <div className="flex justify-start md:justify-end pt-[5vw] mb-20 md:mb-[10vw]">
          <div className="w-[max(280px,50%)] inline-flex items-center flex-wrap gap-x-1">
            <div className="inline-flex items-center flex-wrap gap-x-2 px-2.5">
              <span className="solutions-text font-semibold text-xs uppercase">Solutions</span>
              <div className="arrow-container w-[25vw] md:w-[10vw]">
                <Image src="/img/solution-arrow.svg" alt="solution-arrow" height={0} width={0} className="arrow-svg w-full h-5"/>
              </div>
            </div>
              {words.map((word, index) => (
                <span key={index} className="sentence-word text-2xl md:text-3xl">
                  {word}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <Carousel />
      </div>
    </section>
  )
}