function SpecBlock({ label, children }) {
  return (
    <div className="bg-card dark:bg-card-dark border border-grid dark:border-grid-dark border-l-[3px] border-l-red dark:border-l-red-dark rounded-sm p-4">
      <p className="font-mono text-xs text-pencil dark:text-pencil-dark mb-2">{label}</p>
      <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap">{children}</p>
    </div>
  );
}

export default function InputOutput({ inputFormat, outputFormat }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SpecBlock label="Input">{inputFormat}</SpecBlock>
      <SpecBlock label="Output">{outputFormat}</SpecBlock>
    </div>
  );
}
