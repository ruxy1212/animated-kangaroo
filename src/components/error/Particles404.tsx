import React, { useEffect } from "react";

import useWindowWidth from "@/lib/utils/window-width";
import { handleMouseEnter } from "@/lib/utils/mouse-enter";
import { particlesCanvas } from "./particles";

const Particles404 = ({path}:{path: string}) => {
  const canvaReference = React.useRef<HTMLCanvasElement>(null);
  const { winWidth } = useWindowWidth();

  useEffect(() => {
    setTimeout(() => {
      if (!canvaReference.current) return;
      particlesCanvas(canvaReference.current);
    }, 500);
  }, [winWidth]);
  return (
    <div className="absolute left-0 top-0 mx-auto h-full w-full max-w-[1440px] overflow-hidden">
      <canvas
        ref={canvaReference}
        id="particles_404"
        className="absolute left-0 top-0 h-[100dvh] w-full"
      />
      <header className="absolute left-0 top-0 w-full px-10 py-8 font-medium uppercase text-[#f97415] md:text-3xl">
        <h1>
          <span>Page Not Available &quot;</span>
          <span onMouseEnter={handleMouseEnter} data-value={path}>{path}</span>
          <span>&quot;</span>
        </h1>
      </header>
      <div className="absolute bottom-10 left-10 font-sans text-2xl uppercase">
        <p
          className="font-bold text-[#f97415] md:text-6xl lg:text-9xl xl:text-[10rem]"
          onMouseEnter={handleMouseEnter}
          data-value="503!!"
        >
          503
        </p>
        <p className="font-medium md:text-3xl lg:text-4xl">
          This is not the page <br /> you are looking for
        </p>
      </div>
    </div>
  );
};

export default Particles404;
