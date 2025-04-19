import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import Sidebar from "./Sidebar";
import InnerMenu from "./InnerMenu";
import { solutions } from "@/lib/data/solutions";

export default function MobileMenu({contactExpert}: {contactExpert: () => void}) {
  const [showInnerMenu, setShowInnerMenu] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const handleHamburgerClick = () => {
    setOpenHamburger(!openHamburger);
  };

  const items = [
    { title: "View All", children: null},
    ...solutions,
  ];

  useEffect(() => {
    if (openHamburger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  
    return () => {
      // Clean up just in case the component unmounts
      document.body.style.overflow = '';
    };
  }, [openHamburger]);

  return (
    <>
      <Hamburger isOpen={openHamburger} setIsOpen={handleHamburgerClick}/>
      <Sidebar onInner={()=>setShowInnerMenu(true)} contactExpert={contactExpert} isOpen={openHamburger} />
      <InnerMenu isOpen={showInnerMenu && openHamburger} items={items} onClose={()=>setShowInnerMenu(false)} />
    </>
  )
}