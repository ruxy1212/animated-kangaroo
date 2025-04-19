import { cn } from "@/lib/utils/cn";

export default function CloseButton({handleClose, className, invert, variant="normal"}: 
  { 
    handleClose: () => void; 
    className: string; 
    invert: boolean;
    variant?: string;
  }
){
  if(variant === "submenu"){
    return (
      <button
        onClick={handleClose}
        className={className}
      >
        <svg className="w-4 rotate-180" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.641418 13.3707L19.4396 13.3707L11.0196 21.7907L12.9777 23.7489L24.7266 12L12.9777 0.25115L11.0196 2.20929L19.4396 10.6293L0.641418 10.6293L0.641418 13.3707Z" fill="currentColor"></path>
        </svg>
      </button>
    )
  } else {
    return (
      <button 
        onClick={handleClose}
        className={className}
      >
        <svg width="16" height="15" className={cn(invert?"invert":"")} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.20828 0.355202C1.85326 0.000179744 1.27765 0.000179723 0.92263 0.355202C0.567608 0.710224 0.567608 1.28583 0.92263 1.64085L6.70805 7.42627L0.92263 13.2117C0.567608 13.5667 0.567608 14.1423 0.92263 14.4973C1.27765 14.8524 1.85326 14.8524 2.20828 14.4973L7.9937 8.71192L13.7791 14.4973C14.1341 14.8524 14.7097 14.8524 15.0648 14.4973C15.4198 14.1423 15.4198 13.5667 15.0648 13.2117L9.27935 7.42627L15.0648 1.64085C15.4198 1.28583 15.4198 0.710225 15.0648 0.355203C14.7097 0.000181071 14.1341 0.000180397 13.7791 0.355203L7.9937 6.14062L2.20828 0.355202Z" fill="#FBFAFE"></path>
        </svg>
      </button>
    )
  }
  
}