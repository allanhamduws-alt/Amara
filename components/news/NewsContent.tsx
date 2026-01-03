"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { useEffect, useState } from "react";

interface NewsPost {
  id: string;
  slug: string;
  titleDe: string;
  titleEn: string;
  contentDe: string;
  contentEn: string;
  publishedAt: string;
}

export default function NewsContent() {
  const t = useTranslations("news");
  const locale = useLocale();
  const dateLocale = locale === "de" ? de : enUS;
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        if (response.ok) {
          const data = await response.json();
          setNews(data.posts);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-white/80">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Newspaper className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Lade Neuigkeiten...</p>
            </div>
          ) : news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={{ pathname: "/aktuelles/[slug]", params: { slug: post.slug } }} className="block h-full">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                      <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                      <CardHeader>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(post.publishedAt), "d. MMMM yyyy", { locale: dateLocale })}
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {locale === "de" ? post.titleDe : post.titleEn}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                          {locale === "de" ? post.contentDe : post.contentEn}
                        </CardDescription>
                        <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-3 transition-all">
                          {t("readMore")}
                          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Newspaper className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">{t("noNews")}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
              Haben Sie Fragen?
            </h2>
            <p className="text-muted-foreground mb-8">
              Kontaktieren Sie uns gerne oder vereinbaren Sie direkt einen Termin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/termin">
                  Termin vereinbaren
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/kontakt">
                  Kontakt aufnehmen
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
