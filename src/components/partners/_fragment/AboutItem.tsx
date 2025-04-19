import { cn } from "@/lib/utils/cn";

export default function AboutItem({top = "", title, description}: {top?: string; title: string; description: string;}){
  return (
    <div className={cn("flex items-center flex-col gap-4 md:gap-6", top)}>
      <h1 className="text-el-white font-semibold text-6xl md:text-7xl lg:text-8xl font-grotesk">{title}</h1>
      <p className="text-2xl md:text-3xl font-editorial text-center">{description}</p>
    </div>
  )
}