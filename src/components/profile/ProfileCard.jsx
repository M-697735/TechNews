function ProfileCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
        {title}
      </h3>

      <p className="mt-4 text-xl font-semibold text-white">
        {value || "Not Added"}
      </p>

    </div>
  );
}

export default ProfileCard;