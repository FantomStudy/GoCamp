import React, { useState, useEffect, useRef } from "react";

const AnimatedCounter = ({ end, duration = 3000 }) => {
  const [count, setCount] = useState(0);
  const targetRef = useRef(null);

  useEffect(() => {
    const animation = () => {
      const startTime = performance.now();
      const diff = end - 0;

      const frame = (timestamp) => {
        const progress = Math.min(1, (timestamp - startTime) / duration);
        const easedProgress = 1 - Math.pow(1 - progress, 2); 

        if (easedProgress < 1) {
          setCount(Math.round(0 + diff * easedProgress));
          requestAnimationFrame(frame);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(frame);
    };

    animation();
  }, [end, duration]);

  return <span ref={targetRef} style={{color:'var(--primary)'}}>{count}</span>;
};

export default AnimatedCounter;