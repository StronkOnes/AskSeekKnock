import { NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET() {
  try {
    const allArticles = await db.query.articles.findMany({
      orderBy: [desc(articles.createdAt)],
    });

    return NextResponse.json(allArticles);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, category, slug } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const newArticle = await db.insert(articles).values({
      authorId: session.user.id,
      title,
      content,
      category,
      slug: slug || title.toLowerCase().replace(/ /g, '-'),
    }).returning();

    return NextResponse.json(newArticle[0]);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
