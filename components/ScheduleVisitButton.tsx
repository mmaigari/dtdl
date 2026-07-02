"use client";

import MagneticButton from "@/components/motion/MagneticButton";
import { useExpressInterest } from "@/components/ExpressInterestProvider";

type Props = {
  label?: string;
  variant?: "primary" | "outline" | "ghost" | "ghost-on-dark";
  project?: string;
  className?: string;
};

export default function ScheduleVisitButton({
  label = "Schedule a Visit",
  variant = "outline",
  project,
  className,
}: Props) {
  const { openVisit } = useExpressInterest();
  return (
    <MagneticButton
      variant={variant}
      onClick={() => openVisit(project)}
      className={className}
      ariaLabel={label}
    >
      {label}
    </MagneticButton>
  );
}
