import type { Metadata } from "next";
import MaintenanceScreen from "@/components/MaintenanceScreen";

export const metadata: Metadata = {
  title: "Something extraordinary is coming — Dantata Town Developers",
  description:
    "Dantata Town Developers is preparing the next chapter of master-planned living across Nigeria. Sign up to be among the first to see it.",
};

export default function HomePage() {
  return <MaintenanceScreen />;
}
