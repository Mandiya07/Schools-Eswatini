import express from 'express';
import { sendAdminNotification, sendReplyNotification } from '../services/emailService.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
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

// Notification for new inquiry
router.post('/notify/new-inquiry', async (req, res) => {
  const { schoolEmail, schoolName, previewText } = req.body;
  
  if (!schoolEmail || !schoolName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const success = await sendAdminNotification(schoolEmail, schoolName, previewText);
  res.json({ success });
});

// Notification for admin reply
router.post('/notify/reply', async (req, res) => {
  const { recipientEmail, schoolName, replyBody } = req.body;

  if (!recipientEmail || !schoolName || !replyBody) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const success = await sendReplyNotification(recipientEmail, schoolName, replyBody);
  res.json({ success });
});

// Audit Log endpoint (Server-side only)
router.post('/audit', (req, res) => {
  const { action, resource, details } = req.body;
  // In a real app, we would write to Firestore here using Admin SDK or proxy
  console.log(`[AUDIT] ${action} on ${resource}`, details);
  res.status(201).json({ success: true });
});

export default router;
