import Image from "next/image";

export default function NextEvent({title, description, link, src}: {title: string; description: string, link: string; src: string;}){
  return (
    <div className="h-full w-full rounded-2xl border border-transparent transition-colors hover:border-el-primary-dark duration-1000 bg-el-dark-black relative group overflow-hidden">
      <div className="absolute w-full h-full top-0 left-0">
        <Image src={src} alt="Coming events" height={0} width={0} className="h-full w-full object-cover duration-1000 transition-transform group-hover:scale-105" unoptimized= {true}/>
      </div>
      <div className="absolute w-full h-full top-0 left-0 bg-el-dark-black/30"></div>
      <div className="flex flex-col p-[40px_60px_56px_16px] md:p-[2.5vw] relative h-full">
        <p className="text-sm font-semibold text-el-white mb-4 md:mb-7">Next Event</p>
        <h2 className="text-2xl md:text-3xl max-w-28 leading-6">{title}</h2>
        <div className="mt-auto">
          <p className="text-el-white text-lg xl:text-xl 2xl:text-2xl max-w-4/5 mb-6">{description}</p>
          <a href={link} className="px-3.5 py-2.5 rounded-3xl text-xs font-bold text-el-primary-dark bg-el-white border border-transparent transition-all duration-1000 hover:text-el-white hover:bg-el-primary-dark hover:border-el-white">Learn More</a>
        </div>
      </div>
    </div>
  )
}