import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import NewsDetailContent from "@/components/news/NewsDetailContent";
import prisma from "@/lib/prisma";

interface NewsDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

async function getPost(slug: string) {
  try {
    const post = await prisma.newsPost.findUnique({
      where: { slug, published: true },
      select: {
        id: true,
        slug: true,
        titleDe: true,
        titleEn: true,
        contentDe: true,
        contentEn: true,
        publishedAt: true,
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function getRelatedPosts(currentSlug: string) {
  try {
    const posts = await prisma.newsPost.findMany({
      where: { 
        slug: { not: currentSlug },
        published: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 2,
      select: {
        id: true,
        slug: true,
        titleDe: true,
        titleEn: true,
        contentDe: true,
        contentEn: true,
        publishedAt: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: "Beitrag nicht gefunden",
    };
  }

  const title = locale === "de" ? post.titleDe : post.titleEn;

  return {
    title: title,
    description: locale === "de" ? post.contentDe.slice(0, 160) : post.contentEn.slice(0, 160),
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (exclude current)
  const relatedPosts = await getRelatedPosts(slug);

  // Transform the post data for the component
  const transformedPost = {
    ...post,
    publishedAt: post.publishedAt,
  };

  const transformedRelatedPosts = relatedPosts.map(p => ({
    ...p,
    publishedAt: p.publishedAt,
  }));

  return <NewsDetailContent post={transformedPost} relatedPosts={transformedRelatedPosts} />;
}
