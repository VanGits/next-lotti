"use client";
import { descs } from "@/lib/constants";
import React, { useEffect, useRef } from "react";

type Props = {};

const LottiInfo = (props: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.innerHTML = "";
      descs.forEach((desc) => {
        const p = document.createElement("p");
        p.textContent = desc;
        container.appendChild(p);
      });
    }
  }, []);
  return (
    <div className="lotti-info">
      {/* <h1 id="number">2.</h1> */}
      <h1>2. Lotti's Biography</h1>
      <img src="/assets/sample-pic.png" alt="pic1" />
      <div id="descriptions" ref={containerRef}></div>
    </div>
  );
};

export default LottiInfo;
