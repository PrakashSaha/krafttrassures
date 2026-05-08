import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a transporter
    // Note: Environment variables must be set in .env.local
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL_RECIPIENT || 'prakashsaha199@gmail.com',
      subject: `Kraft Treasure: New Enquiry from ${name}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <div style="font-family: 'Playfair Display', serif; padding: 40px; color: #1a1a1a; background-color: #FAF7F2;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border: 1px solid #eee;">
            <h2 style="color: #D33740; font-size: 24px; border-bottom: 2px solid #D33740; padding-bottom: 20px; margin-bottom: 30px;">New Heritage Enquiry</h2>
            
            <div style="margin-bottom: 20px;">
              <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5AB7D; margin-bottom: 5px;">Sender Details</p>
              <p style="font-size: 16px; margin: 0;"><strong>${name}</strong></p>
              <p style="font-size: 14px; color: #666; margin: 0;">${email}</p>
            </div>

            <div style="margin-bottom: 30px;">
              <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5AB7D; margin-bottom: 5px;">Message Archive</p>
              <div style="background: #FAF7F2; padding: 25px; border-left: 4px solid #C5AB7D; font-style: italic; color: #444; line-height: 1.6;">
                ${message}
              </div>
            </div>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;" />
            <p style="font-size: 11px; color: #999; text-align: center; text-transform: uppercase; letter-spacing: 1px;">Sent via Kraft Treasure Digital Archive</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Enquiry recorded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to process enquiry' }, { status: 500 });
  }
}
