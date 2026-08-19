import contentPreferences from "../../data/contentPreferences";
import SelectionSection from "../ui/SelectionSection";

function ContentPreferencesStep({ formData, setFormData }) {
  const togglePreference = (id) => {
    if (formData.contentPreferences.includes(id)) {
      setFormData({
        ...formData,
        contentPreferences: formData.contentPreferences.filter(
          (item) => item !== id
        ),
      });
    } else {
      setFormData({
        ...formData,
        contentPreferences: [...formData.contentPreferences, id],
      });
    }
  };

  return (
    <SelectionSection
      title="Content Preferences"
      subtitle="Choose the type of content you want in your feed."
      options={contentPreferences}
      selectedItems={formData.contentPreferences}
      onToggle={togglePreference}
    />
  );
}

export default ContentPreferencesStep;