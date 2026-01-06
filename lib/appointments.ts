import { addDays, format, isWeekend, setHours, setMinutes, startOfDay } from "date-fns";

// Opening hours configuration
export const OPENING_HOURS = {
  1: { // Monday
    morning: { start: "08:00", end: "13:00" },
    afternoon: { start: "15:00", end: "17:30" },
  },
  2: { // Tuesday
    morning: { start: "08:00", end: "13:00" },
    afternoon: { start: "15:00", end: "17:30" },
  },
  3: { // Wednesday
    morning: { start: "08:00", end: "13:00" },
    afternoon: null,
  },
  4: { // Thursday
    morning: { start: "08:00", end: "13:00" },
    afternoon: null,
  },
  5: { // Friday
    morning: { start: "08:00", end: "13:00" },
    afternoon: null,
  },
} as const;

// Emergency hours (not bookable online)
export const EMERGENCY_HOURS = {
  start: "12:00",
  end: "13:00",
};

// Slot duration in minutes
export const SLOT_DURATION = 30;

// Maximum days in advance for booking
export const MAX_BOOKING_DAYS = 60;

// Minimum hours in advance for booking
export const MIN_BOOKING_HOURS = 2;

type TimeSlot = {
  time: string;
  available: boolean;
};

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

export function generateTimeSlots(dayOfWeek: number): string[] {
  const hours = OPENING_HOURS[dayOfWeek as keyof typeof OPENING_HOURS];
  if (!hours) return [];

  const slots: string[] = [];
  const emergencyStart = timeToMinutes(EMERGENCY_HOURS.start);
  const emergencyEnd = timeToMinutes(EMERGENCY_HOURS.end);

  // Morning slots
  if (hours.morning) {
    let current = timeToMinutes(hours.morning.start);
    const end = timeToMinutes(hours.morning.end);

    while (current + SLOT_DURATION <= end) {
      // Skip emergency hours (12:00-13:00)
      if (current < emergencyStart || current >= emergencyEnd) {
        slots.push(minutesToTime(current));
      }
      current += SLOT_DURATION;
    }
  }

  // Afternoon slots
  if (hours.afternoon) {
    let current = timeToMinutes(hours.afternoon.start);
    const end = timeToMinutes(hours.afternoon.end);

    while (current + SLOT_DURATION <= end) {
      slots.push(minutesToTime(current));
      current += SLOT_DURATION;
    }
  }

  return slots;
}

export function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = startOfDay(new Date());

  for (let i = 1; i <= MAX_BOOKING_DAYS; i++) {
    const date = addDays(today, i);
    const dayOfWeek = date.getDay();

    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // Check if the day has opening hours
    if (OPENING_HOURS[dayOfWeek as keyof typeof OPENING_HOURS]) {
      dates.push(date);
    }
  }

  return dates;
}

export function isSlotInPast(date: Date, timeSlot: string): boolean {
  const [hours, minutes] = timeSlot.split(":").map(Number);
  // Ensure we're working from the start of day to avoid timezone issues
  const dayStart = startOfDay(date);
  const slotDate = setMinutes(setHours(dayStart, hours), minutes);
  const now = new Date();
  const minBookingTime = new Date(now.getTime() + MIN_BOOKING_HOURS * 60 * 60 * 1000);

  return slotDate < minBookingTime;
}

export function formatDateForDisplay(date: Date, locale: string = "de"): string {
  return format(date, locale === "de" ? "EEEE, d. MMMM yyyy" : "EEEE, MMMM d, yyyy");
}

export function isValidBookingDate(date: Date): boolean {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, MAX_BOOKING_DAYS);
  const dayOfWeek = date.getDay();

  // Check if it's a weekday
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;

  // Check if it's within the booking window
  if (date <= today || date > maxDate) return false;

  // Check if the day has opening hours
  return !!OPENING_HOURS[dayOfWeek as keyof typeof OPENING_HOURS];
}

