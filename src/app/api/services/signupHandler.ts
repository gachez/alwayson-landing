import nodemailer from 'nodemailer';

export interface NewsletterSignupPayload {
  email: string;
  timestamp?: Date;
}

export async function sendWaitlistNotification({
  email,
  timestamp = new Date(),
}: NewsletterSignupPayload): Promise<{ status: number; data: string }> {
  console.log(`📧 Sending waitlist notification for ${email}...`);

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_EMAIL_USER, 
        pass: process.env.NEXT_EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
      name: 'AlwaysOn AI',
      logger: true,
      debug: false,
    });

    const formattedDate = timestamp.toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>New Waitlist Signup</title>
<style>
body{font-family:Arial,sans-serif;background:#f7f7f7;margin:0;padding:0;}
.container{max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1);}
.header{text-align:center;padding:20px 0;background:linear-gradient(to right,#7dd3fc,#a78bfa,#6366f1);border-radius:8px 8px 0 0;}
.header h1{font-size:24px;color:#fff;margin:0;}
.content{padding:30px 20px;color:#555;line-height:1.6;}
.info-box{background:#f3f4f6;padding:15px;border-radius:6px;margin:20px 0;border-left:4px solid #6366f1;}
.info-box strong{color:#333;}
.footer{text-align:center;padding:20px;font-size:13px;color:#999;border-top:1px solid #e5e7eb;}
.emoji{font-size:48px;text-align:center;margin:10px 0;}
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="emoji">🎉</div>
      <h1>New Waitlist Signup!</h1>
    </div>
    <div class="content">
      <p>Great news! Someone just joined the AlwaysOn waitlist.</p>
      
      <div class="info-box">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Signed up:</strong> ${formattedDate}</p>
      </div>

      <p>This person is interested in getting 3 months free when AlwaysOn launches. Make sure to add them to your early access list!</p>
      
      <p style="margin-top:30px;"><strong>Next steps:</strong></p>
      <ul>
        <li>Add ${email} to your email marketing platform</li>
        <li>Send them a welcome/confirmation email</li>
        <li>Keep them updated on launch progress</li>
      </ul>
    </div>
    <div class="footer">
      AlwaysOn Waitlist Notification System
    </div>
  </div>
</body>
</html>`;

    const emailResult = await transporter.sendMail({
      from: `'AlwaysOn Waitlist' <brian.gacheru@instawebai.com>`,
      to: 'briantengeza@gmail.com', // Your notification email
      subject: `🎉 New Waitlist Signup: ${email}`,
      html,
    });

    console.log(`✅ Waitlist notification sent: ${emailResult.messageId}`);
    return { status: 201, data: 'Notification sent successfully' };
  } catch (error: any) {
    console.error(`🔴 Error sending waitlist notification:`, error);
    throw error;
  }
}

// Optional: Send confirmation email to the user who signed up
export async function sendWaitlistConfirmation(
  email: string
): Promise<{ status: number; data: string }> {
  console.log(`📧 Sending confirmation email to ${email}...`);

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'brian.gacheru@instawebai.com',
        pass: process.env.EMAIL_PASS || `F"ll1ngskies1997`,
      },
      tls: { rejectUnauthorized: false },
      name: 'AlwaysOn AI',
      logger: true,
      debug: false,
    });

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Welcome to AlwaysOn</title>
<style>
body{font-family:Arial,sans-serif;background:#f7f7f7;margin:0;padding:0;}
.container{max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1);}
.header{text-align:center;padding:30px 20px;background:linear-gradient(to right,#7dd3fc,#a78bfa,#6366f1);border-radius:8px 8px 0 0;}
.header h1{font-size:28px;color:#fff;margin:10px 0 0 0;}
.content{padding:30px 20px;color:#555;line-height:1.6;}
.highlight{background:#fef3c7;padding:20px;border-radius:6px;margin:20px 0;text-align:center;}
.highlight strong{color:#92400e;font-size:18px;}
.footer{text-align:center;padding:20px;font-size:13px;color:#999;border-top:1px solid #e5e7eb;}
.emoji{font-size:64px;}
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="emoji">🚀</div>
      <h1>You're on the list!</h1>
    </div>
    <div class="content">
      <p>Thanks for joining the AlwaysOn early access waitlist!</p>
      
      <div class="highlight">
        <strong>🎁 You'll get 3 months FREE when we launch!</strong>
      </div>

      <p>We're building an AI team that works 24/7 to grow your store by:</p>
      <ul>
        <li>Boosting Average Order Value (AOV)</li>
        <li>Increasing traffic and conversions</li>
        <li>Automating marketing and SEO</li>
        <li>Creating intelligent product recommendations</li>
      </ul>

      <p>We'll notify you as soon as AlwaysOn opens for beta testers. Get ready to experience data-driven AI automation that works while you sleep!</p>

      <p style="margin-top:30px;">Stay tuned,<br><strong>The AlwaysOn Team</strong></p>
    </div>
    <div class="footer">
      You're receiving this because you signed up for AlwaysOn early access.
    </div>
  </div>
</body>
</html>`;

    const emailResult = await transporter.sendMail({
      from: `'AlwaysOn AI' <brian.gacheru@instawebai.com>`,
      to: email,
      subject: '🎉 Welcome to AlwaysOn - You\'re on the waitlist!',
      html,
    });

    console.log(`✅ Confirmation email sent to ${email}: ${emailResult.messageId}`);
    return { status: 201, data: 'Confirmation sent successfully' };
  } catch (error: any) {
    console.error(`🔴 Error sending confirmation email to ${email}:`, error);
    throw error;
  }
}