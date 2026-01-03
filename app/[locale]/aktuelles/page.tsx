import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import NewsContent from "@/components/news/NewsContent";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewsContent />;
}

