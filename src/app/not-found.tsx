"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Particles404 from "@/components/error/Particles404";

const NotFoundPage = () => {
  const pathName = usePathname();
  return (
    <section className="grid h-screen w-full place-items-center bg-el-black">
      <div className="fixed left-0 top-0 min-h-[100dvh] w-screen" />
      <Particles404 path={pathName}/>
      <div className="pointer-events-none relative z-30 flex flex-col gap-y-6">
        <Image
          src="/img/found.gif"
          alt="404"
          width={480}
          height={204}
          unoptimized
          loading="eager"
          priority
        />
        <div className="flex w-full items-center justify-center gap-x-4 h-32" />
      </div>
      <div className="fixed bottom-[30vh] right-5">
        <Link href="/" className="gradient-border relative text-base md:text-lg px-0.5 py-2.5">
          <span className="py-2 px-6 md:px-8 bg-el-black">Go Back</span>
        </Link>
      </div>
      
    </section>
  );
};

export default NotFoundPage;
