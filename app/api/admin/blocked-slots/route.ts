import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay, parseISO } from "date-fns";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  try {
    let whereClause = {};

    if (dateParam) {
      const date = parseISO(dateParam);
      whereClause = {
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      };
    }

    const blockedSlots = await prisma.blockedSlot.findMany({
      where: whereClause,
      orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
    });

    return NextResponse.json({ blockedSlots });
  } catch (error) {
    console.error("Error fetching blocked slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch blocked slots" },
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
    const { date, allDay, timeSlot, reason } = body;

    if (!date) {
      return NextResponse.json(
        { error: "Datum ist erforderlich" },
        { status: 400 }
      );
    }

    const blockDate = parseISO(date);

    // Check if already blocked
    const existingBlock = await prisma.blockedSlot.findFirst({
      where: {
        date: {
          gte: startOfDay(blockDate),
          lte: endOfDay(blockDate),
        },
        OR: [
          { allDay: true },
          { timeSlot: timeSlot || undefined },
        ],
      },
    });

    if (existingBlock) {
      return NextResponse.json(
        { error: "Dieser Zeitraum ist bereits blockiert" },
        { status: 409 }
      );
    }

    const blockedSlot = await prisma.blockedSlot.create({
      data: {
        date: blockDate,
        allDay: allDay || false,
        timeSlot: allDay ? null : timeSlot,
        reason: reason || null,
      },
    });

    return NextResponse.json({ blockedSlot }, { status: 201 });
  } catch (error) {
    console.error("Error creating blocked slot:", error);
    return NextResponse.json(
      { error: "Fehler beim Blockieren" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID ist erforderlich" }, { status: 400 });
  }

  try {
    await prisma.blockedSlot.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blocked slot:", error);
    return NextResponse.json(
      { error: "Fehler beim Löschen" },
      { status: 500 }
    );
  }
}

