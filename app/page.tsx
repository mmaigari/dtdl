import type { Metadata } from "next";
import { cookies } from "next/headers";
import MaintenanceScreen from "@/components/MaintenanceScreen";
import RealHomePage from "@/app/page.home.bak";
import { MAINTENANCE_MODE, PREVIEW_COOKIE, PREVIEW_TOKEN } from "@/lib/config";

export const metadata: Metadata = {
  title: "Something extraordinary is coming — Dantata Town Developers",
  description:
    "Dantata Town Developers is preparing the next chapter of master-planned living across Nigeria. Sign up to be among the first to see it.",
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const previewActive =
    cookieStore.get(PREVIEW_COOKIE)?.value === PREVIEW_TOKEN;

  if (MAINTENANCE_MODE && !previewActive) {
    return <MaintenanceScreen />;
  }
  return <RealHomePage />;
}
