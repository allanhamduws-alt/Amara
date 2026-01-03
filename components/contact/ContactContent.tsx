"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Bus, Train, Calendar, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactContent() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(t("form.success"));
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(t("form.error"));
      }
    } catch {
      toast.error(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      {t("info.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground">{t("info.address")}</p>
                      <p className="text-muted-foreground text-sm">
                        Eidelstedter Platz 6a<br />
                        22523 Hamburg
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("info.phone")}</p>
                      <a href="tel:040576061" className="text-primary hover:underline text-sm">
                        040 576061
                      </a>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("info.fax")}</p>
                      <p className="text-muted-foreground text-sm">040 576046</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("info.email")}</p>
                      <a href="mailto:int.hausarzt.eidelstedt@gmx.de" className="text-primary hover:underline text-sm break-all">
                        int.hausarzt.eidelstedt@gmx.de
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Opening Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {t("hours.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Montag - Dienstag</span>
                        <span className="text-foreground">08:00 - 13:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span></span>
                        <span className="text-foreground">15:00 - 17:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mittwoch - Freitag</span>
                        <span className="text-foreground">08:00 - 13:00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Directions Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bus className="h-5 w-5 text-primary" />
                      {t("directions.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground text-sm">{t("directions.bus")}</p>
                      <p className="text-muted-foreground text-xs">{t("directions.busLines")}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{t("directions.sbahn")}</p>
                      <p className="text-muted-foreground text-xs">{t("directions.sbahnLines")}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{t("directions.akn")}</p>
                      <p className="text-muted-foreground text-xs">{t("directions.aknLines")}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{t("form.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("form.name")} *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={t("form.namePlaceholder")}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("form.email")} *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t("form.emailPlaceholder")}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("form.phone")}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={t("form.phonePlaceholder")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("form.message")} *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t("form.messagePlaceholder")}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? (
                        t("form.sending")
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t("form.submit")}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 rounded-xl overflow-hidden h-[400px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.8987654321!2d9.885123456789!3d53.60345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f61a1234567%3A0x1234567890abcdef!2sEidelstedter%20Platz%206a%2C%2022523%20Hamburg!5e0!3m2!1sde!2sde!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </motion.div>
          </div>
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
              Lieber direkt einen Termin?
            </h2>
            <p className="text-muted-foreground mb-8">
              Buchen Sie Ihren Termin bequem online oder rufen Sie uns an.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/termin">
                  <Calendar className="mr-2 h-4 w-4" />
                  Online buchen
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
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

