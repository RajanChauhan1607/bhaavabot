import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!process.env.GEMINI_API_KEY) {
      return null;
    }
    if (!aiClient) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'Bhaavabot' });
  });

  // Bhaavabot Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const ai = getGeminiClient();

      if (ai) {
        try {
          const systemInstruction = `You are Bhaavabot, a gentle, wise, warm, and friendly forest spirit companion. You reside in a tranquil sunlit meadow surrounded by ancient whispering pines, clear babbling streams, and soft moss.
Your purpose is to offer a peaceful, soothing presence to the user. You listen deeply, speak with gentle warmth, and use soothing nature metaphors (trees, streams, moss, morning sun, gentle breezes, raindrops).
When the user shares worries, fatigue, burnout, stress, or seeks calm, offer a reassuring conversational reply (2-4 gentle sentences) AND a "Gentle Reminder" containing an uplifting, grounding one-to-two sentence mindfulness thought.

You MUST respond strictly with valid JSON conforming to this schema:
{
  "reply": "Your gentle response as Bhaavabot",
  "gentleReminder": {
    "title": "Gentle Reminder",
    "text": "A brief 1-2 sentence grounding metaphor or mindfulness quote"
  }
}
If no reminder is needed for a simple greeting, you may omit gentleReminder or provide an encouraging one.`;

          const contents = [
            {
              role: 'user',
              parts: [{ text: `User says: "${message}"` }],
            },
          ];

          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: contents as any,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          });

          const rawText = response.text || '';
          try {
            const parsed = JSON.parse(rawText);
            return res.json({
              reply: parsed.reply || "Take a slow, gentle breath. I'm right here with you in the quiet meadow.",
              gentleReminder: parsed.gentleReminder || null,
            });
          } catch (jsonErr) {
            return res.json({
              reply: rawText,
              gentleReminder: {
                title: "Gentle Reminder",
                text: "Even the tallest ancient trees start as small seeds. It's okay to grow slowly today.",
              },
            });
          }
        } catch (geminiErr: any) {
          console.warn('Gemini call error, using peaceful fallback:', geminiErr?.message);
        }
      }

      // Peaceful offline fallback matching Bhaavabot spirit persona
      const lower = message.toLowerCase();
      let reply = "Take a deep breath. Imagine the gentle rustle of leaves above you. Let's sit by the stream for a while. What's the heaviest thing on your mind right now?";
      let reminder: { title: string; text: string } | null = {
        title: "Gentle Reminder",
        text: "Even the tallest ancient trees start as small seeds. It's okay to grow slowly today.",
      };

      if (lower.includes('overwhelm') || lower.includes('stress') || lower.includes('work') || lower.includes('tired') || lower.includes('busy')) {
        reply = "I hear you, dear friend. When the forest winds blow hard, the willow bends gracefully rather than breaking. Let your shoulders soften and your breathing slow down. You don't have to carry the entire world right now.";
        reminder = {
          title: "Gentle Reminder",
          text: "Rest is not a reward for finished work; it is the fertile soil where all future strength grows.",
        };
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        reply = "Hello there! It's a peaceful day here in the meadow. The morning dew is fresh on the moss, and the sunlight is golden. How are you feeling today?";
        reminder = {
          title: "Quiet Reflection",
          text: "Giving yourself permission to pause is a quiet act of kindness.",
        };
      } else if (lower.includes('thank')) {
        reply = "You are so warmly welcome. Like a canopy sheltering against a sudden shower, I'll always be here resting gently on your digital desk whenever you need a moment of peace.";
        reminder = null;
      } else if (lower.includes('anxious') || lower.includes('worry') || lower.includes('fear') || lower.includes('scared')) {
        reply = "Place your hand softly on your chest and feel the steady rhythm of your heartbeat. Thoughts are like passing clouds across the meadow sky—you don't have to catch every one; you can simply watch them drift away.";
        reminder = {
          title: "Grounding Breath",
          text: "Breathe in peace like cool pine air, breathe out tension like falling autumn leaves.",
        };
      } else if (lower.includes('sleep') || lower.includes('night') || lower.includes('rest')) {
        reply = "The sun has set behind the distant hills, and the crickets are singing their soft lullaby. Wrap yourself in cozy thoughts and let the day rest.";
        reminder = {
          title: "Evening Hearth",
          text: "Tonight, leave yesterday's questions to the stars and allow your mind to slumber peacefully.",
        };
      }

      return res.json({
        reply,
        gentleReminder: reminder,
      });
    } catch (err: any) {
      console.error('Server chat error:', err);
      res.status(500).json({
        reply: "The forest breeze is quiet today. Let's take a calm breath together.",
        gentleReminder: {
          title: "Gentle Reminder",
          text: "Be gentle with yourself. You are doing the best you can in this moment.",
        },
      });
    }
  });

  // Vite middleware in dev or static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bhaavabot server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
