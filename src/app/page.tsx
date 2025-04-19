'use client';

import Image from "next/image";
import Link from "next/link";


import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Carousel from "@/components/carousel/Carousel";
import ScrollSection from "@/components/partners/ScrollSection";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ButtonCarousel from "@/components/carousel/ButtonCarousel";
import MobileMenu from "@/components/header/MobileMenu";
import ContactExpert from "@/components/header/ContactExpert";
import Modal from "@/components/modal/Modal";

gsap.registerPlugin(ScrollTrigger);

type AnimationProps = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  duration?: number;
  ease?: string;
  stagger?: number;
};

export default function Home() {
  const [modal, setModal] = useState(false);
  const [respond, setRespond] = useState(false);
  const [response, setResponse] = useState({
    title: '',
    message: ''
  })
  const heroSection = useRef(null);
  const solutionsSection = useRef(null);
  const insightsSection = useRef(null);

  const contactExpert = () => {
    setModal(true);
  };

  useGSAP(() => {
    if (!heroSection.current) return;

    gsap.fromTo('.hero-text', 
      { backgroundPositionX: '-100%' },
      {
      backgroundPositionX: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection.current,
        scrub: true,
        start: 'top bottom',
        end: 'bottom top',
      },
    });

    gsap.fromTo(
      '.hero-video',
      {
        opacity: 1,
        y: '0vh',
        scale: 1,
      },
      {
        opacity: -1,
        y: '33.33vh',
        scale: 1.4,
        scrollTrigger: {
          trigger: heroSection.current,
          scrub: true,
          start: 'top top',
          end: 'bottom top',
          pin: false,
          markers: false,
        },
      }
    );

    gsap.fromTo(
      '.video-baseline',
      {
        scale: 1,
      },
      {
        scale: 0.5,
        scrollTrigger: {
          trigger: heroSection.current,
          scrub: true,
          start: 'top top', // Start when top of heroSection hits top of viewport
          end: 'bottom top', // End when bottom of heroSection hits top of viewport
          markers: false, // Set to true for debugging
        },
      }
    );

  }, { scope: heroSection });

  useGSAP(() => {
    if (!solutionsSection.current) return;
    
    // For solutions-text
    gsap.fromTo(
      '.solutions-text',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.solutions-text', // Target the element itself, not heroSection
          start: 'top 90%', // Only start when the element is 90% into the viewport
          toggleActions: 'play none none none',
          once: true
        },
      }
    );

    // For arrow-container
    gsap.fromTo(
      '.arrow-container',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.arrow-container', // Target the element itself
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        },
      }
    );

    // For arrow-svg
    gsap.fromTo(
      '.arrow-svg',
      { scaleX: 0, transformOrigin: '0 50%' },
      {
        scaleX: 1,
        duration: 4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.arrow-svg', // Target the element itself
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        },
      }
    );

    // For sentence-word
    gsap.fromTo(
      '.sentence-word',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.sentence-word', 
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        },
      }
    );
  }, { scope: solutionsSection });

  useGSAP(() => {
    function animateWhenVisible(elements: string | Element | Element[] | NodeListOf<Element>, animationProps: AnimationProps) {
      if(insightsSection.current === null) return;
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

    animateWhenVisible('.insights-text', {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 4
    });
    
    animateWhenVisible('.insights-word', {
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
      duration: 0.8
    });
  }, { scope: insightsSection });

  const sentence = 'We deliver trusted connectivity and guarantee interoperability through:';
  const evolve = 'Stay informed on the latest trends and discover how the world around you is evolving.';
  const evolveWords = evolve.split(' ');
  const words = sentence.split(' ');


  return (
    <div className="bg-el-black min-h-screen">
      <Header contactExpert={contactExpert}/>
      <MobileMenu contactExpert={contactExpert}/>
      <ContactExpert
        isOpen={modal}
        onClose={()=>setModal(false)}
        showDialogue={()=>{
          setResponse({
            title: "Request Sent Successfully",
            message: "Your response has been saved! You will receive an email shortly for further information."
          });
          setRespond(true);
        }}
      />
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
              <button onClick={()=>contactExpert()} className="hidden lg:inline mt-3 font-normal text-sm text-el-primary-dark bg-el-white backdrop-blur-3xl px-6 py-2.5 rounded-4xl border border-transparent hover:text-el-white hover:bg-el-primary-dark">Talk to our experts</button>
              seamless
            </div>
            <div className="font-bold mb-3 lg:mb-0">connectivity</div>
            <button onClick={()=>contactExpert()} className="lg:hidden mt-5 font-normal text-sm text-el-primary-dark bg-el-white backdrop-blur-3xl px-6 py-2.5 rounded-4xl border border-transparent hover:text-el-white hover:bg-el-primary-dark">Talk to our experts</button>
          </div>
        </div>
      </section>
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
          <Carousel/>
        </div>
      </section>
      <section ref={insightsSection} className="w-full min-h-screen relative z-10">
        <div className="mb-20 md:mb-[10vw]">
          <div className="flex flex-col gap-3">
            <span className="insights-text font-semibold text-xs uppercase block text-center">Latest Insights</span>
            <div className="w-[max(280px,50%)] mx-auto">
              <div className="inline-flex items-center justify-center flex-wrap gap-x-1">
                {evolveWords.map((word, index) => (
                  <span key={index} className="insights-word text-2xl md:text-3xl">
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center py-4">
              <Link href="#" className="gradient-border relative text-xs px-0.5 py-2.5">
                  <span className="py-2 px-6 md:px-8 bg-el-black">All Insights</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="px-2 md:px-3">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="w-full max-w-[450px] md:max-w-screen mx-auto h-[80vh] md:h-[55vw]">
              <ButtonCarousel />
            </div>
            <div className="w-full max-w-[450px] md:max-w-screen mx-auto h-[80vh] md:h-[55vw]">
              <div className="h-full w-full rounded-2xl border border-transparent transition-colors hover:border-el-primary-dark duration-1000 bg-el-dark-black relative group overflow-hidden">
                <div className="absolute w-full h-full top-0 left-0">
                  <Image src="/img/bg-events-7.jpg" alt="Coming events" height={0} width={0} className="h-full w-full object-cover duration-1000 transition-transform group-hover:scale-105" unoptimized= {true}/>
                </div>
                <div className="absolute w-full h-full top-0 left-0 bg-el-dark-black/30"></div>
                <div className="flex flex-col p-[40px_60px_56px_16px] md:p-[2.5vw] relative h-full">
                  <p className="text-sm font-semibold text-el-white mb-4 md:mb-7">Next Event</p>
                  <h2 className="text-2xl md:3xl max-w-28 leading-6">MWC Barcelona 2025</h2>
                  <div className="mt-auto">
                    <p className="text-el-white text-xs max-w-48 mb-6">MWC 2025 promises to be an unmissable event—where innovation, big ideas, and global change converge. It’s the only platform where you’ll hear from industry leaders, emerging voices, and visionary tech pioneers shaping the future of connectivity</p>
                    <Link href="#" className="px-3.5 py-2.5 rounded-3xl text-xs font-bold text-el-primary-dark bg-el-white border border-transparent transition-all duration-1000 hover:text-el-white hover:bg-el-primary-dark hover:border-el-white">Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[450px] md:max-w-screen mx-auto h-[55vh] md:h-[40vw]">
              <div className="h-full w-full rounded-2xl border border-transparent transition-colors hover:border-el-primary-dark duration-1000 bg-el-dark-black relative group overflow-hidden">
                <div className="flex flex-col p-[40px_60px_56px_16px] md:p-[5vw_3.5vw] h-full bg-el-primary-dark group-hover:opacity-90 transition-opacity duration-1000">
                  <p className="text-sm font-semibold text-el-white mb-4 md:mb-7 uppercase">White Papers</p>
                  <div className="mt-auto">
                    <h2 className="text-2xl max-w-56 md:max-w-[73%] font-semibold lg:font-medium md:text-3xl lg:text-4xl mb-5 md:mb-8">Optimizing eSIM Adoption: Adoption Interoperability</h2>
                    <Link href="#" className="px-3.5 py-2.5 rounded-3xl text-xs font-bold text-el-primary-dark bg-el-white border border-transparent transition-all duration-1000 hover:text-el-white hover:bg-el-primary-dark hover:border-el-white">Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[450px] md:max-w-screen mx-auto h-[55vh] md:h-[40vw]">
              <div className="h-full w-full rounded-2xl border border-transparent transition-colors hover:border-el-primary-dark duration-1000 bg-el-dark-black relative group overflow-hidden">
                <div className="flex flex-col p-[40px_60px_56px_16px] md:p-[5vw_3.5vw] h-full bg-el-secondary group-hover:opacity-90 transition-opacity duration-1000">
                  <p className="text-sm font-semibold text-el-white mb-4 md:mb-7 uppercase">PRS</p>
                  <div className="mt-auto">
                    <h2 className="text-2xl max-w-56 md:max-w-[73%] font-semibold lg:font-medium md:text-3xl lg:text-4xl mb-5 md:mb-8">CATEL Selects Valid’s Quarter-Size SIM Cards solution: A Step Towards Innovation and Sustainability</h2>
                    <Link href="#" className="px-3.5 py-2.5 rounded-3xl text-xs font-bold text-el-primary-dark bg-el-white border border-transparent transition-all duration-1000 hover:text-el-white hover:bg-el-primary-dark hover:border-el-white">Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollSection />
      <Footer showDialogue={()=>{
        setResponse({
          title: "Thank You",
          message: "You have successfully subscribed to our newsletter, you can opt out at any time from your inbox"
        });
        setRespond(true);
      }}/>

      {response.title && (
        <Modal 
          isOpen={respond} 
          onClose={() => setRespond(false)}
          title={response.title}
          message={response.message}
          buttonText="Got it"
        />
      )}
    </div>
  );
}
