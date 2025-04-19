import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import Sidebar from "./Sidebar";
import InnerMenu from "./InnerMenu";

export default function MobileMenu({contactExpert}: {contactExpert: () => void}) {
  const [showInnerMenu, setShowInnerMenu] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const handleHamburgerClick = () => {
    setOpenHamburger(!openHamburger);
  };

  const items = [
    { title: "View All", children: null},
    {
      title: 'SIMs',
      children: [
        {text: "SIMs", link: "#"},
      ],
    },
    {
      title: 'eSIMs',
      children: [
        {text: "eSIMs", link: "#"},
        {text: "eSIM Interoperability", link: "#"},
      ],
    },
    {
      title: 'eSIM Solutions',
      children: [
        {text: "Remote SIM Provision", link: "#"},
        {text: "eSIM Onboarding Journeys", link: "#"},
      ],
    },
    {
      title: '5G',
      children: [
        {text: "Private Networks", link: "#"},
        {text: "OTA Suite", link: "#"},
      ],
    },
    {
      title: 'Integrated SE',
      children: [
        {text: "iSE", link: "#"},
        {text: "iSIM", link: "#"},
      ],
    },
    {
      title: 'IoT Connectivity',
      children: [
        {text: "IoT Connectivity", link: "#"},
      ],
    },
  ]

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