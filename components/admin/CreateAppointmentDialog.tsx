"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, CalendarPlus } from "lucide-react";
import { format, addDays } from "date-fns";
import { de } from "date-fns/locale";

interface CreateAppointmentDialogProps {
  onSuccess: () => void;
}

const timeSlots = [
  "08:00", "08:15", "08:30", "08:45",
  "09:00", "09:15", "09:30", "09:45",
  "10:00", "10:15", "10:30", "10:45",
  "11:00", "11:15", "11:30", "11:45",
  "12:00", "12:15", "12:30", "12:45",
  "14:00", "14:15", "14:30", "14:45",
  "15:00", "15:15", "15:30", "15:45",
  "16:00", "16:15", "16:30", "16:45",
  "17:00", "17:15", "17:30", "17:45",
];

export default function CreateAppointmentDialog({ onSuccess }: CreateAppointmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    timeSlot: "",
    reason: "",
    status: "CONFIRMED",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !formData.timeSlot || !formData.patientName || !formData.patientPhone) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: format(selectedDate, "yyyy-MM-dd"),
        }),
      });

      if (response.ok) {
        toast.success("Termin erfolgreich erstellt");
        setOpen(false);
        setFormData({
          patientName: "",
          patientEmail: "",
          patientPhone: "",
          timeSlot: "",
          reason: "",
          status: "CONFIRMED",
        });
        setSelectedDate(addDays(new Date(), 1));
        onSuccess();
      } else {
        const data = await response.json();
        toast.error(data.error || "Fehler beim Erstellen des Termins");
      }
    } catch {
      toast.error("Fehler beim Erstellen des Termins");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Neuer Termin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5" />
            Neuen Termin erstellen
          </DialogTitle>
          <DialogDescription>
            Erstellen Sie einen neuen Termin für einen Patienten (z.B. für telefonische Buchungen).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Calendar */}
            <div>
              <Label className="mb-2 block">Datum wählen *</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={de}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                className="rounded-md border"
              />
            </div>

            {/* Right Column - Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="timeSlot">Uhrzeit *</Label>
                <Select
                  value={formData.timeSlot}
                  onValueChange={(value) => setFormData({ ...formData, timeSlot: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Uhrzeit wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot} Uhr
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="patientName">Name *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Vor- und Nachname"
                  required
                />
              </div>

              <div>
                <Label htmlFor="patientEmail">E-Mail</Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                  placeholder="email@beispiel.de"
                />
              </div>

              <div>
                <Label htmlFor="patientPhone">Telefon *</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                  placeholder="+49 40 123456"
                  required
                />
              </div>

              <div>
                <Label htmlFor="reason">Grund des Besuchs</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Optional: Beschreibung des Anliegens"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CONFIRMED">Bestätigt</SelectItem>
                    <SelectItem value="PENDING">Ausstehend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Wird erstellt..." : "Termin erstellen"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

