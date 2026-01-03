"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Heart,
  Stethoscope,
  FlaskConical,
  Syringe,
  Scan,
  ClipboardCheck,
  ShieldCheck,
  FileHeart,
  Pill,
  Plane,
  UserCheck,
  Calendar,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const diagnosticsServices = [
  {
    key: "ecg",
    icon: Activity,
    details: [
      "Erkennung von Herzrhythmusstörungen",
      "Beurteilung der Herzfunktion",
      "Kontrolle bei Herzerkrankungen",
      "Schnelle Durchführung in der Praxis",
    ],
  },
  {
    key: "holter",
    icon: Heart,
    details: [
      "24-Stunden Aufzeichnung",
      "Vorhofflimmeranalyse",
      "Atemapnoe Pre-Analyse",
      "Erkennung intermittierender Arrhythmien",
      "Auswertung durch Facharzt",
    ],
  },
  {
    key: "bloodPressure",
    icon: Activity,
    details: [
      "24-Stunden Messung",
      "PWA-Messung (Pulswellenanalyse)",
      "Erkennung von Bluthochdruck",
      "Therapiekontrolle",
      "Tag-/Nacht-Profil",
    ],
  },
  {
    key: "spirometry",
    icon: Activity,
    details: [
      "Lungenfunktionsprüfung",
      "Asthma-Diagnostik",
      "COPD-Verlaufskontrolle",
      "Belastungstests",
    ],
  },
  {
    key: "ultrasound",
    icon: Scan,
    details: [
      "Abdomen (Bauchorgane)",
      "Schilddrüse",
      "Halsschlagader (Karotiden)",
      "Bauchschlagader (Aorta)",
      "Gefäßdiagnostik (Thrombose, pAVK)",
      "Thorax (Brustorgane)",
    ],
  },
  {
    key: "lab",
    icon: FlaskConical,
    details: [
      "Blutbild und Differentialblutbild",
      "Leber- und Nierenwerte",
      "Schilddrüsenwerte",
      "Blutzucker und HbA1c",
      "Cholesterin und Blutfette",
      "Tumormarker",
      "Urindiagnostik",
    ],
  },
  {
    key: "preOp",
    icon: ClipboardCheck,
    details: [
      "Anamnese und körperliche Untersuchung",
      "EKG",
      "Laboruntersuchungen",
      "Risikobeurteilung",
      "OP-Freigabe",
    ],
  },
];

const preventionServices = [
  {
    key: "checkup",
    icon: ShieldCheck,
    details: [
      "Gesundheits-Check-up 35+",
      "Herz-Kreislauf-Risiko-Check",
      "Hautkrebsscreening",
      "Diabetes-Vorsorge",
      "Umfassende Beratung",
    ],
  },
  {
    key: "cancer",
    icon: FileHeart,
    details: [
      "Männer-Krebsvorsorge",
      "Hautkrebs-Screening",
      "Darmkrebs-Früherkennung",
      "Prostata-Vorsorge",
      "Beratung und Aufklärung",
    ],
  },
  {
    key: "vaccination",
    icon: Syringe,
    details: [
      "Alle STIKO-empfohlenen Impfungen",
      "Grippeimpfung",
      "COVID-19-Impfung",
      "Reiseimpfungen",
      "Impfberatung",
      "Impfpassüberprüfung",
    ],
  },
  {
    key: "travel",
    icon: Plane,
    details: [
      "Reisemedizinische Beratung",
      "Reiseimpfungen",
      "Malaria-Prophylaxe",
      "Reiseapotheke-Beratung",
      "Gesundheitscheck vor Reisen",
    ],
  },
];

const careServices = [
  {
    key: "general",
    icon: Stethoscope,
    details: [
      "Akut- und Notfallversorgung",
      "Behandlung chronischer Erkrankungen",
      "Hausbesuche bei Bedarf",
      "Familienmedizin",
      "Arbeitsunfähigkeitsbescheinigungen",
    ],
  },
  {
    key: "dmp",
    icon: UserCheck,
    details: [
      "Diabetes mellitus Typ 1 und 2",
      "Koronare Herzkrankheit (KHK)",
      "Asthma bronchiale",
      "COPD",
      "Regelmäßige Kontrolluntersuchungen",
      "Strukturierte Behandlungsprogramme",
    ],
  },
  {
    key: "chronic",
    icon: Heart,
    details: [
      "Langzeitbetreuung chronischer Erkrankungen",
      "Regelmäßige Kontrolluntersuchungen",
      "Medikamentenmanagement",
      "Koordination mit Fachärzten",
      "Patientenschulungen",
    ],
  },
  {
    key: "igel",
    icon: Pill,
    details: [
      "Reisemedizinische Beratung",
      "Erweiterte Labordiagnostik",
      "Sportmedizinische Untersuchungen",
      "Individuelle Gesundheitsberatung",
      "Zusatzimpfungen",
    ],
  },
];

export default function ServicesContent() {
  const t = useTranslations("services");

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

      {/* DIAGNOSTIK - Blue gradient background with modern cards */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <Badge className="bg-primary/10 text-primary border-0 mb-2">
                  {t("categories.diagnostics")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                  Moderne Diagnostik
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Mit modernsten Geräten und langjähriger Erfahrung bieten wir Ihnen eine umfassende internistische Diagnostik auf Facharztniveau.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {diagnosticsServices.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-blue-100/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">
                      {t(`items.${service.key}.title`)}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                      {t(`items.${service.key}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="details" className="border-none">
                        <AccordionTrigger className="text-sm text-primary hover:no-underline py-2">
                          Details anzeigen
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {service.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VORSORGE - Green accents with horizontal layout */}
      <section className="py-20 bg-gradient-to-r from-emerald-50/50 via-white to-teal-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="bg-emerald-100 text-emerald-700 border-0 mb-4">
              {t("categories.prevention")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Prävention & Vorsorge
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Vorsorge ist die beste Medizin. Wir helfen Ihnen, gesund zu bleiben und Erkrankungen frühzeitig zu erkennen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {preventionServices.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-emerald-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 overflow-hidden group">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="h-10 w-10 text-emerald-600" />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <CardTitle className="text-xl mb-2">
                        {t(`items.${service.key}.title`)}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mb-4">
                        {t(`items.${service.key}.description`)}
                      </CardDescription>
                      <ul className="space-y-2">
                        {service.details.slice(0, 4).map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {detail}
                          </li>
                        ))}
                        {service.details.length > 4 && (
                          <li className="text-sm text-emerald-600 font-medium">
                            +{service.details.length - 4} weitere
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BETREUUNG - Warm tones with large feature cards */}
      <section className="py-20 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-rose-50/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <Badge className="bg-amber-100 text-amber-700 border-0 mb-4">
                  {t("categories.care")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                  Persönliche Betreuung
                </h2>
                <p className="text-muted-foreground max-w-xl text-lg">
                  Wir begleiten Sie langfristig und kümmern uns um Ihre Gesundheit – mit Herz und Verstand.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-amber-600">
                <Heart className="h-5 w-5 fill-current" />
                <span className="font-medium">Mit persönlicher Note</span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {careServices.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-amber-100/50 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                        <service.icon className="h-7 w-7 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">
                          {t(`items.${service.key}.title`)}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {t(`items.${service.key}.description`)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {service.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              Sie haben Fragen zu unseren Leistungen?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Vereinbaren Sie einen Termin oder kontaktieren Sie uns direkt. Wir beraten Sie gerne persönlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 group">
                <Link href="/termin">
                  <Calendar className="mr-2 h-5 w-5" />
                  Termin vereinbaren
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-secondary text-white hover:bg-secondary/90 border-0">
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
