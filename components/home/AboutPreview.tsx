"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Heart, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPreview() {
  const t = useTranslations("about");

  const values = [
    { icon: Heart, title: t("values.items.trust.title"), text: t("values.items.trust.text") },
    { icon: Award, title: t("values.items.competence.title"), text: t("values.items.competence.text") },
    { icon: Stethoscope, title: t("values.items.care.title"), text: t("values.items.care.text") },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-6">
              <span className="text-primary text-sm font-medium">{t("title")}</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              {t("motto.text")}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("philosophy.text")}
            </p>

            {/* Values */}
            <div className="space-y-4 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Button asChild variant="outline" className="group">
              <Link href="/ueber-uns">
                Mehr erfahren
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
                    alt="Ultraschall-Gerät"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-primary p-6 flex flex-col justify-end text-white">
                  <p className="text-3xl font-serif mb-2">Seit 2023</p>
                  <p className="text-white/80 text-sm">am Eidelstedter Platz</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-square bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2072&auto=format&fit=crop"
                    alt="Stethoskop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1931&auto=format&fit=crop"
                    alt="EKG-Gerät"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

