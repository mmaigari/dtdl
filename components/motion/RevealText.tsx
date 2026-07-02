"use client";

import { useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  staggerMs?: number;
  children?: ReactNode;
};

export default function RevealText({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  staggerMs = 70,
  children,
}: Props) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}{children}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="word-mask" aria-hidden="true">
          <span style={{ animationDelay: `${delay + i * staggerMs}ms` }}>
            {w}
          </span>
        </span>
      ))}
      {children}
    </Tag>
  );
}
