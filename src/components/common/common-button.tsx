import { ReactNode } from "react";

type CommonButtonProps = {
  disabled?: boolean | undefined;
  children?: ReactNode | undefined; 
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "normal" | "special" | undefined;
  text?: string | undefined;
  className?: string | undefined;
  onClick?: () => void | undefined;
}
export default function CommonButton({disabled, children, type="button", variant="special", text, className, onClick}: CommonButtonProps){
  if(variant === "special"){
    return (
      <button
        type={type}
        disabled={disabled}
        className="min-w-[30%] px-8 py-3 bg-el-primary-dark text-white rounded-3xl flex items-center justify-center disabled:cursor-not-allowed cursor-pointer"
      >
        {children}
      </button>
    )
  }else{
    return (
      <button onClick={onClick} className={className}>{text}</button>
    )
  }
 
}