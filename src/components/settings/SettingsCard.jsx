function SettingsCard({
  title,
  description,
  children,
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-zinc-400">
          {description}
        </p>
      )}

      <div className="mt-6">
        {children}
      </div>

    </div>
  );
}

export default SettingsCard;