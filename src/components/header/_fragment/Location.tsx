import { ReactNode } from "react";

type LocationProps = {
  country: string;
  children: ReactNode;
}
export default function Location({country, children}: LocationProps){
  return (
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
        <div className="text-lg text-el-dark-black font-medium leading-5">{country}</div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}