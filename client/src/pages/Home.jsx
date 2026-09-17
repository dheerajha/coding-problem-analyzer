import { useState } from 'react';
import ProblemInput from '../components/ProblemInput.jsx';
import ProblemStatement from '../components/ProblemStatement.jsx';
import InputOutput from '../components/InputOutput.jsx';
import Constraints from '../components/Constraints.jsx';
import Algorithm from '../components/Algorithm.jsx';
import Complexity from '../components/Complexity.jsx';
import { analyzeProblem } from '../services/api.js';

const TABS = [
  { id: 'original', label: 'Original' },
  { id: 'clean', label: 'Clean version' },
  { id: 'analysis', label: 'Full analysis' },
];

export default function Home() {
  const [input, setInput] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('original');

  async function handleSubmit() {
    const trimmed = input.trim();
    if (trimmed.split(/\s+/).filter(Boolean).length < 3) {
      setError('Paste the full problem statement first — story and all.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const data = await analyzeProblem(trimmed);
      setResult(data);
      setSubmittedText(trimmed);
      setTab('original');
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setInput('');
    setError('');
  }

  return (
    <div className="max-w-[720px] mx-auto px-6 py-14 pb-24">
      <header className="mb-11">
        <span className="inline-flex items-baseline font-mono font-bold text-[22px] tracking-tight">
          core<span className="text-red dark:text-red-dark">·</span>problem
        </span>
        <svg className="block w-[118px] h-2 mt-0.5" viewBox="0 0 118 8" aria-hidden="true">
          <path
            d="M2 5.5 C 20 1, 40 8, 60 4 S 100 1, 116 5"
            fill="none"
            stroke="currentColor"
            className="text-red dark:text-red-dark"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="italic text-pencil dark:text-pencil-dark mt-3.5 max-w-[46ch]">
          Paste the story problem. Get back the equation hiding inside it — nothing invented,
          nothing missing.
        </p>
      </header>

      <ProblemInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        onClear={handleClear}
        loading={loading}
      />

      {error && (
        <div className="mt-4 border border-red dark:border-red-dark bg-red/5 dark:bg-red-dark/10 rounded-sm p-4">
          <p>
            <strong className="text-red dark:text-red-dark">Couldn’t extract that.</strong>{' '}
            {error}
          </p>
        </div>
      )}

      {result && (
        <div className="mt-10">
          <StatLine original={result.stats.original_words} clean={result.stats.clean_words} pct={result.stats.reduction_pct} />

          <div className="flex gap-6 border-b border-grid dark:border-grid-dark mb-6">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`font-mono text-sm pb-2.5 border-b-2 -mb-px transition-colors ${
                  tab === t.id
                    ? 'text-ink dark:text-ink-dark border-red dark:border-red-dark'
                    : 'text-pencil dark:text-pencil-dark border-transparent hover:text-ink dark:hover:text-ink-dark'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'original' && (
            <p className="text-[16.5px] leading-loose text-ink-soft dark:text-ink-dark-soft whitespace-pre-wrap max-w-[68ch]">
              {submittedText}
            </p>
          )}

          {tab === 'clean' && (
            <div className="space-y-4">
              <ProblemStatement text={result.core_problem} />
              <InputOutput inputFormat={result.input_format} outputFormat={result.output_format} />
              <Constraints items={result.constraints} />
            </div>
          )}

          {tab === 'analysis' && (
            <div className="space-y-4">
              <Algorithm
                objective={result.objective}
                patterns={result.algorithm_patterns}
                approach={result.recommended_approach}
                reasoning={result.reasoning}
              />
              <Complexity time={result.time_complexity} space={result.space_complexity} />
            </div>
          )}
        </div>
      )}

      <footer className="mt-16 font-mono text-xs text-pencil dark:text-pencil-dark">
        core·problem — your pasted problem is sent to your own backend, which calls
        Google’s Gemini API. Nothing is stored.
      </footer>
    </div>
  );
}

function StatLine({ original, clean, pct }) {
  if (!original || !clean || pct <= 0) {
    return <p className="italic text-red dark:text-red-dark mb-7">Extraction complete.</p>;
  }
  return (
    <p className="italic text-red dark:text-red-dark border-l-[3px] border-red dark:border-red-dark pl-3.5 mb-7">
      <span className="font-mono not-italic font-semibold">{original.toLocaleString()} words</span>{' '}
      became <span className="font-mono not-italic font-semibold">{clean.toLocaleString()}</span> —
      a <span className="font-mono not-italic font-semibold">{pct}%</span> cut.
    </p>
  );
}
