// routes/support.js
const express = require('express');
const OpenAI  = require('openai');
const router  = express.Router();

// Initialize OpenAI with error handling
let openai;
try {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
} catch (error) {
  console.error('[Support] Error initializing OpenAI:', error);
}

// Pre-built admin contact text
const ADMIN_CONTACTS = `
If your account is locked or you need admin assistance, you can contact admin through:
Email: https://mail.google.com/mail/?view=cm&fs=1&to=rushelbit17@gmail.com
Phone: +94 766902338
WhatsApp: https://wa.me/qr/T3SKJNU7JK2XC1

Our admin team is available during business hours and will assist you as soon as possible.
`.trim();

router.post('/', async (req, res) => {
  const { message = '' } = req.body;
  console.log('[Support] incoming:', message);

  // Check if OpenAI is properly initialized
  if (!openai || !process.env.OPENAI_API_KEY) {
    console.error('[Support] OpenAI not properly initialized - missing API key');
    return res.status(500).json({
      reply: 'Sorry, the AI support system is not properly configured. Please contact admin directly.'
    });
  }

  // Enhanced lock-word detection
  if (/lock|locking|locked|blocked|restrict|restricted|access denied|cant access|can't access|unable to access/i.test(message)) {
    console.log('[Support] detected access-related keyword, returning admin contacts');
    return res.json({ reply: ADMIN_CONTACTS });
  }

  // Call OpenAI
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
You are a friendly support assistant for TeamSync, a team collaboration platform. 
Your role is to help users with general questions about the platform.
Some key points:
- Be concise but helpful
- If users mention account access issues, those are handled separately
- Focus on helping with navigation, features, and general usage
- If unsure, guide users to contact admin
          `.trim()
        },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    const aiReply = completion.choices?.[0]?.message?.content?.trim();
    if (!aiReply) {
      throw new Error('No response from AI');
    }

    console.log('[Support] AI replied:', aiReply);
    return res.json({ reply: aiReply });

  } catch (err) {
    console.error('[Support] AI error:', err.message || err);

    // More specific error handling
    if (err.code === 'insufficient_quota') {
      return res.status(500).json({
        reply: 'Our AI support system is currently at capacity. Please try again later or contact admin directly.'
      });
    }

    if (err.code === 'invalid_api_key') {
      return res.status(500).json({
        reply: 'The AI support system is not properly configured. Please contact admin.'
      });
    }

    // Generic fallback
    return res.status(500).json({
      reply: 'I apologize, but I am temporarily unable to process your request. Please try again or contact admin if the issue persists.'
    });
  }
});

module.exports = router;
