import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import TeamPreview from "@/components/home/TeamPreview";
import OpeningHours from "@/components/home/OpeningHours";
import CTASection from "@/components/home/CTASection";
import AboutPreview from "@/components/home/AboutPreview";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <TeamPreview />
      <OpeningHours />
      <CTASection />
    </>
  );
}

