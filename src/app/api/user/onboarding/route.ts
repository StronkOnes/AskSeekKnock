import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const values = await request.json();

    await db.update(users)
      .set({
        ...values,
        isOnboarded: true,
        lastActivityAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error: any) {
    console.error('Onboarding update error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
