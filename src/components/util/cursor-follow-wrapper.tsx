"use client";

import React, { useEffect, useState } from "react";
import CursorFollow from "@/components/util/cursor-follow";

const CursorFollowWrapper = () => {
  const [size, setSize] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth < 768 ? 4 : 14);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (size === null) return null;

  return <CursorFollow size={size} />;
};

export default CursorFollowWrapper;