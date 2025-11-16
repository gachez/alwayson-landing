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

    try {
    // Send notification email to you
    await sendWaitlistNotification({
      email,
      timestamp: new Date(),
    });      
    } catch (error) {
      console.error('Error sending notification email:', error);
    }

    try {
     
    // Send confirmation email to the user
    await sendWaitlistConfirmation(email); 
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }

    // Optional: Save to database here
    // await db.waitlist.create({ data: { email, createdAt: new Date() } });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined the waitlist' 
      },
      { status: 200 }
    );
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { 
        error: 'Error processing signup. Please try again.',
        details: error.message
      },
      { status: 500 }
    );
  }
}