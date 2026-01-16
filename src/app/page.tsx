'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import MobileMenu from "@/components/header/MobileMenu";
import ContactExpert from "@/components/header/ContactExpert";
import Modal from "@/components/modal/Modal";
import Hero from "@/components/hero/Hero";
import CarouselSection from "@/components/carousel/CarouselSection";
import InsightsSection from "@/components/partners/InsightsSection";
import ZoomScrollSections from "@/components/partners/ZoomScrollSections";
// import AboutItem from '@/components/partners/_fragment/AboutItem';
// import Link from 'next/link';
// import ReadingText from '@/components/common/reading-text';

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
          start: 'top top', 
          end: 'bottom top', 
          markers: false, 
        },
      }
    );

  }, { scope: heroSection });

  useGSAP(() => {
    if (!solutionsSection.current) return;
    
    gsap.fromTo(
      '.solutions-text',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.solutions-text', 
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        },
      }
    );

    gsap.fromTo(
      '.arrow-container',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.arrow-container',
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        },
      }
    );

    gsap.fromTo(
      '.arrow-svg',
      { scaleX: 0, transformOrigin: '0 50%' },
      {
        scaleX: 1,
        duration: 4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.arrow-svg',
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        },
      }
    );

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
      <Hero heroSection={heroSection} contactExpert={contactExpert} />
      <CarouselSection solutionsSection={solutionsSection} words={words} />
      <InsightsSection insightsSection={insightsSection} words={evolveWords} />
      <ZoomScrollSections text="Your trusted partner for secure and interoperable mobile services" />
      
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
