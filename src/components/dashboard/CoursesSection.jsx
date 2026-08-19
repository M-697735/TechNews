import FeedCard from "../cards/FeedCard";

const course = {
  image:
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200",
  category: "Course",
  title: "Complete AWS Cloud Bootcamp",
  description:
    "Master AWS services, DevOps workflows and cloud deployment from beginner to advanced level.",
  company: "Udemy",
  time: "Updated Today",
};

function CoursesSection() {
  return (
    <section className="mt-12">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Recommended Courses
        </h2>

        <button className="font-semibold text-teal-400">
          View All
        </button>

      </div>

      <FeedCard {...course} />

    </section>
  );
}

export default CoursesSection;