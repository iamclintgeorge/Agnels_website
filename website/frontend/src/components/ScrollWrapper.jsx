import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const ScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true, 
      inertia: 0.8, 
    });

    
    setTimeout(() => {
      scroll.update();
    }, 500);

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} id="main" data-scroll-container>
      {children}
    </div>
  );
};

export default ScrollWrapper;
