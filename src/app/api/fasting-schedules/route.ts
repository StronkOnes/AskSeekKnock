import { NextResponse } from 'next/server';
import { db } from '@/db';
import { fastingSchedules } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const schedules = await db.query.fastingSchedules.findMany({
      where: eq(fastingSchedules.userId, session.user.id),
      orderBy: [desc(fastingSchedules.startDate)],
    });

    return NextResponse.json(schedules);
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

    const { title, startDate, endDate, notes } = await request.json();

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const newSchedule = await db.insert(fastingSchedules).values({
      userId: session.user.id,
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      notes,
    }).returning();

    return NextResponse.json(newSchedule[0]);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
