import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import TeamContent from "@/components/team/TeamContent";

interface TeamPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TeamPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TeamContent />;
}

