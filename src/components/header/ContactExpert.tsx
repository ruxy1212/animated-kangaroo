
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

type ContactExpertProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactExpert: React.FC<ContactExpertProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formColumnRef = useRef<HTMLDivElement>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  
  useGSAP(() => {
    if (modalRef.current && contentRef.current && formColumnRef.current) {
      if (isOpen && !isAnimatingOut) {
        gsap.set(contentRef.current, { x: '100%' });
        gsap.set(formColumnRef.current, { x: '50%', opacity: 0 });
        
        const tl = gsap.timeline();
        
        tl.to('.modal-mask', { 
          opacity: 0.8, 
          duration: 0.4,
          ease: 'power2.out' 
        });
        
        tl.to(contentRef.current, {
          x: '0%',
          duration: 0.6,
          ease: 'power2.out'
        }, 0);
        
        tl.to(formColumnRef.current, {
          x: '0%',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        }, 0.2);
      }
      
      if (!isOpen && isAnimatingOut) {
        const tl = gsap.timeline({
          onComplete: () => setIsAnimatingOut(false)
        });
        
        tl.to(formColumnRef.current, {
          x: '50%',
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        });
        
        tl.to(contentRef.current, {
          x: '100%',
          duration: 0.6,
          ease: 'power2.in'
        }, 0.1);
        
        tl.to('.modal-mask', { 
          opacity: 0, 
          duration: 0.4,
          ease: 'power2.in' 
        }, 0.2);
      }
    }
  }, [isOpen, isAnimatingOut]);
  
  const handleClose = () => {
    setIsAnimatingOut(true);
    onClose();
  };
  
  useEffect(() => {
    if (isAnimatingOut && !isOpen) {
    } else if (isAnimatingOut && isOpen) {
      setIsAnimatingOut(false);
    }
  }, [isAnimatingOut, isOpen]);
  if (!isOpen && !isAnimatingOut) return null;

  return (
    <div id="modal-contact" ref={modalRef} className="fixed inset-0 z-105 overflow-hidden">
      <div className="modal-mask absolute inset-0 bg-black opacity-0" onClick={handleClose}></div>
      <div 
        ref={contentRef} 
        className="absolute top-0 right-0 h-full transform translate-x-full md:w-4/5 w-[95vw]"
      >
        <div className="flex flex-col md:flex-row-reverse h-full overflow-auto md:overflow-hidden">  
          <div 
            ref={formColumnRef} 
            className="relative md:w-[43.75vw] w-full no-scrollbar bg-white md:overflow-y-auto"
          >
            <div className="px-5 py-8 md:p-[5vw_3.75vw]">
              <div className="py-10 md:hidden">
                <button 
                  onClick={onClose}
                  className="w-10 h-10 mx-auto flex border border-black items-center justify-center rounded-full focus:outline-none"
                >
                  <svg width="16" height="15" className="invert" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.20828 0.355202C1.85326 0.000179744 1.27765 0.000179723 0.92263 0.355202C0.567608 0.710224 0.567608 1.28583 0.92263 1.64085L6.70805 7.42627L0.92263 13.2117C0.567608 13.5667 0.567608 14.1423 0.92263 14.4973C1.27765 14.8524 1.85326 14.8524 2.20828 14.4973L7.9937 8.71192L13.7791 14.4973C14.1341 14.8524 14.7097 14.8524 15.0648 14.4973C15.4198 14.1423 15.4198 13.5667 15.0648 13.2117L9.27935 7.42627L15.0648 1.64085C15.4198 1.28583 15.4198 0.710225 15.0648 0.355203C14.7097 0.000181071 14.1341 0.000180397 13.7791 0.355203L7.9937 6.14062L2.20828 0.355202Z" fill="#FBFAFE"></path>
                  </svg>
                </button>
              </div>
              <h3 className="text-xl md:text-2xl font-normal md:font-semibold mb-8 font-grotesk text-el-dark-black text-center md:text-left">Talk to our experts</h3>
              
              <form className="space-y-4 text-xs text-el-dark-black">
                <div>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Work Email Address*" 
                    className="w-full p-3 md:p-4 border border-gray-300 font-inter rounded-lg"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name*" 
                    className="w-full p-3 md:p-4 border border-gray-300 font-inter rounded-lg"
                    required
                  />
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last name*" 
                    className="w-full p-3 md:p-4 border border-gray-300 font-inter rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <input 
                    type="text" 
                    name="company" 
                    placeholder="Company*" 
                    className="w-full p-3 md:p-4 border border-gray-300 font-inter rounded-lg"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <select 
                    name="region" 
                    className="w-full p-3 md:p-4 border border-gray-300 font-inter rounded-lg"
                    required
                  >
                    <option value="">Region*</option>
                    <option value="China">China</option>
                    <option value="North America">North America</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Middle East">Middle East</option>
                    <option value="LATAM">LATAM</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Europe">Europe</option>
                  </select>
                  
                  <select 
                    name="businessType" 
                    className="w-full p-3 md:p-4 border border-gray-300 font-inter rounded-lg"
                    required
                  >
                    <option value="">Business type*</option>
                    <option value="Industry Analyst">Industry Analyst</option>
                    <option value="OEM">OEM</option>
                    <option value="IoT Customer">IoT Customer</option>
                    <option value="Others">Others</option>
                    <option value="MNO">MNO</option>
                    <option value="MVNO">MVNO</option>
                    <option value="MVNE">MVNE</option>
                    <option value="ODM">ODM</option>
                    <option value="Enterprise Customer">Enterprise Customer</option>
                  </select>
                </div>
                
                <div>
                  <textarea 
                    name="message" 
                    placeholder="Message" 
                    rows={3}
                    className="w-full p-3 md:p-4 border border-gray-300 font-inter rounded-lg"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-center ms-4">
                  <input 
                    type="checkbox" 
                    name="optin" 
                    id="optin"
                    className="mr-2"
                    required
                  />
                  <label htmlFor="optin" className="text-xs">
                    I agree to receive communications from Valid.*
                  </label>
                </div>
                
                <div className="flex mt-6 gap-2 md:gap-3">
                  <div className="grow hidden rounded bg-red-200/30 text-red-400 p-1.5 text-xs">ghyt</div>
                  <button 
                    type="submit" 
                    className="min-w-[30%] px-8 py-3 bg-el-primary-dark text-white rounded-3xl"
                  >
                    Send
                  </button>
                </div>
              </form>
              <div className="mt-12 text-[10px] text-gray-600 leading-3.5">
                <p>
                  We inform you that the data you provide will be included in files owned by Valid Soluciones 
                  Tecnológicas, S.A.U. (&quot;Valid&quot;) for the purpose of sending you our publications and other 
                  information. The legal basis for this data processing is your explicit consent to receive 
                  such information by completing and submitting this form. Your data will be retained until 
                  you unsubscribe from this service using the methods indicated below.
                </p>
                <p className="mt-4">
                  At any time, you may unsubscribe from this free service by clicking the link provided at 
                  the bottom of each information email. Additionally, you can exercise your rights to access, 
                  rectify, delete, object, restrict processing, and request data portability, where applicable 
                  under the relevant regulations, by contacting Valid at&nbsp;
                  <a href="mailto:trustedconnectivity@valid.com" className="text-el-primary">
                    trustedconnectivity@valid.com
                  </a>.
                </p>
              </div>
            </div>
          </div>

          <div className="relative md:w-[36.25vw] w-full md:h-full px-5 py-8 md:p-[5vw_3.75vw] bg-[#f7f5ff]">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[rgba(25,31,128,0.2)] to-[rgba(26,20,250,0.2)] text-transparent bg-clip-text font-grotesk">
              Our locations
            </div>
            
            <div className="flex gap-3 mt-12">
              <svg className="w-3.5 h-4" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3833_40245)">
                  <path opacity="0.5" d="M1.66406 14.9057C1.66406 7.40996 7.6336 1.3335 14.9974 1.3335C22.3612 1.3335 28.3307 7.40996 28.3307 14.9057C28.3307 22.3426 24.0752 31.0208 17.4356 34.1242C15.8878 34.8477 14.107 34.8477 12.5592 34.1242C5.9196 31.0208 1.66406 22.3426 1.66406 14.9057Z" stroke="#131BFF" strokeWidth="2.5"></path>
                  <circle cx="15" cy="14.6665" r="5" stroke="#131BFF" strokeWidth="2.5"></circle>
                </g>
                <defs>
                  <clipPath id="clip0_3833_40245">
                    <rect width="30" height="36" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
              <div>
                <div className="text-lg text-el-dark-black font-medium leading-5">Spain</div>
                <div>
                  <p className="text-sm mt-1 text-el-dark-black leading-3.5 font-light">
                    Avenida de Manoteras, 20<br />
                    Edificio Tokyo – Planta Baja<br />
                    28050<br />
                    Madrid, Spain
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-12">
              <svg className="w-3.5 h-4" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3833_40245)">
                  <path opacity="0.5" d="M1.66406 14.9057C1.66406 7.40996 7.6336 1.3335 14.9974 1.3335C22.3612 1.3335 28.3307 7.40996 28.3307 14.9057C28.3307 22.3426 24.0752 31.0208 17.4356 34.1242C15.8878 34.8477 14.107 34.8477 12.5592 34.1242C5.9196 31.0208 1.66406 22.3426 1.66406 14.9057Z" stroke="#131BFF" strokeWidth="2.5"></path>
                  <circle cx="15" cy="14.6665" r="5" stroke="#131BFF" strokeWidth="2.5"></circle>
                </g>
                <defs>
                  <clipPath id="clip0_3833_40245">
                    <rect width="30" height="36" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
              <div>
                <div className="text-lg text-el-dark-black font-medium leading-5">Singapore</div>
                <div>
                  <p className="text-sm mt-1 text-el-dark-black leading-3.5 font-light">
                    67 Ubi Avenue 1,<br />
                    Starhub Green #06-01<br />
                    Singapore 408942
                  </p>
                </div>
              </div>
            </div>
            
            <Link href="#" className="flex items-center mt-12 text-el-primary-dark pb-10 md:pb-0">
              <span className="border-b border-el-primary-dark mr-2 text-xs">Present in more than 15 countries</span>
              <svg width="20" height="20" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.93846 18L17.2308 4.70769V16.6154H20V0H3.38461V2.76923H15.2923L2 16.0615L3.93846 18Z" fill="#131BFF"></path>
              </svg>
            </Link>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute hidden md:flex border border-el-white top-14 -left-10 w-8 h-8 items-center justify-center bg-black bg-opacity-20 rounded-full focus:outline-none"
        >
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.20828 0.355202C1.85326 0.000179744 1.27765 0.000179723 0.92263 0.355202C0.567608 0.710224 0.567608 1.28583 0.92263 1.64085L6.70805 7.42627L0.92263 13.2117C0.567608 13.5667 0.567608 14.1423 0.92263 14.4973C1.27765 14.8524 1.85326 14.8524 2.20828 14.4973L7.9937 8.71192L13.7791 14.4973C14.1341 14.8524 14.7097 14.8524 15.0648 14.4973C15.4198 14.1423 15.4198 13.5667 15.0648 13.2117L9.27935 7.42627L15.0648 1.64085C15.4198 1.28583 15.4198 0.710225 15.0648 0.355203C14.7097 0.000181071 14.1341 0.000180397 13.7791 0.355203L7.9937 6.14062L2.20828 0.355202Z" fill="#FBFAFE"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactExpert;