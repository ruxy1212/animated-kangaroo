export default function InfiniteText({textRef, firstLine, secondLine}: 
  {
    textRef: React.Ref<HTMLHeadingElement>;
    firstLine: React.Ref<HTMLSpanElement>;
    secondLine: React.Ref<HTMLSpanElement>;
  }
){
  return (
    <div className="hero-text mb-[10vw] pb-5 overflow-hidden">
      <div className="flex whitespace-nowrap scrolling-text">
        <h1 ref={textRef} className="text-7xl md:text-9xl font-grotesk font-semibold text-el-primary-dark">
          <span ref={firstLine} style={{ display: "inline-block", marginRight: "30px" }}>Empowering the future of connectivity</span>
          <span ref={secondLine} style={{ display: "inline-block", marginRight: "30px" }}>Empowering the future of connectivity</span>
        </h1>
      </div>
    </div>
  )
}