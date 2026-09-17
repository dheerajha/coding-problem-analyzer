import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildAlgorithmPrompt } from '../prompts/algorithmPrompt.js';
import { parseModelJson } from './parseJson.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

/**
 * Stage 2 — Algorithm Analysis.
 * Clean specification -> likely pattern(s), approach, reasoning, complexity.
 * Kept separate from extraction so you can tell whether an error happened
 * during understanding the problem or during solving it.
 */
export async function analyzeAlgorithm(extraction) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 800,
    },
  });

  const result = await model.generateContent(buildAlgorithmPrompt(extraction));
  const text = result.response.text();

  if (!text) {
    throw new Error('Model returned no text content during algorithm analysis.');
  }

  const data = parseModelJson(text);

  return {
    algorithm_patterns: Array.isArray(data.algorithm_patterns) ? data.algorithm_patterns : [],
    recommended_approach: data.recommended_approach ?? 'Not enough information given',
    reasoning: data.reasoning ?? 'Not enough information given',
    time_complexity: data.time_complexity ?? 'Not enough information given',
    space_complexity: data.space_complexity ?? 'Not enough information given',
  };
}
