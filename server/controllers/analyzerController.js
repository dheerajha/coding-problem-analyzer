import { extractProblem } from '../services/problemExtractor.js';
import { analyzeAlgorithm } from '../services/algorithmAnalyzer.js';

function wordCount(str) {
  const trimmed = (str || '').trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export async function analyzeProblem(req, res) {
  const { problem } = req.body || {};

  if (typeof problem !== 'string' || wordCount(problem) < 3) {
    return res.status(400).json({
      error: 'Provide the full problem statement (at least a few words) as "problem" in the request body.',
    });
  }

  try {
    // Stage 1: understand the problem (strip narrative, extract spec)
    const extraction = await extractProblem(problem);

    // Stage 2: solve the problem (pattern, approach, complexity)
    const analysis = await analyzeAlgorithm(extraction);

    const originalWords = wordCount(problem);
    const cleanWords = wordCount(extraction.core_problem);
    const reductionPct =
      originalWords > 0 ? Math.round((1 - cleanWords / originalWords) * 100) : 0;

    res.json({
      ...extraction,
      ...analysis,
      stats: {
        original_words: originalWords,
        clean_words: cleanWords,
        reduction_pct: Math.max(0, reductionPct),
      },
    });
  } catch (err) {
    // Distinguishing the two stages here is exactly why they're separate
    // service calls: the error message says which one failed.
    console.error('Analyze failed:', err.message);
    res.status(502).json({
      error: 'Could not analyze the problem right now.',
      detail: err.message,
    });
  }
}
