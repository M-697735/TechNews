import Badge from "../ui/Badge";

function InterestsWidget() {
  const interests = [
    "AI",
    "Cloud",
    "Frontend",
    "Backend",
    "DevOps",
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <h3 className="text-lg font-semibold">
        Interests
      </h3>

      <div className="mt-4 flex flex-wrap gap-2">

        {interests.map((item) => (
          <Badge key={item}>
            {item}
          </Badge>
        ))}

      </div>

    </div>
  );
}

export default InterestsWidget;