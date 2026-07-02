"use client";

import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type ElementType,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "ghost-on-dark";
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
};

const VARIANTS: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary:
    "bg-maroon text-cream hover:bg-maroon-700 ring-1 ring-inset ring-maroon-700",
  outline:
    "border border-ink/20 text-ink hover:border-maroon hover:text-maroon bg-transparent",
  ghost: "text-ink hover:text-maroon bg-transparent",
  "ghost-on-dark":
    "text-cream border border-cream/50 hover:border-gold hover:text-gold bg-transparent backdrop-blur-sm",
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const x = (mx - rect.width / 2) * 0.3;
    const y = (my - rect.height / 2) * 0.3;
    setPos({ x, y });
    ref.current.style.setProperty("--mx", `${mx}px`);
    ref.current.style.setProperty("--my", `${my}px`);
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  const cls = `btn-luxe inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-medium tracking-wide transition-colors duration-300 ${VARIANTS[variant]} ${className}`;

  const Inner: ElementType = href ? Link : "button";
  const innerProps = href
    ? { href }
    : { type, onClick };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.4 }}
      className="inline-block"
    >
      <Inner aria-label={ariaLabel} className={cls} {...(innerProps as Record<string, unknown>)}>
        <motion.span
          animate={{ x: pos.x * 0.35, y: pos.y * 0.35 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="inline-flex items-center gap-2"
        >
          {children}
        </motion.span>
      </Inner>
    </motion.div>
  );
}
