import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const post = await prisma.newsPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

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
  const { titleDe, titleEn, contentDe, contentEn, slug, published } = body;

  try {
    // Check if slug already exists (for different post)
    if (slug) {
      const existingPost = await prisma.newsPost.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });

      if (existingPost) {
        return NextResponse.json(
          { error: "Ein Beitrag mit diesem Slug existiert bereits" },
          { status: 409 }
        );
      }
    }

    const currentPost = await prisma.newsPost.findUnique({
      where: { id },
    });

    if (!currentPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = await prisma.newsPost.update({
      where: { id },
      data: {
        ...(titleDe !== undefined && { titleDe }),
        ...(titleEn !== undefined && { titleEn }),
        ...(contentDe !== undefined && { contentDe }),
        ...(contentEn !== undefined && { contentEn }),
        ...(slug !== undefined && { slug }),
        ...(published !== undefined && {
          published,
          publishedAt: published && !currentPost.published ? new Date() : currentPost.publishedAt,
        }),
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
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
    await prisma.newsPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

