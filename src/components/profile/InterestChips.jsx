function InterestChips({ title, items = [] }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="rounded-full bg-teal-500/15 px-4 py-2 text-sm font-medium text-teal-400"
            >
              {item}
            </span>
          ))
        ) : (
          <p className="text-zinc-500">
            No data available
          </p>
        )}
      </div>
    </div>
  );
}

export default InterestChips;