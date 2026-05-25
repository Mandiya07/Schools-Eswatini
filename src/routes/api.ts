import express from 'express';
import { sendAdminNotification, sendReplyNotification, sendEmail } from '../services/emailService.js';
import { paymentGateway } from '../services/paymentService.js';
import { sendSMS } from '../services/smsService.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Infrastructure Diagnostics
router.get('/diagnostics', (req, res) => {
  const diagnostics = {
    email: {
      configured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
      host: process.env.SMTP_HOST || 'Not Set',
      from: process.env.FROM_EMAIL || 'no-reply@schoolseswatini.sz'
    },
    sms: {
      twilio: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER),
      localAggregator: !!(process.env.LOCAL_SMS_API_URL && process.env.LOCAL_SMS_API_KEY),
      mode: (process.env.LOCAL_SMS_API_URL && process.env.LOCAL_SMS_API_KEY) ? 'Local Aggregator' : (process.env.TWILIO_ACCOUNT_SID ? 'Twilio' : 'Mock Mode')
    },
    payments: {
      momo: !!(process.env.MOMO_API_USER && process.env.MOMO_API_KEY && process.env.MOMO_SUB_KEY),
      emali: "Mocked (Standard)",
      environment: process.env.MOMO_ENVIRONMENT || "sandbox"
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime()
    }
  };
  res.json(diagnostics);
});

// Performance Stats (Mock for now)
router.get('/stats', (req, res) => {
  res.json({
    activeUsers: 1250,
    institutions: 450,
    avgResponseTime: '45ms',
    uptime: '99.99%'
  });
});

// Notifications
router.post('/notify/new-inquiry', async (req, res) => {
  const { schoolEmail, schoolName, previewText } = req.body;
  if (!schoolEmail || !schoolName) return res.status(400).json({ error: 'Missing required fields' });
  const success = await sendAdminNotification(schoolEmail, schoolName, previewText);
  res.json({ success });
});

router.post('/notify/reply', async (req, res) => {
  const { recipientEmail, schoolName, replyBody } = req.body;
  if (!recipientEmail || !schoolName || !replyBody) return res.status(400).json({ error: 'Missing required fields' });
  const success = await sendReplyNotification(recipientEmail, schoolName, replyBody);
  res.json({ success });
});

router.post('/notify/blast', async (req, res) => {
  const { type, recipients, message, subject } = req.body;
  // expects recipients to be an array of objects: { phone?: string, email?: string }
  if (!type || !recipients || !message) return res.status(400).json({ error: 'Missing required fields' });
  
  let successCount = 0;
  for (const recipient of recipients) {
    let success = false;
    if (type === 'sms' || type === 'both') {
      if (recipient.phone) {
        success = await sendSMS(recipient.phone, message);
      }
    }
    if (type === 'email' || type === 'both') {
      if (recipient.email) {
        const emailSuccess = await sendEmail(recipient.email, subject || 'Important Notification', message);
        success = success || emailSuccess;
      }
    }
    if (success) successCount++;
  }

  res.json({ success: true, count: successCount, total: recipients.length });
});

// Payment Gateway Routes
router.post('/payments/initialize', async (req, res) => {
  try {
    const { amount, reference, description, customerEmail, customerPhone } = req.body;
    
    // In a real scenario, validate that the user is authenticated (e.g. check standard session/auth tokens)
    if (!amount || !reference) {
      return res.status(400).json({ error: 'Amount and reference are required' });
    }

    const paymentResponse = await paymentGateway.initializePayment({
      amount,
      currency: 'SZL', // Swazi Lilangeni
      reference,
      description,
      customerEmail,
      customerPhone,
      redirectUrl: `${req.protocol}://${req.get('host')}/payment/success`
    });

    // In a real app, you might save `paymentResponse.transactionId` to your database
    // to map against `reference` for webhook reconciliation.

    res.json(paymentResponse);
  } catch (error) {
    console.error('[PAYMENT_INIT_ERROR]', error);
    res.status(500).json({ error: 'Failed to initialize payment' });
  }
});

// Payment Webhook (Where the provider sends server-to-server confirmation)
router.post('/payments/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-payment-signature'] as string;
    const rawBody = req.body.toString('utf8');

    // Secure verification
    if (!paymentGateway.verifyWebhookSignature(rawBody, signature)) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const payload = JSON.parse(rawBody);
    
    console.log(`[WEBHOOK] Payment ${payload.status} for Ref: ${payload.reference}`);

    // Update database here with Admin SDK
    // Eg. await firestoreAdmin.collection('transactions').doc(payload.reference).update({ status: payload.status });

    res.json({ received: true });
  } catch (error) {
    console.error('[WEBHOOK_ERROR]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Audit Log endpoint (Server-side only)
router.post('/audit', (req, res) => {
  const { action, resource, details } = req.body;
  console.log(`[AUDIT] ${action} on ${resource}`, details);
  res.status(201).json({ success: true });
});

export default router;
