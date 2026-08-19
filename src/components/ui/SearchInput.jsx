import { Search } from "lucide-react";

function SearchInput({
  value = "",
  onChange,
  placeholder = "Search news, jobs, hackathons, courses...",
}) {
  return (
    <div className="relative w-full max-w-2xl">

      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900
          pl-12
          pr-20
          text-white
          placeholder:text-zinc-500
          outline-none
          transition-all
          duration-300
          focus:border-teal-500
          focus:ring-2
          focus:ring-teal-500/20
        "
      />

      <div
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          rounded-md
          border
          border-zinc-700
          bg-zinc-800
          px-2
          py-1
          text-xs
          text-zinc-400
        "
      >
        Ctrl K
      </div>

    </div>
  );
}

export default SearchInput;