import { cn } from "@/lib/utils/cn";

type InputProps = {
  type: string;
  name: string;
  placeholder: string;
  error: boolean;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  variant?: string;
  id?: string;
  checked?: boolean | undefined;
}

export default function Input({type, name, value, placeholder, error, onChange, variant="text", id="", checked=false}: InputProps){
  if(variant==="textarea"){
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={onChange}
        className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", error ? "border-red-500" : "border-gray-300")}
      ></textarea>
    )
  }else {
    if(type==="checkbox"){
      return (
        <label htmlFor={id} className={cn("text-xs", error?'text-red-500':'text-el-dark-black')}>
          <input
            type={type}
            name={name}
            id={id}
            checked={checked}
            onChange={onChange}
            className="mr-2"
          />
          I agree to receive communications from Valid.*
        </label>
      )
    }
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", error ? "border-red-500" : "border-gray-300")}
      />
    )
  }
}