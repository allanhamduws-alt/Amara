"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, Quote, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

const doctors = [
  {
    key: "jwan",
    // Professional male doctor avatar placeholder
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop&crop=face",
    initials: "JA",
    gradientFrom: "from-primary",
    gradientTo: "to-secondary",
    specializations: ["Innere Medizin", "Hausärztliche Versorgung", "Ultraschalldiagnostik"],
  },
  {
    key: "khakan",
    // Professional female doctor avatar placeholder
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop&crop=face",
    initials: "KA",
    gradientFrom: "from-secondary",
    gradientTo: "to-primary",
    specializations: ["Allgemeinmedizin", "Hausärztliche Versorgung", "Präventionsmedizin"],
  },
];

const staff = [
  {
    key: "brugmann",
    // Professional female medical staff avatar
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop&crop=face",
    initials: "FB",
    gradientFrom: "from-accent",
    gradientTo: "to-primary/60",
    quote: "Organisation ist der Schlüssel zu einem reibungslosen Praxisablauf.",
    tasks: ["Praxisorganisation", "Terminmanagement", "Patientenbetreuung"],
  },
  {
    key: "dziachan",
    // Professional female medical assistant avatar
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=400&auto=format&fit=crop&crop=face",
    initials: "FD",
    gradientFrom: "from-primary/60",
    gradientTo: "to-accent",
    quote: "Jeder Patient verdient unsere volle Aufmerksamkeit.",
    tasks: ["Medizinische Assistenz", "Blutentnahmen", "EKG-Durchführung"],
  },
];

export default function TeamContent() {
  const t = useTranslations("team");

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

      {/* Doctors Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Badge variant="outline" className="text-primary border-primary mb-4">
              {t("doctors")}
            </Badge>
            <h2 className="text-3xl font-serif text-foreground">
              Unsere Ärzte
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Erfahrene Fachärzte mit dem Anspruch, Sie medizinisch und menschlich bestmöglich zu betreuen.
            </p>
          </motion.div>

          {/* Doctors Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="md:w-2/5 bg-gradient-to-br from-accent via-muted to-accent p-8 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${doctor.gradientFrom} ${doctor.gradientTo} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                          <Avatar className="h-48 w-48 border-4 border-white shadow-2xl relative ring-4 ring-white/50">
                            <AvatarImage src={doctor.image} alt={t(`members.${doctor.key}.name`)} className="object-cover" />
                            <AvatarFallback className={`bg-gradient-to-br ${doctor.gradientFrom} ${doctor.gradientTo} text-white text-5xl font-serif tracking-wider`}>
                              {doctor.initials}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="md:w-3/5 p-8">
                        <h3 className="text-2xl font-serif font-semibold text-foreground mb-1">
                          {t(`members.${doctor.key}.name`)}
                        </h3>
                        <p className="text-primary font-medium mb-1">
                          {t(`members.${doctor.key}.role`)}
                        </p>
                        {t(`members.${doctor.key}.subtitle`) && (
                          <p className="text-muted-foreground text-sm mb-4">
                            {t(`members.${doctor.key}.subtitle`)}
                          </p>
                        )}

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {t(`members.${doctor.key}.description`)}
                        </p>

                        {/* Specializations */}
                        <div className="flex flex-wrap gap-2">
                          {doctor.specializations.map((spec) => (
                            <Badge key={spec} variant="secondary" className="bg-accent text-accent-foreground">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Staff Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Badge variant="outline" className="text-primary border-primary mb-4">
              {t("staff")}
            </Badge>
            <h2 className="text-3xl font-serif text-foreground">
              Unser Praxisteam
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Freundlich, kompetent und immer für Sie da – unser Team kümmert sich um Ihr Wohlbefinden von der Anmeldung bis zur Behandlung.
            </p>
          </motion.div>

          {/* Staff Grid - Larger cards with more info */}
          <div className="grid md:grid-cols-2 gap-8">
            {staff.map((member, index) => (
              <motion.div
                key={member.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                        <Avatar className="h-28 w-28 border-4 border-white shadow-lg relative ring-2 ring-primary/10">
                          <AvatarImage src={member.image} alt={t(`members.${member.key}.name`)} className="object-cover" />
                          <AvatarFallback className={`bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} text-primary text-2xl font-serif`}>
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-foreground mb-1">
                          {t(`members.${member.key}.name`)}
                        </h3>
                        <p className="text-primary font-medium mb-1">
                          {t(`members.${member.key}.role`)}
                        </p>
                        {t(`members.${member.key}.subtitle`) && (
                          <p className="text-muted-foreground text-sm mb-3">
                            {t(`members.${member.key}.subtitle`)}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4">
                          {t(`members.${member.key}.description`)}
                        </p>

                        {/* Tasks */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.tasks.map((task) => (
                            <Badge key={task} variant="outline" className="text-xs bg-accent/50 border-accent">
                              {task}
                            </Badge>
                          ))}
                        </div>

                        {/* Quote */}
                        <div className="bg-accent/30 rounded-lg p-3 flex gap-2">
                          <Quote className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground italic">
                            {member.quote}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Team Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 bg-gradient-to-r from-accent via-white to-accent rounded-2xl p-8 md:p-12"
          >
            <div className="text-center max-w-2xl mx-auto">
              <Heart className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-foreground mb-4">
                Gemeinsam für Ihre Gesundheit
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Unser Team arbeitet Hand in Hand, um Ihnen die bestmögliche Betreuung zu bieten. 
                Wir legen großen Wert auf eine angenehme Atmosphäre und nehmen uns Zeit für Sie und Ihre Anliegen.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-serif text-primary mb-1">4</div>
                <div className="text-sm text-muted-foreground">Teammitglieder</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Jahre Erfahrung</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-primary mb-1">
                  <Star className="h-8 w-8 inline text-primary fill-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Top bewertet</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
              Lernen Sie uns persönlich kennen
            </h2>
            <p className="text-white/80 mb-8">
              Vereinbaren Sie einen Termin und überzeugen Sie sich selbst von unserer persönlichen Betreuung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/termin">
                  <Calendar className="mr-2 h-4 w-4" />
                  Termin vereinbaren
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-secondary text-white hover:bg-secondary/90 border-0">
                <a href="tel:040576061">
                  <Phone className="mr-2 h-4 w-4" />
                  040 576061
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
