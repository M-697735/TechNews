import FeedCard from "../cards/FeedCard";

const jobs = [
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    category: "Internship",
    title: "Software Engineering Intern",
    description:
      "Join Google's engineering team and work on products used by billions of users worldwide.",
    company: "Google",
    time: "1 day ago",
  },
];

function JobsSection() {
  return (
    <section className="mt-12">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Latest Jobs
        </h2>

        <button className="font-semibold text-teal-400">
          View All
        </button>

      </div>

      <FeedCard {...jobs[0]} />

    </section>
  );
}

export default JobsSection;