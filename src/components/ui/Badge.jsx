function Badge({ icon, children }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm">
      <span>{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export default Badge;