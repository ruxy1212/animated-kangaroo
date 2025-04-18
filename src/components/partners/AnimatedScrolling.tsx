import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AnimatedScrolling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // Preload all images
  useEffect(() => {
    const imgArray: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= 180; i++) {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 180) {
          setImagesLoaded(true);
        }
      };
      img.src = `/path/to/images/${i.toString().padStart(5, '0')}.jpg`;
      imgArray.push(img);
    }
    
    setImages(imgArray);
  }, []);
  
  // Draw the current frame on canvas
  useEffect(() => {
    if (imagesLoaded && images.length > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx && images[currentFrame]) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(images[currentFrame], 0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [currentFrame, images, imagesLoaded]);

  // Main animation with GSAP
  useGSAP(() => {
    if (!containerRef.current || !titleRef.current || !eyeRef.current || !imagesLoaded) return;
    
    const section = containerRef.current;
    const title = titleRef.current;
    const eye = eyeRef.current;
    
    // Clear any existing ScrollTriggers to avoid conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Set initial states
    gsap.set(title, {
      translateY: "50%",
      backgroundPositionX: "0%",
      transformOrigin: "516px 114px",
      scale: 0.8,
    });
    
    gsap.set(eye, {
      scale: 0.5,
      opacity: 0.0001,
    });
    
    // Main timeline that controls all animations
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", // Animation starts exactly when section hits viewport top
        end: "+=1010vh", // Total scroll length
        pin: true,
        scrub: 1, // Smooth scrubbing for better feel
        anticipatePin: 1,
      }
    });
    
    // Stage 1: 0-400vh - Only h1 animates
    mainTimeline.to(title, {
      scale: 1,
      translateY: "0%",
      backgroundPositionX: "20%",
      ease: "none",
      duration: 400 / 1010, // Normalize to timeline duration
    });
    
    // At 400vh mark, change transform origin
    mainTimeline.set(title, { 
      transformOrigin: "50% 20%" 
    }, 400 / 1010);
    
    // Stage 2: 400-600vh - Scale increases, bg position changes
    mainTimeline.to(title, {
      scale: 10,
      backgroundPositionX: "50%",
      ease: "none",
      duration: 200 / 1010,
    }, 400 / 1010);
    
    // Stage 3: 600-800vh - h1 scales further, eye starts appearing
    mainTimeline.to(title, {
      scale: 30,
      backgroundPositionX: "100%",
      ease: "none",
      duration: 200 / 1010,
    }, 600 / 1010);
    
    // Eye starts appearing exactly at 600vh
    mainTimeline.to(eye, {
      scale: 0.7,
      opacity: 0.3,
      ease: "none",
      duration: 200 / 1010,
    }, 600 / 1010); // Synchronize with the 600vh mark
    
    // Stage 4: 800-900vh - h1 scales to maximum, eye becomes more visible
    mainTimeline.to(title, {
      scale: 60,
      ease: "none",
      duration: 100 / 1010,
    }, 800 / 1010);
    
    mainTimeline.to(eye, {
      scale: 0.9,
      opacity: 0.7,
      ease: "none",
      duration: 100 / 1010,
    }, 800 / 1010);
    
    // Stage 5: 900-1010vh - Container fades, eye becomes fully visible
    mainTimeline.to(".text-container", {
      opacity: 0,
      ease: "none",
      duration: 10 / 1010,
    }, 900 / 1010);
    
    mainTimeline.to(eye, {
      scale: 1,
      opacity: 1,
      ease: "none",
      duration: 110 / 1010,
    }, 900 / 1010);
    
    // Handle frame animation precisely from 600vh to 910vh
    ScrollTrigger.create({
      trigger: section,
      start: "top top", // Start from the top of section
      end: "+=1010vh", // End at the total scroll length
      onUpdate: (self) => {
        // Only process frames between 600vh and 910vh scroll points
        if (self.progress * 1010 >= 600 && self.progress * 1010 <= 910) {
          // Map the progress between 600vh-910vh to frame indices (0-179)
          const progressInRange = (self.progress * 1010 - 600) / (910 - 600);
          const frameIndex = Math.floor(progressInRange * 179);
          setCurrentFrame(Math.min(179, Math.max(0, frameIndex)));
        }
      },
      scrub: 1,
    });
    
  }, { scope: containerRef, dependencies: [imagesLoaded] });

  return (
    <div className="relative" ref={containerRef}>
      {/* Main animating section */}
      <section className="h-[1010vh] pt-[15vw] pb-[20vw] bg-[#0a0d3a]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Eye element with canvas */}
          <div ref={eyeRef} className="eye h-full w-full absolute opacity-[0.0001]">
            <canvas ref={canvasRef} width="1280" height="632" className="absolute h-full w-full top-0 left-0 right-0 bottom-0"></canvas>
            <div className="top absolute w-full h-[20vw] top-0 left-0 bg-gradient-to-b from-[#0a0d3a] to-transparent z-10"></div>
            <div className="bottom absolute w-full h-[20vw] bottom-0 left-0 bg-gradient-to-t from-[#0a0d3a] to-transparent z-0"></div>
          </div>
          
          {/* Text container */}
          <div className="text-container mx-auto max-w-full w-[80vw] px-[0.833vw] relative">
            <div className="flex flex-row justify-start ml-[-0.417vw] mr-[-0.417vw] gap-y-[0.833vw]">
              <div className="px-[0.417vw] relative super-title">
                <h1 
                  ref={titleRef}
                  className="text-[7.083vw] font-medium leading-[0.82] text-center to-[#3f0085] bg-[length:400%_100%] text-transparent bg-clip-text"
                >
                  Your trusted partner for secure and interoperable mobile services
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Next section that overlaps */}
      <section className="h-screen bg-[#0a0d3a] flex items-center justify-center">
        <h2 className="text-6xl text-white">Next Section</h2>
      </section>
    </div>
  );
}