import Link from "next/link";
import Location from "./Location";

export default function Locations(){
  return (
    <div className="relative md:w-[36.25vw] w-full md:h-full px-5 py-8 md:p-[5vw_3.75vw] bg-[#f7f5ff]">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[rgba(25,31,128,0.2)] to-[rgba(26,20,250,0.2)] text-transparent bg-clip-text font-grotesk">
        Our locations
      </div>
      <Location country="Spain">
        <p className="text-sm mt-1 text-el-dark-black leading-3.5 font-light">
          Avenida de Manoteras, 20<br />
          Edificio Tokyo – Planta Baja<br />
          28050<br />
          Madrid, Spain
        </p>
      </Location>
      <Location country="Singapore">
        <p className="text-sm mt-1 text-el-dark-black leading-3.5 font-light">
          67 Ubi Avenue 1,<br />
          Starhub Green #06-01<br />
          Singapore 408942
        </p>
      </Location>
      <Link href="/about#countries" className="flex items-center mt-12 text-el-primary-dark pb-10 md:pb-0">
        <span className="border-b border-el-primary-dark mr-2 text-xs">Present in more than 15 countries</span>
        <svg width="20" height="20" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.93846 18L17.2308 4.70769V16.6154H20V0H3.38461V2.76923H15.2923L2 16.0615L3.93846 18Z" fill="#131BFF"></path>
        </svg>
      </Link>
    </div>
  )
}