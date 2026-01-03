import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date();

    const [todayAppointments, pendingAppointments, weekAppointments, totalPatients] =
      await Promise.all([
        // Today's appointments
        prisma.appointment.count({
          where: {
            date: {
              gte: startOfDay(today),
              lte: endOfDay(today),
            },
            status: { not: "CANCELLED" },
          },
        }),

        // Pending appointments
        prisma.appointment.count({
          where: {
            status: "PENDING",
            date: { gte: startOfDay(today) },
          },
        }),

        // This week's appointments
        prisma.appointment.count({
          where: {
            date: {
              gte: startOfWeek(today, { weekStartsOn: 1 }),
              lte: endOfWeek(today, { weekStartsOn: 1 }),
            },
            status: { not: "CANCELLED" },
          },
        }),

        // Total unique patients
        prisma.appointment.groupBy({
          by: ["patientEmail"],
          _count: true,
        }),
      ]);

    return NextResponse.json({
      todayAppointments,
      pendingAppointments,
      weekAppointments,
      totalPatients: totalPatients.length,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

