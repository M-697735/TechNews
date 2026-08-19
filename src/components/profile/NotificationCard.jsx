function NotificationCard({ notifications = {} }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Notification Preferences
      </h3>

      <div className="space-y-4">

        {Object.entries(notifications).length ? (
          Object.entries(notifications).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between"
            >
              <span className="capitalize text-zinc-300">
                {key.replace(/([A-Z])/g, " $1")}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  value
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {value ? "Enabled" : "Disabled"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-zinc-500">
            No notification preferences found.
          </p>
        )}

      </div>

    </div>
  );
}

export default NotificationCard;