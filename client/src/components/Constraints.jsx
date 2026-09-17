export default function Constraints({ items }) {
  const list = items && items.length ? items : ['None given.'];

  return (
    <div className="bg-card dark:bg-card-dark border border-grid dark:border-grid-dark border-l-[3px] border-l-red dark:border-l-red-dark rounded-sm p-4">
      <p className="font-mono text-xs text-pencil dark:text-pencil-dark mb-2">Constraints</p>
      <ul className="font-mono text-sm space-y-1 pl-4 list-disc">
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
