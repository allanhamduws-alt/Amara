"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, MapPin, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const openingHours = [
  { day: "monday", morning: "08:00 - 13:00", afternoon: "15:00 - 17:30" },
  { day: "tuesday", morning: "08:00 - 13:00", afternoon: "15:00 - 17:30" },
  { day: "wednesday", morning: "08:00 - 13:00", afternoon: null },
  { day: "thursday", morning: "08:00 - 13:00", afternoon: null },
  { day: "friday", morning: "08:00 - 13:00", afternoon: null },
];

const phoneHours = [
  { day: "monday", morning: "09:00 - 12:00", afternoon: "15:00 - 17:00" },
  { day: "tuesday", morning: "09:00 - 12:00", afternoon: "15:00 - 17:00" },
  { day: "wednesday", morning: "09:00 - 12:00", afternoon: null },
  { day: "thursday", morning: "09:00 - 12:00", afternoon: null },
  { day: "friday", morning: "09:00 - 12:00", afternoon: null },
];

export default function OpeningHours() {
  const t = useTranslations("home.hours");
  const tContact = useTranslations("contact");

  // Check if currently open (simplified)
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour * 60 + minute;

  const isOpen = () => {
    if (day === 0 || day === 6) return false; // Weekend
    const dayData = openingHours[day - 1];
    if (!dayData) return false;

    // Check morning hours
    const morningStart = 8 * 60;
    const morningEnd = 13 * 60;
    if (currentTime >= morningStart && currentTime < morningEnd) return true;

    // Check afternoon hours (Mon/Tue only)
    if (day <= 2 && dayData.afternoon) {
      const afternoonStart = 15 * 60;
      const afternoonEnd = 17 * 60 + 30;
      if (currentTime >= afternoonStart && currentTime < afternoonEnd) return true;
    }

    return false;
  };

  const open = isOpen();

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <Clock className="h-4 w-4 text-white/80" />
            <span className="text-white/80 text-sm font-medium">{t("title")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            {t("subtitle")}
          </h2>
          
          {/* Status Badge */}
          <Badge 
            variant={open ? "default" : "secondary"}
            className={open ? "bg-green-500 text-white" : "bg-white/20 text-white"}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${open ? "bg-white animate-pulse" : "bg-white/50"}`} />
            {open ? "Jetzt geöffnet" : "Aktuell geschlossen"}
          </Badge>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Opening Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Öffnungszeiten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {openingHours.map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-white/80">{t(item.day)}</span>
                      <div className="text-right">
                        <span className="text-white">{item.morning}</span>
                        {item.afternoon && (
                          <>
                            <br />
                            <span className="text-white">{item.afternoon}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Phone Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  {tContact("hours.phone")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {phoneHours.map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-white/80">{t(item.day)}</span>
                      <div className="text-right">
                        <span className="text-white">{item.morning}</span>
                        {item.afternoon && (
                          <>
                            <br />
                            <span className="text-white">{item.afternoon}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <a 
                    href="tel:040576061" 
                    className="text-white hover:text-white/80 font-semibold text-lg"
                  >
                    040 576061
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Emergency & Address Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Kontakt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-white font-medium">Adresse</p>
                  <p className="text-white/80 text-sm">
                    Eidelstedter Platz 6a<br />
                    22523 Hamburg
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">{t("emergency")}</p>
                      <p className="text-white/70 text-xs">{t("emergencyTime")}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-white font-medium">E-Mail</p>
                  <a 
                    href="mailto:int.hausarzt.eidelstedt@gmx.de"
                    className="text-white/80 text-sm hover:text-white"
                  >
                    int.hausarzt.eidelstedt@gmx.de
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

