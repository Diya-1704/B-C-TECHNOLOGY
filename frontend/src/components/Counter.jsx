import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function Counter({ end, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const endNum = parseInt(end);
    const totalFrames = 60 * duration; // 60fps
    const increment = endNum / totalFrames;
    
    let currentFrame = 0;
    const timer = setInterval(() => {
      currentFrame++;
      start += increment;
      
      if (currentFrame >= totalFrames) {
        setCount(endNum);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
