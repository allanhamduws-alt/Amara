import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendAppointmentConfirmation } from "@/lib/email";
import { isValidBookingDate, isSlotInPast, generateTimeSlots } from "@/lib/appointments";
import { startOfDay } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, timeSlot, name, email, phone, reason, language } = body;

    // Validate required fields
    if (!date || !timeSlot || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(date);
    const dayStart = startOfDay(appointmentDate);

    // Validate date
    if (!isValidBookingDate(appointmentDate)) {
      return NextResponse.json(
        { error: "Invalid booking date" },
        { status: 400 }
      );
    }

    // Validate time slot
    const availableSlots = generateTimeSlots(appointmentDate.getDay());
    if (!availableSlots.includes(timeSlot)) {
      return NextResponse.json(
        { error: "Invalid time slot" },
        { status: 400 }
      );
    }

    // Check if slot is in the past
    if (isSlotInPast(appointmentDate, timeSlot)) {
      return NextResponse.json(
        { error: "Time slot is in the past" },
        { status: 400 }
      );
    }

    // Check if slot is already booked
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: dayStart,
        timeSlot,
        status: { not: "CANCELLED" },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: "Time slot is already booked" },
        { status: 409 }
      );
    }

    // Check if slot is blocked
    const blockedSlot = await prisma.blockedSlot.findFirst({
      where: {
        date: dayStart,
        OR: [
          { timeSlot },
          { allDay: true },
        ],
      },
    });

    if (blockedSlot) {
      return NextResponse.json(
        { error: "Time slot is not available" },
        { status: 409 }
      );
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        date: dayStart,
        timeSlot,
        patientName: name,
        patientEmail: email,
        patientPhone: phone,
        reason: reason || null,
        language: language || "de",
        status: "PENDING",
      },
    });

    // Send confirmation email
    await sendAppointmentConfirmation({
      patientName: name,
      patientEmail: email,
      date: dayStart,
      timeSlot,
      cancelToken: appointment.cancelToken,
      language: language || "de",
    });

    return NextResponse.json(
      { success: true, appointment: { id: appointment.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}

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

    const appointments = await prisma.appointment.findMany({
      where: {
        date: queryDate,
        status: { not: "CANCELLED" },
      },
      select: {
        timeSlot: true,
      },
    });

    const blockedSlots = await prisma.blockedSlot.findMany({
      where: {
        date: queryDate,
      },
    });

    const bookedSlots = appointments.map((a) => a.timeSlot);
    const blocked = blockedSlots.flatMap((b) =>
      b.allDay ? generateTimeSlots(queryDate.getDay()) : [b.timeSlot].filter(Boolean)
    );

    return NextResponse.json({
      bookedSlots: [...new Set([...bookedSlots, ...blocked])],
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}

