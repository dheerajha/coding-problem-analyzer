export const ALGORITHM_SCHEMA = `{
  "algorithm_patterns": ["string", "..."],
  "recommended_approach": "string, 1-3 sentences",
  "reasoning": "string, 1-3 sentences on why these patterns fit the constraints",
  "time_complexity": "string, e.g. O(N log N), or 'Not enough information given'",
  "space_complexity": "string, e.g. O(N), or 'Not enough information given'"
}`;

export function buildAlgorithmPrompt(extraction) {
  const { core_problem, input_format, output_format, constraints, objective, operations } =
    extraction;

  return `You are a competitive programming algorithm analyst. You are given a clean, story-free problem specification (already extracted from the original prose). Decide which algorithmic pattern(s) fit, and why.

Rules:
1. Suggest an algorithm or pattern only when it can be inferred reliably from the constraints, operations, and objective given.
2. Do NOT invent a pattern, or a time/space complexity, if there is not enough information — write "Not enough information given" instead.
3. Base your complexity estimate on the stated constraints (e.g. N \u2264 20 suggests exponential/bitmask is fine; N \u2264 2\u00d710^5 suggests O(N log N) or better; N \u2264 10^9 suggests a closed-form or logarithmic solution is likely needed).
4. Keep reasoning concrete and tied to the specific constraints/operations given, not generic advice.

Specification:
Core problem: ${core_problem}
Input: ${input_format}
Output: ${output_format}
Constraints: ${Array.isArray(constraints) ? constraints.join('; ') : constraints}
Objective: ${objective}
Operations: ${Array.isArray(operations) ? operations.join('; ') : operations || 'none stated'}

Reply with ONLY a JSON object, no markdown code fences, no preamble or commentary, matching exactly this shape:
${ALGORITHM_SCHEMA}`;
}
