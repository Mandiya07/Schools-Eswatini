import nodemailer from 'nodemailer';

let transporter: any = null;

function getTransporter() {
  if (!transporter) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.warn('SMTP credentials not configured. Email notifications will be logged to console.');
      return null;
    }

    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendAdminNotification(schoolEmail: string, schoolName: string, messagePreviewText: string) {
  const mailOptions = {
    from: `"Schools Eswatini" <${process.env.FROM_EMAIL || 'no-reply@schoolseswatini.sz'}>`,
    to: schoolEmail,
    subject: `New Inquiry for ${schoolName}`,
    text: `You have received a new inquiry on Schools Eswatini.\n\nPreview: "${messagePreviewText}"\n\nLogin to your dashboard to view the full message and reply: https://schoolseswatini.sz/portal`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #1e293b;">New Inquiry Received</h2>
        <p style="color: #475569;">Hello <strong>${schoolName} Admin</strong>,</p>
        <p style="color: #475569;">You have received a new inquiry on the Schools Eswatini platform.</p>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
          <p style="margin: 0; color: #1e293b; font-style: italic;">"${messagePreviewText}..."</p>
        </div>
        <p style="color: #475569;">Login to your dashboard to reply and manage this inquiry.</p>
        <a href="https://schoolseswatini.sz/portal" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 10px;">Open Admin Dashboard</a>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="font-size: 12px; color: #94a3b8;">This is an automated notification from Schools Eswatini. Please do not reply directly to this email.</p>
      </div>
    `,
  };

  const client = getTransporter();
  if (client) {
    try {
      await client.sendMail(mailOptions);
      console.log(`Notification email sent to ${schoolEmail}`);
      return true;
    } catch (error) {
      console.error('Failed to send notification email:', error);
      return false;
    }
  } else {
    console.log('--- MOCK EMAIL NOTIFICATION ---');
    console.log('To:', schoolEmail);
    console.log('Subject:', mailOptions.subject);
    console.log('Body:', mailOptions.text);
    console.log('-------------------------------');
    return true; // Success in mock mode
  }
}

export async function sendReplyNotification(recipientEmail: string, schoolName: string, replyBody: string) {
  const mailOptions = {
    from: `"Schools Eswatini" <${process.env.FROM_EMAIL || 'no-reply@schoolseswatini.sz'}>`,
    to: recipientEmail,
    subject: `Reply from ${schoolName}`,
    text: `You have received a reply to your inquiry from ${schoolName}.\n\nMessage: "${replyBody}"\n\nLogin to the dashboard to view more: https://schoolseswatini.sz/auth`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #1e293b;">Message from ${schoolName}</h2>
        <p style="color: #475569;">Hello,</p>
        <p style="color: #475569;">The administration at <strong>${schoolName}</strong> has replied to your inquiry.</p>
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
          <p style="margin: 0; color: #1e293b;">${replyBody}</p>
        </div>
        <p style="color: #475569;">If you need further assistance, please contact the school directly or visit their profile on our platform.</p>
        <a href="https://schoolseswatini.sz" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 10px;">Visit Schools Eswatini</a>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="font-size: 12px; color: #94a3b8;">This is an automated notification from Schools Eswatini.</p>
      </div>
    `,
  };

  const client = getTransporter();
  if (client) {
    try {
      await client.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Failed to send reply email:', error);
      return false;
    }
  } else {
    console.log('--- MOCK EMAIL REPLY ---');
    console.log('To:', recipientEmail);
    console.log('Subject:', mailOptions.subject);
    console.log('Body:', mailOptions.text);
    console.log('-------------------------------');
    return true;
  }
}
