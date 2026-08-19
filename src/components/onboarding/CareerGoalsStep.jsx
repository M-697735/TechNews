import careerGoals from "../../data/careerGoals";
import SelectionSection from "../ui/SelectionSection";

function CareerGoalsStep({ formData, setFormData }) {
  const toggleGoal = (id) => {
    if (formData.careerGoals.includes(id)) {
      setFormData({
        ...formData,
        careerGoals: formData.careerGoals.filter(
          (item) => item !== id
        ),
      });
    } else {
      setFormData({
        ...formData,
        careerGoals: [...formData.careerGoals, id],
      });
    }
  };

  return (
    <SelectionSection
      title="Career Goals"
      subtitle="Tell us what you're working towards."
      options={careerGoals}
      selectedItems={formData.careerGoals}
      onToggle={toggleGoal}
    />
  );
}

export default CareerGoalsStep;