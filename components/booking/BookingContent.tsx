"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, User, Check, ArrowLeft, ArrowRight, Phone, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, isWeekend, isBefore, startOfDay } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { generateTimeSlots, OPENING_HOURS } from "@/lib/appointments";

type Step = "date" | "time" | "details" | "confirm";

interface BookingData {
  date: Date | null;
  timeSlot: string | null;
  name: string;
  email: string;
  phone: string;
  reason: string;
}

export default function BookingContent() {
  const t = useTranslations("appointment");
  const locale = useLocale();
  const dateLocale = locale === "de" ? de : enUS;

  const [step, setStep] = useState<Step>("date");
  const [bookingData, setBookingData] = useState<BookingData>({
    date: null,
    timeSlot: null,
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const steps: Step[] = ["date", "time", "details", "confirm"];
  const currentStepIndex = steps.indexOf(step);

  // Disable weekends and past dates
  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    const maxDate = addDays(today, 60);
    return isWeekend(date) || isBefore(date, today) || date > maxDate;
  };

  const handleDateSelect = async (date: Date | undefined) => {
    if (date) {
      setBookingData({ ...bookingData, date, timeSlot: null });
      
      // Fetch booked slots for this date
      try {
        const response = await fetch(`/api/appointments/slots?date=${format(date, "yyyy-MM-dd")}`);
        if (response.ok) {
          const data = await response.json();
          setBookedSlots(data.bookedSlots || []);
        }
      } catch {
        setBookedSlots([]);
      }
      
      setStep("time");
    }
  };

  const handleTimeSelect = (timeSlot: string) => {
    setBookingData({ ...bookingData, timeSlot });
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingData,
          date: bookingData.date?.toISOString(),
          language: locale,
        }),
      });

      if (response.ok) {
        setStep("confirm");
      } else {
        const data = await response.json();
        toast.error(data.error || t("error.general"));
      }
    } catch {
      toast.error(t("error.general"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableSlots = bookingData.date
    ? generateTimeSlots(bookingData.date.getDay()).filter(slot => !bookedSlots.includes(slot))
    : [];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-16">
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

      {/* Booking Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            {step !== "confirm" && (
              <div className="mb-8">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  {steps.slice(0, -1).map((s, index) => (
                    <div key={s} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          index <= currentStepIndex
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index < currentStepIndex ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      {index < steps.length - 2 && (
                        <div
                          className={`w-16 sm:w-24 h-1 mx-2 rounded transition-colors ${
                            index < currentStepIndex ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-muted-foreground">
                  <span>{t("steps.date")}</span>
                  <span>{t("steps.time")}</span>
                  <span>{t("steps.details")}</span>
                </div>
              </div>
            )}

            {/* Content */}
            <AnimatePresence mode="wait">
              {/* Step 1: Date Selection */}
              {step === "date" && (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        {t("calendar.selectDate")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={bookingData.date || undefined}
                        onSelect={handleDateSelect}
                        disabled={disabledDays}
                        locale={dateLocale}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Time Selection */}
              {step === "time" && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            {t("calendar.availableSlots")}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {bookingData.date && format(bookingData.date, "EEEE, d. MMMM yyyy", { locale: dateLocale })}
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setStep("date")}>
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          {t("steps.date")}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                          {availableSlots.map((slot) => (
                            <Button
                              key={slot}
                              variant={bookingData.timeSlot === slot ? "default" : "outline"}
                              onClick={() => handleTimeSelect(slot)}
                              className="h-12"
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          {t("calendar.noSlots")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Personal Details */}
              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            {t("steps.details")}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {bookingData.date && format(bookingData.date, "EEEE, d. MMMM yyyy", { locale: dateLocale })} um {bookingData.timeSlot} Uhr
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setStep("time")}>
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          {t("steps.time")}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">{t("form.name")} *</Label>
                            <Input
                              id="name"
                              value={bookingData.name}
                              onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                              placeholder={t("form.namePlaceholder")}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">{t("form.email")} *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={bookingData.email}
                              onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                              placeholder={t("form.emailPlaceholder")}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">{t("form.phone")} *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                            placeholder={t("form.phonePlaceholder")}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="reason">{t("form.reason")}</Label>
                          <Textarea
                            id="reason"
                            value={bookingData.reason}
                            onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                            placeholder={t("form.reasonPlaceholder")}
                            rows={4}
                          />
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                          {isSubmitting ? t("form.submitting") : t("form.submit")}
                          {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === "confirm" && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="text-center">
                    <CardContent className="pt-12 pb-8">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="h-10 w-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-serif text-foreground mb-2">
                        {t("confirmation.title")}
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        {t("confirmation.message")}
                      </p>

                      <div className="bg-muted/50 rounded-lg p-6 max-w-sm mx-auto mb-8">
                        <h3 className="font-semibold text-foreground mb-4">{t("confirmation.details")}</h3>
                        <div className="space-y-3 text-left">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("confirmation.date")}:</span>
                            <span className="font-medium">
                              {bookingData.date && format(bookingData.date, "d. MMMM yyyy", { locale: dateLocale })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("confirmation.time")}:</span>
                            <span className="font-medium">{bookingData.timeSlot} Uhr</span>
                          </div>
                        </div>
                      </div>

                      <Button asChild size="lg">
                        <Link href="/">
                          <Home className="mr-2 h-4 w-4" />
                          {t("confirmation.backHome")}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info Cards */}
            {step !== "confirm" && (
              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Telefonische Terminvergabe</h3>
                        <p className="text-muted-foreground text-sm">
                          Sie können uns auch telefonisch erreichen unter{" "}
                          <a href="tel:040576061" className="text-primary hover:underline">
                            040 576061
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Notfallsprechstunde</h3>
                        <p className="text-muted-foreground text-sm">
                          Mo-Fr von 12:00 - 13:00 Uhr ohne Voranmeldung (nicht online buchbar)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

