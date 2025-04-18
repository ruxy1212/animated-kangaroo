import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type AnimationProps = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  duration?: number;
  ease?: string;
  stagger?: number;
};

export default function ReadingText({text}: {text: string}) {
  
  const containerRef = useRef(null);
  useGSAP(() => {
    if (!containerRef.current) return;
    function animateWhenVisible(
      elements: string | Element | Element[] | NodeListOf<Element>, 
      animationProps: AnimationProps
    ) {
      gsap.set(elements, animationProps.from);
      ScrollTrigger.create({
        trigger: elements,
        start: 'top 85%', 
        onEnter: () => {
          gsap.to(elements, {
            ...animationProps.to,
            duration: animationProps.duration || 1,
            ease: animationProps.ease || 'power2.out',
            stagger: animationProps.stagger || 0
          });
        },
        once: true
      });
    }

    animateWhenVisible('.sentence-word', {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 4
    });
  }, { scope: containerRef });

  // const text = "We offer trusted connectivity solutions to device makers, connectivity providers and IoT players worldwide";
  const words: string[] = text.split(' ');

  return (
    <div className="inline-flex items-center justify-center flex-wrap gap-x-1">
      {words.map((word, index) => (
        <span key={index} className="sentence-word text-2xl md:text-3xl">
          {word}
        </span>
      ))}
    </div>
  )

}