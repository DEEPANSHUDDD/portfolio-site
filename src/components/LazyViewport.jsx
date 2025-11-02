import React, { useEffect, useRef, useState } from "react";

/**
 * Renders children only after the wrapper becomes visible in the viewport.
 */
const LazyViewport = ({
  children,
  minHeight = 200,
  rootMargin = "200px 0px",
  threshold = 0.1,
  as = "div",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const Wrapper = as;
  return (
    <Wrapper
      ref={containerRef}
      className={className}
      style={!isVisible ? { minHeight } : undefined}
    >
      {isVisible ? children : null}
    </Wrapper>
  );
};

export default LazyViewport;
