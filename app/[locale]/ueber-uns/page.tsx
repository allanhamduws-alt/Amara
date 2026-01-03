import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import AboutContent from "@/components/about/AboutContent";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

