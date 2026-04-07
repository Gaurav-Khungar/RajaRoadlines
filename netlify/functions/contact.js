/**
 * Raja Roadlines — Contact Form Handler
 * Netlify Function: receives form POST, sends email via Gmail SMTP
 *
 * Environment variables to set in Netlify dashboard (never in code):
 *   GMAIL_USER         → rajaroadlinesaurangabad@gmail.com
 *   GMAIL_APP_PASSWORD → 16-character Gmail App Password (not your login password)
 */

const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse form data
  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  const { name, company, phone, email, service, from_location, to_location, message } = data;

  // Basic validation
  if (!name || !phone) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name and phone are required' })
    };
  }

  // Build email body
  const emailText = `
NEW ENQUIRY — RAJA ROADLINES WEBSITE
======================================

Name:         ${name}
Company:      ${company || '—'}
Phone:        ${phone}
Email:        ${email || '—'}
Service:      ${service || '—'}
From:         ${from_location || '—'}
To:           ${to_location || '—'}

Message:
${message || '(No message provided)'}

======================================
Sent from: rajaroadlines.in contact form
`;

  const emailHtml = `
<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
  <div style="background:#CC2222;padding:20px 24px;">
    <h2 style="color:#fff;margin:0;font-size:18px;">New Enquiry — Raja Roadlines</h2>
  </div>
  <div style="background:#f9f9f9;padding:24px;border:1px solid #ddd;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#666;width:120px;">Name</td><td style="padding:8px 0;font-weight:bold;color:#111;">${name}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Company</td><td style="padding:8px 0;color:#111;">${company || '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;font-weight:bold;color:#CC2222;"><a href="tel:${phone}" style="color:#CC2222;">${phone}</a></td></tr>
      <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;color:#111;">${email || '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Service</td><td style="padding:8px 0;color:#111;">${service || '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">From</td><td style="padding:8px 0;color:#111;">${from_location || '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">To</td><td style="padding:8px 0;color:#111;">${to_location || '—'}</td></tr>
    </table>
    ${message ? `<div style="margin-top:16px;padding:14px;background:#fff;border-left:3px solid #CC2222;font-size:14px;color:#333;">${message}</div>` : ''}
  </div>
  <div style="padding:12px 24px;background:#eee;font-size:11px;color:#999;">
    Sent from rajaroadlines.in contact form
  </div>
</div>`;

  // Send via Gmail SMTP
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Raja Roadlines Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email || phone,
      subject: `New Enquiry from ${name}${company ? ' (' + company + ')' : ''} — Raja Roadlines`,
      text: emailText,
      html: emailHtml
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true })
    };

  } catch (err) {
    console.error('Email send error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email. Please call us directly.' })
    };
  }
};
