import InterestsWidget from "../widgets/InterestsWidget";
import DeadlineWidget from "../widgets/DeadlineWidget";
import StreakWidget from "../widgets/StreakWidget";
import QuoteWidget from "../widgets/QuoteWidget";

function RightSideBar() {
  return (
    <aside className="hidden w-[340px] shrink-0 border-l border-zinc-800 bg-[#0B1117] p-6 xl:block">

      <div className="space-y-6">

        <InterestsWidget />

        <DeadlineWidget />

        <StreakWidget />

        <QuoteWidget />

      </div>

    </aside>
  );
}

export default RightSideBar;