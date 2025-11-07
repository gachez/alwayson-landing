// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistConfirmation, sendWaitlistNotification } from '../services/signupHandler';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send notification email to you
    await sendWaitlistNotification({
      email,
      timestamp: new Date(),
    });

    // Send confirmation email to the user
    await sendWaitlistConfirmation(email);

    // Optional: Save to database here
    // await db.waitlist.create({ data: { email, createdAt: new Date() } });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined the waitlist' 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process signup. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}