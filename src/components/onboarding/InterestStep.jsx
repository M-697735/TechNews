import interestCategories from "../../data/interests";
import SelectionChip from "../ui/SelectionChip";

function InterestStep({ formData, setFormData }) {
  const toggleInterest = (id) => {
    if (formData.interests.includes(id)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((item) => item !== id),
      });
    } else {
      if (formData.interests.length >= 8) return;

      setFormData({
        ...formData,
        interests: [...formData.interests, id],
      });
    }
  };

  const toggleCategory = (items) => {
    const ids = items.map((item) => item.id);
    const allSelected = ids.every((id) =>
      formData.interests.includes(id)
    );

    if (allSelected) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(
          (id) => !ids.includes(id)
        ),
      });
    } else {
      const merged = [...new Set([...formData.interests, ...ids])].slice(
        0,
        8
      );

      setFormData({
        ...formData,
        interests: merged,
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="text-center text-4xl font-bold">
        Choose Your Interests
      </h1>

      <p className="mt-3 text-center text-zinc-400">
        Select up to 8 interests.
      </p>

      <p className="mt-2 text-center text-teal-400">
        {formData.interests.length}/8 Selected
      </p>

      {interestCategories.map((section) => (
        <div key={section.category} className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-bold">
              {section.category}
            </h2>

            <button
              onClick={() => toggleCategory(section.items)}
              className="text-sm text-teal-400 hover:underline"
            >
              Select All
            </button>

          </div>

          <div className="flex flex-wrap gap-3">

            {section.items.map((interest) => (
              <SelectionChip
                key={interest.id}
                title={interest.title}
                icon={interest.icon}
                selected={formData.interests.includes(interest.id)}
                onClick={() => toggleInterest(interest.id)}
              />
            ))}

          </div>

        </div>
      ))}

    </div>
  );
}

export default InterestStep;