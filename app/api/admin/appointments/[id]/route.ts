import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";
import { sendStatusChangeEmail } from "@/lib/email";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status } = body;

  if (!status || !["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    // Get current appointment to check if status changed
    const currentAppointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!currentAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    // Send email if status changed to CONFIRMED or CANCELLED
    if (
      currentAppointment.status !== status &&
      (status === "CONFIRMED" || status === "CANCELLED")
    ) {
      await sendStatusChangeEmail({
        patientName: appointment.patientName,
        patientEmail: appointment.patientEmail,
        date: appointment.date,
        timeSlot: appointment.timeSlot,
        language: appointment.language,
        status: status as "CONFIRMED" | "CANCELLED",
      });
    }

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}

