import Link from "next/link";

export default function BlankInsights({tag, text, link}: {tag: string; text: string; link: string;}){
  return (
    <div className="h-full w-full rounded-2xl border border-transparent transition-colors hover:border-el-primary-dark duration-1000 bg-el-dark-black relative group overflow-hidden">
      <div className="flex flex-col p-[40px_60px_56px_16px] md:p-[5vw_3.5vw] h-full bg-el-primary-dark group-hover:opacity-90 transition-opacity duration-1000">
        <p className="text-sm font-semibold text-el-white mb-4 md:mb-7 uppercase">{tag}</p>
        <div className="mt-auto">
          <h2 className="text-2xl max-w-56 md:max-w-[85%] lg:max-w-[77%] xl:max-w-[69%] font-semibold lg:font-medium lg:text-3xl xl:text-4xl mb-5 md:mb-8">{text}</h2>
          <Link href={link} className="px-3.5 py-2.5 rounded-3xl text-xs font-bold text-el-primary-dark bg-el-white border border-transparent transition-all duration-1000 hover:text-el-white hover:bg-el-primary-dark hover:border-el-white">Learn More</Link>
        </div>
      </div>
    </div>
  )
}