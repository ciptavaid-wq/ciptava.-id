import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API endpoint for Gemini-powered prompt refinement and customization
app.post('/api/enhance-prompt', async (req, res) => {
  try {
    const { category, subCategory, actor, roofType, customNotes, stage, currentPrompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        enhancedPrompt: currentPrompt,
        warning: 'GEMINI_API_KEY belum dikonfigurasi di Environment Secrets. Menggunakan prompt presisi bawaan sistem.',
        usedAI: false,
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const promptInstruction = `
You are an expert prompt engineer specializing in hyper-realistic AI timelapse video generation (Midjourney v6, Flux Schnell/Dev, Kling AI 1.5, Luma Dream Machine, Runway Gen-3).

Task: Enhance and tailor the following timelapse prompt for the stage: "${stage}".
Category: ${category}
Sub-Category/Style: ${subCategory}
Actor/Subject: ${actor}
Structural detail: ${roofType || 'Standar'}
Additional custom requirements: ${customNotes || 'None'}

Current base prompt:
"""
${currentPrompt}
"""

Rules:
1. Maintain strict architectural/physical consistency, fixed locked camera framing (same eye-level 3/4 angle, exact same zoom, aspect ratio).
2. Mandate structural integrity (no floating elements, accurate right angles, true-to-scale load bearing grid).
3. Progression logic must cleanly represent stage "${stage}".
4. Write in English as standard for Midjourney, Flux, Kling, and Luma.
5. Return ONLY the final polished prompt text, with no introductory pleasantries or markdown backticks.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptInstruction,
    });

    const enhancedText = response.text?.trim() || currentPrompt;

    res.json({
      enhancedPrompt: enhancedText,
      usedAI: true,
    });
  } catch (error: any) {
    console.error('Gemini enhance error:', error);
    res.status(200).json({
      enhancedPrompt: req.body?.currentPrompt || '',
      warning: error?.message || 'Gagal memanggil Gemini API. Menggunakan prompt presisi bawaan.',
      usedAI: false,
    });
  }
});

// Mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    app.use(express.static('dist'));
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
