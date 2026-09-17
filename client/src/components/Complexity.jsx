export default function Complexity({ time, space }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="bg-card dark:bg-card-dark border border-grid dark:border-grid-dark border-l-[3px] border-l-red dark:border-l-red-dark rounded-sm p-4">
        <p className="font-mono text-xs text-pencil dark:text-pencil-dark mb-2">Time</p>
        <p className="font-mono text-sm">{time}</p>
      </div>
      <div className="bg-card dark:bg-card-dark border border-grid dark:border-grid-dark border-l-[3px] border-l-red dark:border-l-red-dark rounded-sm p-4">
        <p className="font-mono text-xs text-pencil dark:text-pencil-dark mb-2">Space</p>
        <p className="font-mono text-sm">{space}</p>
      </div>
    </div>
  );
}
