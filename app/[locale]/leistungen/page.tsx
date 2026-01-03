import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import ServicesContent from "@/components/services/ServicesContent";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesContent />;
}

