function SpecBlock({ label, children }) {
  return (
    <div className="bg-card dark:bg-card-dark border border-grid dark:border-grid-dark border-l-[3px] border-l-red dark:border-l-red-dark rounded-sm p-4">
      <p className="font-mono text-xs text-pencil dark:text-pencil-dark mb-2">{label}</p>
      {children}
    </div>
  );
}

export default function Algorithm({ objective, patterns, approach, reasoning }) {
  const chips = patterns && patterns.length ? patterns : ['Not enough information given'];

  return (
    <div className="space-y-4">
      <SpecBlock label="Objective">
        <p className="text-[16.5px] leading-relaxed">{objective}</p>
      </SpecBlock>

      <SpecBlock label="Likely patterns">
        <div className="flex flex-wrap gap-2">
          {chips.map((p, i) => (
            <span
              key={i}
              className="font-mono text-xs text-red dark:text-red-dark border border-red dark:border-red-dark bg-red/5 dark:bg-red-dark/10 px-2.5 py-1 rounded-full"
            >
              {p}
            </span>
          ))}
        </div>
      </SpecBlock>

      <SpecBlock label="Recommended approach">
        <p className="text-[16.5px] leading-relaxed">{approach}</p>
      </SpecBlock>

      <SpecBlock label="Why">
        <p className="text-[16.5px] leading-relaxed">{reasoning}</p>
      </SpecBlock>
    </div>
  );
}
