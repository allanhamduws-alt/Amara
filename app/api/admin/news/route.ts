import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.newsPost.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
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
    const { titleDe, titleEn, contentDe, contentEn, slug, published } = body;

    if (!titleDe || !contentDe || !slug) {
      return NextResponse.json(
        { error: "Pflichtfelder fehlen" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.newsPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "Ein Beitrag mit diesem Slug existiert bereits" },
        { status: 409 }
      );
    }

    const post = await prisma.newsPost.create({
      data: {
        titleDe,
        titleEn: titleEn || titleDe,
        contentDe,
        contentEn: contentEn || contentDe,
        slug,
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Error creating news post:", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen des Beitrags" },
      { status: 500 }
    );
  }
}

