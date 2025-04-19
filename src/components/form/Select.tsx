import { cn } from "@/lib/utils/cn";

type SelectProps = {
  name: string;
  error: boolean;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  defaultVal: string;
  options: string[];
}

export default function Select({name, value, onChange, error, defaultVal, options}: SelectProps){
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={cn("w-full p-3 md:p-4 border font-inter rounded-lg outline-none", error ? "border-red-500" : "border-gray-300")}
    >
      <option value="">{defaultVal}*</option>
      {options && options.map((option,i)=>(
        <option key={i} value={option}>{option}</option>  
      ))}
    </select>
  )
}