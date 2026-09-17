export const EXTRACTION_SCHEMA = `{
  "core_problem": "string, 2-5 sentences, the story-free computational statement",
  "input_format": "string, the exact input format, one line per input line",
  "output_format": "string, the exact output requirement",
  "constraints": ["string", "..."],
  "objective": "string, one sentence: what must be minimized/maximized/computed",
  "operations": ["string describing an allowed operation", "..."]
}`;

export function buildExtractionPrompt(problemText) {
  return `You are a competitive programming problem parser. Your task is to transform a verbose coding problem into its essential algorithmic specification.

Rules:
1. Remove story, character names, narrative, motivation, unnecessary context, and decorative language.
2. Preserve every condition that affects the solution.
3. Do NOT change numerical values.
4. Do NOT remove edge cases.
5. Do NOT invent missing constraints.
6. Extract the exact input format.
7. Extract the exact output requirement.
8. Extract all constraints, each as its own short line.
9. Rewrite the problem as a concise mathematical/computational statement.
10. Identify the objective that must be optimized or computed.
11. List the concrete operations the problem allows (if any), in plain language.

If the problem does not give enough information for a field, write "Not enough information given" for that field rather than guessing.

Reply with ONLY a JSON object, no markdown code fences, no preamble or commentary, matching exactly this shape:
${EXTRACTION_SCHEMA}

Problem:
"""
${problemText}
"""`;
}
