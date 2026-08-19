import academicYears from "../../data/academicYears";
import SelectionChip from "../ui/SelectionChip";

function AcademicYearStep({ formData, setFormData }) {
  return (
    <div className="mx-auto max-w-4xl">

      <h1 className="text-center text-4xl font-bold">
        Which year are you in?
      </h1>

      <p className="mt-4 text-center text-zinc-400">
        Select your current academic year.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-4">

        {academicYears.map((year) => (
          <SelectionChip
            key={year.id}
            title={year.title}
            selected={formData.academicYear === year.id}
            onClick={() =>
              setFormData({
                ...formData,
                academicYear: year.id,
              })
            }
          />
        ))}

      </div>

    </div>
  );
}

export default AcademicYearStep;