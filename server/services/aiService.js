const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getFallbackMission } = require('../fallbackMissions');

const generateMissionWithAI = async ({ time, surroundings, energy, weather }) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemma-2-27b-it';

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key')) {
    console.log('ℹ️ GEMINI_API_KEY not configured. Utilizing curated fallback mission.');
    return getFallbackMission({ time, surroundings, energy, weather });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const systemPrompt = `You are GrassQuest, a mindful outdoor micro-quest generator designed to get people off screens and outside into nature.
Generate a calm, safe, delightful outdoor mission based on:
- Available Time: ${time}
- Surroundings: ${surroundings}
- Energy Level: ${energy}
- Current Weather: ${weather}

CRITICAL RULES:
1. Return ONLY valid raw JSON with NO markdown formatting, NO code blocks, NO triple backticks (\`\`\`json), NO explanatory text.
2. Must match exact JSON schema:
{
  "title": "A short, evocative 3-5 word title",
  "intro": "A 1-2 sentence atmospheric description encouraging the user to step outside",
  "tasks": [
    "Task 1: Actionable micro-task",
    "Task 2: Actionable micro-task",
    "Task 3: Actionable micro-task",
    "Task 4: Actionable micro-task"
  ]
}
3. Include EXACTLY 4 or 5 tasks.
4. Tasks MUST NOT require buying anything, spending money, using a screen/phone, or entering unsafe places.
5. If weather is rainy, cold, or harsh, design tasks that are short, sheltered, or safe for wet weather.
6. Keep language calm, grounded, nature-focused, and inviting.`;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();

    // Clean JSON response (strip markdown code blocks if AI included them)
    let cleanedText = responseText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleanedText);

    if (
      parsed &&
      typeof parsed.title === 'string' &&
      typeof parsed.intro === 'string' &&
      Array.isArray(parsed.tasks) &&
      parsed.tasks.length >= 4
    ) {
      return {
        title: parsed.title,
        intro: parsed.intro,
        tasks: parsed.tasks.slice(0, 5)
      };
    } else {
      console.warn('⚠️ AI response did not match expected structure. Using fallback.');
      return getFallbackMission({ time, surroundings, energy, weather });
    }
  } catch (error) {
    console.error('⚠️ AI Generation Error:', error.message);
    return getFallbackMission({ time, surroundings, energy, weather });
  }
};

module.exports = { generateMissionWithAI };
