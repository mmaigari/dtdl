"use client";

import MagneticButton from "@/components/motion/MagneticButton";
import { useExpressInterest } from "@/components/ExpressInterestProvider";

type Props = {
  label?: string;
  variant?: "primary" | "outline" | "ghost" | "ghost-on-dark";
  project?: string;
  className?: string;
};

export default function ExpressInterestButton({
  label = "Express Interest",
  variant = "primary",
  project,
  className,
}: Props) {
  const { openInterest } = useExpressInterest();
  return (
    <MagneticButton
      variant={variant}
      onClick={() => openInterest(project)}
      className={className}
      ariaLabel={label}
    >
      {label}
    </MagneticButton>
  );
}
