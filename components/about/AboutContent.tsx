"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Heart, Stethoscope, Lightbulb, Calendar, MapPin, Clock, Users, Target, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutContent() {
  const t = useTranslations("about");

  const values = [
    { key: "trust", icon: Heart },
    { key: "competence", icon: Award },
    { key: "care", icon: Stethoscope },
    { key: "modern", icon: Lightbulb },
  ];

  const timeline = [
    {
      year: "2023",
      title: "Praxisübernahme",
      description: "Übernahme der Praxisräume am Eidelstedter Platz durch Dr. Jwan Amara",
      icon: Sparkles,
    },
    {
      year: "2023",
      title: "Modernisierung",
      description: "Investition in moderne Ultraschallgeräte und Diagnostik-Ausstattung",
      icon: Lightbulb,
    },
    {
      year: "2024",
      title: "Teamwachstum",
      description: "Erweiterung des Teams um Frau Khakan Amara als Ärztin für Allgemeinmedizin",
      icon: Users,
    },
    {
      year: "Heute",
      title: "Ihre Praxis",
      description: "Umfassende internistische Hausarztpraxis mit persönlicher Betreuung",
      icon: Heart,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="container mx-auto px-4 relative">
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

      {/* Motto Section with Animation */}
      <section className="py-24 bg-gradient-to-b from-accent via-white to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-2xl" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-primary font-medium text-sm uppercase tracking-wider"
            >
              {t("motto.title")}
            </motion.span>
            <motion.blockquote 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight"
            >
              "{t("motto.text")}"
            </motion.blockquote>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section - Full Width */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-6">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-primary text-sm font-medium">Unsere Philosophie</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                {t("philosophy.title")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t("philosophy.text")}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Persönliche Betreuung</p>
                    <p className="text-sm text-muted-foreground">Wir nehmen uns Zeit für Sie und Ihre Anliegen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Stethoscope className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Fachärztliche Kompetenz</p>
                    <p className="text-sm text-muted-foreground">Internistische Diagnostik auf höchstem Niveau</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Ganzheitlicher Ansatz</p>
                    <p className="text-sm text-muted-foreground">Medizinische und menschliche Betreuung aus einer Hand</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about/praxis-2.jpg"
                  alt="Patientenbetreuung in unserer Praxis"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6"
              >
                <p className="text-4xl font-serif text-primary mb-1">15+</p>
                <p className="text-muted-foreground text-sm">Jahre Erfahrung</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline / History Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 via-white to-accent/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-6">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-primary text-sm font-medium">Unsere Geschichte</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Der Weg zu Ihrer Praxis
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("history.text")}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30 md:-translate-x-1/2" />

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg md:-translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-2xl font-serif text-primary">{item.year}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Section with Real Photos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-2xl overflow-hidden aspect-[4/5] bg-muted shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <img
                      src="/images/about/praxis-1.jpg"
                      alt="Unsere Praxis"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 text-white"
                  >
                    <p className="text-4xl font-serif mb-2">2023</p>
                    <p className="text-white/80 text-sm">Praxisübernahme am Eidelstedter Platz</p>
                  </motion.div>
                </div>
                <div className="space-y-4 pt-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="rounded-2xl overflow-hidden aspect-square bg-muted shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <img
                      src="/images/about/praxis-2.jpg"
                      alt="Patientenbetreuung"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center"
                  >
                    <div className="text-center p-6">
                      <p className="text-5xl font-serif text-primary mb-2">13+</p>
                      <p className="text-muted-foreground text-sm">Leistungen</p>
                  </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-6">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-primary text-sm font-medium">Unsere Praxis</span>
                </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                    {t("practice.title")}
                  </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {t("practice.text")}
                  </p>
              <div className="bg-accent/50 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">Unsere Ausstattung</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Moderne Ultraschallgeräte
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    EKG & Langzeit-EKG
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Spirometrie
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Hauseigenes Labor
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="group">
                <Link href="/leistungen">
                  Unsere Leistungen entdecken
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-white via-muted/30 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              {t("values.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diese Werte leiten uns täglich in unserer Arbeit und im Umgang mit unseren Patienten.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 bg-white shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">
                      {t(`values.items.${value.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {t(`values.items.${value.key}.text`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-primary text-sm font-medium">Standort</span>
              </div>
              <h2 className="text-3xl font-serif text-foreground mb-4">
                Zentral in Hamburg-Eidelstedt
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Unsere Praxis befindet sich zentral am Eidelstedter Platz und ist hervorragend mit öffentlichen Verkehrsmitteln erreichbar. Parkmöglichkeiten finden Sie in unmittelbarer Nähe.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Adresse</p>
                    <p className="text-muted-foreground">Eidelstedter Platz 6a, 22523 Hamburg</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/kontakt">
                  Anfahrt & Kontakt
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl overflow-hidden h-[400px] bg-muted shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.5!2d9.8855!3d53.6034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f5b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sEidelstedter%20Platz%206a%2C%2022523%20Hamburg!5e0!3m2!1sde!2sde!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl font-serif text-white mb-4">
              Werden Sie Teil unserer Praxisfamilie
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Wir nehmen neue Patienten auf und freuen uns darauf, Sie kennenzulernen.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 group">
              <Link href="/termin">
                <Calendar className="mr-2 h-5 w-5" />
                Termin vereinbaren
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
