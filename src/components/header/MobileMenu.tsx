import { useState } from "react";
import Hamburger from "./Hamburger";
import Sidebar from "./Sidebar";

export default function MobileMenu(){
  // const [openSidebar, setOpenSidebar] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const handleHamburgerClick = () => {
    setOpenHamburger(!openHamburger);
  };
  console.log("openHamburger", openHamburger);
  return (
    <>
      <Hamburger isOpen={openHamburger} setIsOpen={handleHamburgerClick}/>
      <Sidebar onInner={()=>setOpenHamburger(false)} isOpen={openHamburger} />
    </>
  )
}