import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validation.error.format() 
      }, { status: 400 });
    }

    const { name, email, message } = validation.data;

    const notificationProvider = process.env.NOTIFICATION_PROVIDER || 'smtp';
    const recipient = process.env.CONTACT_EMAIL_RECIPIENT || 'hello@krafttreasure.com';
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const sender = process.env.SMTP_DEFAULT_FROM || emailUser || 'system@krafttreasure.com';

    const adminMailHtml = `
        <div style="font-family: 'Playfair Display', serif; padding: 40px; color: #1a1a1a; background-color: #FAF7F2;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border: 1px solid #eee; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #000; font-size: 28px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">Kraft Treasure</h1>
              <p style="color: #8C6E3F; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; margin-top: 5px;">Internal Enquiry Alert</p>
            </div>

            <h2 style="color: #D33740; font-size: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 25px;">New Archive Inquiry</h2>
            
            <div style="margin-bottom: 25px;">
              <p style="text-transform: uppercase; font-size: 9px; font-weight: bold; letter-spacing: 2px; color: #8C6E3F; margin-bottom: 8px;">Customer Profile</p>
              <p style="font-size: 16px; margin: 0; color: #000;"><strong>${name}</strong></p>
              <p style="font-size: 14px; color: #595148; margin: 0;">${email}</p>
            </div>

            <div style="margin-bottom: 30px;">
              <p style="text-transform: uppercase; font-size: 9px; font-weight: bold; letter-spacing: 2px; color: #8C6E3F; margin-bottom: 8px;">Message Content</p>
              <div style="background: #FAF7F2; padding: 25px; border-left: 3px solid #D33740; font-style: italic; color: #3A3530; line-height: 1.7; font-size: 15px;">
                "${message}"
              </div>
            </div>

            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 10px; color: #B0A99F; text-transform: uppercase; letter-spacing: 1px;">This enquiry was captured via the Digital Archive Contact Portal.</p>
            </div>
          </div>
        </div>
    `;

    const customerMailHtml = `
        <div style="font-family: 'Playfair Display', serif; padding: 40px; color: #1a1a1a; background-color: #FAF7F2;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border: 1px solid #eee; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #000; font-size: 28px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">Kraft Treasure</h1>
              <p style="color: #8C6E3F; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; margin-top: 5px;">Tribal Handicrafts Archive</p>
            </div>

            <div style="text-align: center; margin-bottom: 35px;">
              <h2 style="color: #1a1a1a; font-size: 22px; margin-bottom: 15px;">Greetings from the Team, ${name.split(' ')[0]}</h2>
              <p style="font-size: 15px; color: #4A4540; line-height: 1.6; margin: 0;">
                Thank you for reaching out to Kraft Treasure. We have received your enquiry and our curators are currently reviewing your request.
              </p>
            </div>

            <div style="background: #FAF7F2; padding: 30px; margin-bottom: 35px; border: 1px dashed #C8C3BB;">
              <p style="text-transform: uppercase; font-size: 9px; font-weight: bold; letter-spacing: 2px; color: #8C6E3F; margin-bottom: 10px; text-align: center;">Summary of your Message</p>
              <p style="font-size: 14px; color: #595148; line-height: 1.6; margin: 0; font-style: italic; text-align: center;">
                "${message.length > 150 ? message.substring(0, 150) + '...' : message}"
              </p>
            </div>

            <div style="text-align: center; margin-bottom: 40px;">
              <p style="font-size: 14px; color: #4A4540; line-height: 1.6;">
                We aim to respond to all heritage enquiries within 24-48 hours. In the meantime, feel free to explore our latest collection arrivals.
              </p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/shop" style="display: inline-block; margin-top: 20px; background-color: #D33740; color: #ffffff; padding: 15px 35px; text-decoration: none; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Return to Collection</a>
            </div>

            <div style="text-align: center; padding-top: 30px; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #1a1a1a; margin-bottom: 5px;"><strong>Kraft Treasure Team</strong></p>
              <p style="font-size: 12px; color: #8C6E3F;">Preserving the Heritage of Arunachal Pradesh</p>
            </div>
          </div>
        </div>
    `;

    if (notificationProvider === 'console') {

      return NextResponse.json({ message: 'Enquiry recorded in console log successfully' }, { status: 200 });
    }

    if (!emailUser || !emailPass || !smtpHost) {
      console.error('CRITICAL: Email credentials or SMTP host is incomplete in environment variables.');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const adminMailOptions = {
      from: `"Kraft Treasure System" <${sender}>`,
      to: recipient,
      subject: `New Heritage Enquiry: ${name}`,
      replyTo: email,
      html: adminMailHtml,
    };

    const customerMailOptions = {
      from: `"Kraft Treasure" <${sender}>`,
      to: email,
      subject: `We've Received Your Enquiry - Kraft Treasure`,
      html: customerMailHtml,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    return NextResponse.json({ message: 'Enquiry recorded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to process enquiry' }, { status: 500 });
  }
}
