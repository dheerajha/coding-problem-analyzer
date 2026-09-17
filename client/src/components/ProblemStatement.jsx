export default function ProblemStatement({ text }) {
  return (
    <div className="bg-card dark:bg-card-dark border border-grid dark:border-grid-dark border-l-[3px] border-l-red dark:border-l-red-dark rounded-sm p-4">
      <p className="font-mono text-xs text-pencil dark:text-pencil-dark mb-2">Core problem</p>
      <p className="text-[16.5px] leading-relaxed">{text}</p>
    </div>
  );
}
