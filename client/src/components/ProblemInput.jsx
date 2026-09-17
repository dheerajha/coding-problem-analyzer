function wordCount(str) {
  const trimmed = str.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export default function ProblemInput({ value, onChange, onSubmit, onClear, loading }) {
  const count = wordCount(value);

  return (
    <div className="bg-card dark:bg-card-dark border border-grid dark:border-grid-dark rounded-sm shadow-sm p-1">
      <label htmlFor="problem-input" className="sr-only">
        Paste your coding problem
      </label>
      <textarea
        id="problem-input"
        className="notebook-textarea w-full min-h-[220px] resize-y bg-transparent outline-none px-4 pt-4 pb-3 text-[16.5px] leading-[1.75] placeholder:text-pencil dark:placeholder:text-pencil-dark placeholder:opacity-75"
        placeholder={
          'Rahul is preparing for a marathon. Every morning he visits a park with N checkpoints arranged in a line…\n\n(paste the full problem, story and all — the messier the better)'
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex items-center justify-between gap-4 flex-wrap px-3.5 pb-3.5">
        <span className="font-mono text-xs text-pencil dark:text-pencil-dark">
          {count === 1 ? '1 word' : `${count.toLocaleString()} words`}
        </span>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onClear}
            className="font-mono text-xs border border-grid dark:border-grid-dark text-pencil dark:text-pencil-dark hover:text-ink dark:hover:text-ink-dark hover:border-pencil px-4 py-2.5 rounded-sm transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="font-mono text-sm font-semibold bg-ink dark:bg-ink-dark text-paper dark:text-paper-dark border border-ink dark:border-ink-dark px-5 py-2.5 rounded-sm transition-transform hover:-translate-y-px disabled:opacity-55 disabled:translate-y-0 disabled:cursor-default"
          >
            {loading ? 'Extracting…' : 'Extract problem'}
          </button>
        </div>
      </div>
    </div>
  );
}
