import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sermons } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const sermonNotes = await db.query.sermons.findMany({
      where: eq(sermons.userId, session.user.id),
      orderBy: [desc(sermons.createdAt)],
    });

    return NextResponse.json(sermonNotes);
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

    const { title, topic, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const newSermon = await db.insert(sermons).values({
      userId: session.user.id,
      title,
      topic,
      content,
    }).returning();

    return NextResponse.json(newSermon[0]);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
