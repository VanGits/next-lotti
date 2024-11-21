'use client'
import React, { useEffect, useRef } from "react";

const CircularText = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const str = "LOTTI - MUSIC - ROGUE COMING! - ";

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.innerHTML = ""; 

      for (let i = 0; i < str.length; i++) {
        const span = document.createElement("span");
        span.innerHTML = str[i];
        container.appendChild(span);
        span.style.transform = `rotate(${11 * i}deg)`;
    }
    }
  }, [str]);

  return <div id="logo" ref={containerRef} className="circular-text"></div>;
}

export default CircularText;
