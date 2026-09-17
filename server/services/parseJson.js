/**
 * Models are asked to return raw JSON, but sometimes wrap it in a code
 * fence or add a stray sentence. Extract the JSON object leniently
 * instead of failing on the first re-prompt.
 */
export function parseModelJson(text) {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();

  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  const candidate = start !== -1 && end !== -1 ? cleaned.slice(start, end + 1) : cleaned;

  try {
    return JSON.parse(candidate);
  } catch (err) {
    const error = new Error(`Model did not return valid JSON: ${err.message}`);
    error.raw = text;
    throw error;
  }
}
