"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps children in a scroll-triggered reveal animation.
 * `variant` chooses the entrance direction: "up" | "left" | "right".
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const base =
    variant === "left" ? "reveal-left" : variant === "right" ? "reveal-right" : "reveal";

  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? "visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
