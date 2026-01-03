import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import BookingContent from "@/components/booking/BookingContent";

interface BookingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BookingPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appointment" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BookingContent />;
}

