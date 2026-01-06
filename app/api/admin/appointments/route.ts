import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay, parseISO } from "date-fns";
import { sendStatusChangeEmail } from "@/lib/email";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");
  const statusParam = searchParams.get("status");

  try {
    let whereClause: Record<string, unknown> = {};

    if (dateParam) {
      const date = parseISO(dateParam);
      whereClause = {
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      };
    }

    // Filter by status (e.g., ?status=PENDING for pending appointments)
    if (statusParam) {
      whereClause.status = statusParam;
      // For pending appointments, only show future appointments
      if (statusParam === "PENDING") {
        whereClause.date = { gte: startOfDay(new Date()) };
      }
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { date, timeSlot, patientName, patientEmail, patientPhone, reason, status } = body;

    if (!date || !timeSlot || !patientName || !patientPhone) {
      return NextResponse.json(
        { error: "Pflichtfelder fehlen" },
        { status: 400 }
      );
    }

    const appointmentDate = parseISO(date);

    // Check if slot is already taken
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: {
          gte: startOfDay(appointmentDate),
          lte: endOfDay(appointmentDate),
        },
        timeSlot,
        status: { not: "CANCELLED" },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: "Dieser Zeitslot ist bereits belegt" },
        { status: 409 }
      );
    }

    // Check if slot is blocked
    const blockedSlot = await prisma.blockedSlot.findFirst({
      where: {
        date: {
          gte: startOfDay(appointmentDate),
          lte: endOfDay(appointmentDate),
        },
        OR: [
          { allDay: true },
          { timeSlot },
        ],
      },
    });

    if (blockedSlot) {
      return NextResponse.json(
        { error: "Dieser Zeitslot ist blockiert" },
        { status: 409 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        timeSlot,
        patientName,
        patientEmail: patientEmail || "",
        patientPhone,
        reason: reason || null,
        status: status || "CONFIRMED",
        language: "de",
      },
    });

    // Send confirmation email if email provided and status is confirmed
    if (patientEmail && status === "CONFIRMED") {
      await sendStatusChangeEmail({
        patientName,
        patientEmail,
        date: appointmentDate,
        timeSlot,
        language: "de",
        status: "CONFIRMED",
      });
    }

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen des Termins" },
      { status: 500 }
    );
  }
}

