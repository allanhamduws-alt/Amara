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
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Ban, CalendarOff } from "lucide-react";
import { format, addDays } from "date-fns";
import { de } from "date-fns/locale";

interface BlockSlotsDialogProps {
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

export default function BlockSlotsDialog({ onSuccess }: BlockSlotsDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [blockType, setBlockType] = useState<"day" | "slot">("day");
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error("Bitte wählen Sie ein Datum aus");
      return;
    }

    if (blockType === "slot" && !timeSlot) {
      toast.error("Bitte wählen Sie eine Uhrzeit aus");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/blocked-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(selectedDate, "yyyy-MM-dd"),
          allDay: blockType === "day",
          timeSlot: blockType === "slot" ? timeSlot : null,
          reason: reason || null,
        }),
      });

      if (response.ok) {
        toast.success(
          blockType === "day"
            ? "Ganzer Tag wurde blockiert"
            : "Zeitslot wurde blockiert"
        );
        setOpen(false);
        setSelectedDate(addDays(new Date(), 1));
        setBlockType("day");
        setTimeSlot("");
        setReason("");
        onSuccess();
      } else {
        const data = await response.json();
        toast.error(data.error || "Fehler beim Blockieren");
      }
    } catch {
      toast.error("Fehler beim Blockieren");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Ban className="h-4 w-4 mr-2" />
          Slot blockieren
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarOff className="h-5 w-5" />
            Zeitslot blockieren
          </DialogTitle>
          <DialogDescription>
            Blockieren Sie einen einzelnen Slot oder einen ganzen Tag (z.B. für Urlaub oder Fortbildung).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="mb-2 block">Art der Blockierung</Label>
            <Select
              value={blockType}
              onValueChange={(value: "day" | "slot") => setBlockType(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Ganzer Tag</SelectItem>
                <SelectItem value="slot">Einzelner Slot</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block">Datum wählen</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={de}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          {blockType === "slot" && (
            <div>
              <Label htmlFor="timeSlot">Uhrzeit</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
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
          )}

          <div>
            <Label htmlFor="reason">Grund (optional)</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="z.B. Urlaub, Fortbildung, etc."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={isSubmitting} variant="destructive">
              {isSubmitting ? "Wird blockiert..." : "Blockieren"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

