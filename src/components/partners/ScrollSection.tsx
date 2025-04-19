type ScrollSectionProps = {
  sectionRef: React.Ref<HTMLElement>;
  eyeRef: React.Ref<HTMLDivElement>;
  canvasRef: React.Ref<HTMLCanvasElement>;
  containerRef: React.Ref<HTMLDivElement>;
  h1Ref: React.Ref<HTMLHeadingElement>;
  text: string;
}

const ScrollSection = ({sectionRef, eyeRef, canvasRef, containerRef, h1Ref, text}: ScrollSectionProps) => {
  return (
    <section
      ref={sectionRef}
      className="relative h-[505vh] pb-[15vw]"
    >
      <div className="sticky top-0 overflow-hidden">
        <div
          ref={eyeRef}
          className="eye w-full top-0 fixed h-screen opacity-[0.0001] scale-50"
        >
          <canvas
            ref={canvasRef}
            width={1280}
            height={632}
            className="absolute inset-0 w-full h-auto md:h-full top-1/2 md:top-0 -translate-y-1/2 md:translate-none"
          />
          <div
            className="top absolute top-[26vh] md:top-0 left-0 w-full h-[20vw] z-[1]"
            style={{
              background: 'linear-gradient(180deg, #0a0d3a, rgba(12, 8, 96, 0))',
            }}
          />
          <div
            className="right absolute right-0 top-0 h-full w-[40vw] z-0"
            style={{
              background: 'linear-gradient(270deg, #0a0d3a, rgba(12, 8, 96, 0))',
            }}
          />
          <div
            className="left absolute top-0 left-0 h-full w-[40vw] z-[1]"
            style={{
              background: 'linear-gradient(90deg, #0a0d3a, rgba(12, 8, 96, 0))',
            }}
          />
          <div
            className="bottom absolute bottom-[26vh] md:bottom-0 left-0 w-full h-[20vw] z-0"
            style={{
              background: 'linear-gradient(0deg, #0a0d3a, rgba(1, 5, 41, 0))',
            }}
          />
        </div>
        <div ref={containerRef} className="container mx-auto w-[80vw] px-[0.833vw] h-[100vh] flex relative">
          <div className="columns my-auto flex flex-row justify-start -mx-[0.417vw]">
            <div className="item px-[0.417vw] relative super-title">
              <h1
                ref={h1Ref}
                className="text-[7.083vw] font-medium leading-[0.82] text-center font-grotesk"
              >{text}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;