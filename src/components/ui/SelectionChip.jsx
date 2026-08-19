import { Check } from "lucide-react";

function SelectionChip({
  title,
  icon,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
        selected
          ? "border-teal-500 bg-teal-500 text-black"
          : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-teal-400 hover:text-white"
      }`}
    >
      {selected && <Check size={16} />}

      {icon && <span>{icon}</span>}

      <span>{title}</span>
    </button>
  );
}

export default SelectionChip;