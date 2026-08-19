function DeadlineWidget() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <h3 className="text-lg font-semibold">
        Upcoming Deadlines
      </h3>

      <div className="mt-5 space-y-4">

        <div>

          <p className="font-medium">
            Smart India Hackathon
          </p>

          <p className="text-sm text-zinc-500">
            Ends in 3 days
          </p>

        </div>

        <div>

          <p className="font-medium">
            Google Internship
          </p>

          <p className="text-sm text-zinc-500">
            Ends in 5 days
          </p>

        </div>

      </div>

    </div>
  );
}

export default DeadlineWidget;