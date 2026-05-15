import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === 'success') {
      // TODO: Perform database updates here to mark user as subscribed
      // Example: 
      // await db.update(users).set({ subscriptionStatus: 'pro' }).where(eq(users.email, response.data.data.customer.email));
      
      return NextResponse.json({ status: 'Verified', data: response.data.data });
    } else {
      return NextResponse.json({ status: 'Failed', message: response.data.data.gateway_response }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Paystack verification error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
