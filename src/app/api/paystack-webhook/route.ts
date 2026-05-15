import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const signature = req.headers.get('x-paystack-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '')
    .update(JSON.stringify(body))
    .digest('hex');

  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = body.event;

  if (event === 'charge.success') {
    // Handle successful payment
    const { reference, customer, metadata } = body.data;
    console.log(`Payment successful for ${customer.email}. Reference: ${reference}`);
    // Update database here
  }

  return NextResponse.json({ status: 'success' });
}
