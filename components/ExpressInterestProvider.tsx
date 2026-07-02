"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";

const ExpressInterestDialog = dynamic(
  () => import("@/components/ExpressInterestDialog"),
  { ssr: false }
);
const ScheduleVisitDialog = dynamic(
  () => import("@/components/ScheduleVisitDialog"),
  { ssr: false }
);

type Ctx = {
  openInterest: (defaultProject?: string) => void;
  openVisit: (defaultProject?: string) => void;
  closeAll: () => void;
};

const ExpressInterestContext = createContext<Ctx | null>(null);

export function useExpressInterest() {
  const ctx = useContext(ExpressInterestContext);
  if (!ctx) {
    throw new Error("useExpressInterest must be used inside <ExpressInterestProvider>");
  }
  return ctx;
}

export default function ExpressInterestProvider({ children }: { children: ReactNode }) {
  const [interestOpen, setInterestOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [defaultProject, setDefaultProject] = useState<string | undefined>();

  const openInterest = useCallback((project?: string) => {
    setDefaultProject(project);
    setVisitOpen(false);
    setInterestOpen(true);
  }, []);
  const openVisit = useCallback((project?: string) => {
    setDefaultProject(project);
    setInterestOpen(false);
    setVisitOpen(true);
  }, []);
  const closeAll = useCallback(() => {
    setInterestOpen(false);
    setVisitOpen(false);
  }, []);

  useEffect(() => {
    const anyOpen = interestOpen || visitOpen;
    if (!anyOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [interestOpen, visitOpen]);

  return (
    <ExpressInterestContext.Provider value={{ openInterest, openVisit, closeAll }}>
      {children}
      <ExpressInterestDialog
        open={interestOpen}
        onClose={() => setInterestOpen(false)}
        defaultProject={defaultProject}
      />
      <ScheduleVisitDialog
        open={visitOpen}
        onClose={() => setVisitOpen(false)}
        defaultProject={defaultProject}
      />
    </ExpressInterestContext.Provider>
  );
}
