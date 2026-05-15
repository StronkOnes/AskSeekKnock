import { NextResponse } from 'next/server';
import { db } from '@/db';
import { personalTemplates } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const templates = await db.query.personalTemplates.findMany({
      where: eq(personalTemplates.userId, session.user.id),
    });

    return NextResponse.json(templates);
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

    const { title, description, icon, points } = await request.json();

    if (!title || !points) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const newTemplate = await db.insert(personalTemplates).values({
      userId: session.user.id,
      title,
      description,
      icon,
      points: JSON.stringify(points),
    }).returning();

    return NextResponse.json(newTemplate[0]);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
