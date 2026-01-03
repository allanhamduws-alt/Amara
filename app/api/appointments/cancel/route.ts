import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendCancellationConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Cancellation token required" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.findUnique({
      where: { cancelToken: token },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    if (appointment.status === "CANCELLED") {
      return NextResponse.json(
        { error: "Appointment already cancelled" },
        { status: 400 }
      );
    }

    // Update appointment status
    await prisma.appointment.update({
      where: { id: appointment.id },
      data: { status: "CANCELLED" },
    });

    // Send cancellation confirmation
    await sendCancellationConfirmation({
      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail,
      date: appointment.date,
      timeSlot: appointment.timeSlot,
      language: appointment.language,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cancellation error:", error);
    return NextResponse.json(
      { error: "Failed to cancel appointment" },
      { status: 500 }
    );
  }
}

