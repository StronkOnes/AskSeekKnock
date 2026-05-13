import { NextResponse } from 'next/server';
import { db } from '@/db';
import { messages } from '@/db/schema';
import { or, eq, desc } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userMessages = await db.query.messages.findMany({
      where: or(
        eq(messages.senderId, session.user.id),
        eq(messages.receiverId, session.user.id)
      ),
      orderBy: [desc(messages.sentAt)],
      with: {
        // You would normally join with users here to get names
      }
    });

    return NextResponse.json(userMessages);
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

    const { receiverId, content } = await request.json();

    if (!receiverId || !content) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const newMessage = await db.insert(messages).values({
      senderId: session.user.id,
      receiverId,
      content,
    }).returning();

    return NextResponse.json(newMessage[0]);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
