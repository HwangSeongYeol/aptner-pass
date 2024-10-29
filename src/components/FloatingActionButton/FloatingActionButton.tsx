"use client";

import { forwardRef, useEffect, useState } from "react";
import ArrowUp from "@assets/ArrowUp.svg";

const FloatingActionButton = forwardRef<HTMLButtonElement>(() => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        className="
        fixed bottom-8 right-8 
        bg-blue-600 hover:bg-blue-700
        text-white
        w-12 h-12
        rounded-full
        flex items-center justify-center
        shadow-lg transition duration-300
      "
        aria-label="Floating Action Button"
        onClick={handleClick}
      >
        <ArrowUp />
      </button>
    )
  );
});

FloatingActionButton.displayName = "FloatingActionButton";

export default FloatingActionButton;
