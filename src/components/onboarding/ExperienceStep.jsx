import experienceLevels from "../../data/experienceLevels";
import SelectionChip from "../ui/SelectionChip";

function ExperienceStep({ formData, setFormData }) {
  return (
    <div className="mx-auto max-w-4xl">

      <h1 className="text-center text-4xl font-bold">
        Years of Experience
      </h1>

      <p className="mt-4 text-center text-zinc-400">
        Select your professional experience.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-4">

        {experienceLevels.map((level) => (
          <SelectionChip
            key={level.id}
            title={level.title}
            selected={formData.experience === level.id}
            onClick={() =>
              setFormData({
                ...formData,
                experience: level.id,
              })
            }
          />
        ))}

      </div>

    </div>
  );
}

export default ExperienceStep;