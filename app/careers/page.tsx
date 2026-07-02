import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Dantata Town Developers and build Nigeria's future. Explore career opportunities in engineering, project management, sales, and more.",
};

export default function CareersPage() {
  return (
    <>
      <Hero
        title="Build your career while building communities."
        eyebrow="Careers"
        subtitle="Join a team of engineers, architects, and builders shaping Nigeria's urban landscape — one estate at a time."
        image="/hero1.png"
        compact
      />
      <CareersClient />
    </>
  );
}
