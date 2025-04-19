import CommonButton from "../common/common-button";

export default function Hero({heroSection, contactExpert}: {heroSection: React.Ref<HTMLElement>; contactExpert: () => void; }){
  return (
    <section ref={heroSection} className="relative w-full min-h-screen overflow-hidden p-[90vw_0_30vw] xs:p-[45vw_0_30vw] md:p-[28.625vw_0_10vw]" data-component="hero-supertitle">
      <div className="absolute h-full w-full left-0 top-0 transform opacity-100 scale-100 transition-none hero-video will-change-transform">
        <video preload="metadata" autoPlay loop={true} playsInline={true} muted={true} poster="/img/bg-valid-video.jpg" className="w-full align-middle h-full object-cover left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0">
          <source src="/video/Hero-valid.mp4" type="video/mp4" />Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-baseline align-baseline absolute bottom-0 top-auto left-1/2 -translate-x-1/2 h-[200vh] w-[200vw] origin-bottom bg-[radial-gradient(circle,_rgba(10,13,58,0)_0%,_#0a0d3a_50%)]"></div>
      <div className="relative mx-auto w-[calc(100%-40px)] md:w-[80vw]">
        <div className="super-title text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-geist-sans)]">
          <div className="font-bold mb-3 lg:mb-0">
            <em className="hero-text text-transparent not-italic">Empowering</em>
          </div>
          <div className="flex gap-2 items-center font-bold mb-3 lg:mb-0">
            <CommonButton variant="normal" text="Talk to our experts" onClick={()=>contactExpert()} className="hidden lg:inline mt-3 font-normal text-sm text-el-primary-dark bg-el-white backdrop-blur-3xl px-6 py-2.5 rounded-4xl border border-transparent hover:text-el-white hover:bg-el-primary-dark cursor-pointer"/>
            seamless
          </div>
          <div className="font-bold mb-3 lg:mb-0">connectivity</div>
          <CommonButton variant="normal" text="Talk to our experts" onClick={()=>contactExpert()} className="lg:hidden mt-5 font-normal text-sm text-el-primary-dark bg-el-white backdrop-blur-3xl px-6 py-2.5 rounded-4xl border border-transparent hover:text-el-white hover:bg-el-primary-dark cursor-pointer"/>
        </div>
      </div>
    </section>
  )
}