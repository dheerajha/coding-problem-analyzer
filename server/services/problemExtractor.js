import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildExtractionPrompt } from '../prompts/extractionPrompt.js';
import { parseModelJson } from './parseJson.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

/**
 * Stage 1 — Problem Extraction.
 * Messy problem -> clean specification (core_problem, input, output,
 * constraints, objective, operations). Does not touch algorithm choice.
 */
export async function extractProblem(problemText) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 1200,
    },
  });

  const result = await model.generateContent(buildExtractionPrompt(problemText));
  const text = result.response.text();

  if (!text) {
    throw new Error('Model returned no text content during extraction.');
  }

  const data = parseModelJson(text);

  return {
    core_problem: data.core_problem ?? 'Not enough information given',
    input_format: data.input_format ?? 'Not enough information given',
    output_format: data.output_format ?? 'Not enough information given',
    constraints: Array.isArray(data.constraints) ? data.constraints : [],
    objective: data.objective ?? 'Not enough information given',
    operations: Array.isArray(data.operations) ? data.operations : [],
  };
}
