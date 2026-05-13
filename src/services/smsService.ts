import axios from 'axios';

// Generic SMS Interface that can be extended for local aggregators (e.g., Clickatell, BulkSMS)
export async function sendSMS(phoneNumber: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  
  const LOCAL_AGGREGATOR_URL = process.env.LOCAL_SMS_API_URL;
  const LOCAL_AGGREGATOR_KEY = process.env.LOCAL_SMS_API_KEY;

  if (LOCAL_AGGREGATOR_URL && LOCAL_AGGREGATOR_KEY) {
    try {
      // Example integration for a local Eswatini SMS Aggregator
      await axios.post(LOCAL_AGGREGATOR_URL, {
        to: phoneNumber,
        message: message,
        apiKey: LOCAL_AGGREGATOR_KEY
      });
      console.log(`[SMS Aggregator] SMS sent to ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('[SMS Aggregator] Failed to send SMS:', error);
      return false;
    }
  } else if (accountSid && authToken && fromNumber) {
    try {
      // Fallback to Twilio via basic auth POST
      const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
      await axios.post(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, 
        new URLSearchParams({
          To: phoneNumber,
          From: fromNumber,
          Body: message
        }).toString(),
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      console.log(`[Twilio] SMS sent to ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error('[Twilio] Failed to send SMS:', error);
      return false;
    }
  } else {
    // Mock Mode
    console.log('--- MOCK SMS NOTIFICATION ---');
    console.log('To:', phoneNumber);
    console.log('Message:', message);
    console.log('-----------------------------');
    return true; // Success in mock mode
  }
}
