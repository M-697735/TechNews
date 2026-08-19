import SelectionChip from "./SelectionChip";

function SelectionSection({
  title,
  subtitle,
  options,
  selectedItems,
  onToggle,
  maxSelection,
}) {
  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="text-center text-4xl font-bold">
        {title}
      </h1>

      <p className="mt-4 text-center text-zinc-400">
        {subtitle}
      </p>

      {maxSelection && (
        <p className="mt-2 text-center text-sm text-teal-400">
          {selectedItems.length} / {maxSelection} Selected
        </p>
      )}

      <div className="mt-12 flex flex-wrap justify-center gap-4">

        {options.map((item) => (
          <SelectionChip
            key={item.id}
            title={item.title}
            icon={item.icon}
            selected={selectedItems.includes(item.id)}
            onClick={() => onToggle(item.id)}
          />
        ))}

      </div>

    </div>
  );
}

export default SelectionSection;