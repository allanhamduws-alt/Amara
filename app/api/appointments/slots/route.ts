import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateTimeSlots } from "@/lib/appointments";
import { startOfDay } from "date-fns";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter required" },
      { status: 400 }
    );
  }

  try {
    const queryDate = startOfDay(new Date(date));
    const dayOfWeek = queryDate.getDay();

    // Get all available slots for the day
    const allSlots = generateTimeSlots(dayOfWeek);

    // Get booked appointments
    const appointments = await prisma.appointment.findMany({
      where: {
        date: queryDate,
        status: { not: "CANCELLED" },
      },
      select: {
        timeSlot: true,
      },
    });

    // Get blocked slots
    const blockedSlots = await prisma.blockedSlot.findMany({
      where: {
        date: queryDate,
      },
    });

    const bookedSlots = appointments.map((a) => a.timeSlot);
    const blocked = blockedSlots.flatMap((b) =>
      b.allDay ? allSlots : [b.timeSlot].filter(Boolean)
    );

    const unavailableSlots = [...new Set([...bookedSlots, ...blocked])];

    return NextResponse.json({
      date: date,
      allSlots,
      bookedSlots: unavailableSlots,
      availableSlots: allSlots.filter((slot) => !unavailableSlots.includes(slot)),
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}

