import { useState } from "react";
import companies from "../../data/companies";
import SelectionSection from "../ui/SelectionSection";

function CompaniesStep({ formData, setFormData }) {
  const [search, setSearch] = useState("");

  const toggleCompany = (id) => {
    if (formData.preferredCompanies.includes(id)) {
      setFormData({
        ...formData,
        preferredCompanies: formData.preferredCompanies.filter(
          (item) => item !== id
        ),
      });
    } else {
      setFormData({
        ...formData,
        preferredCompanies: [...formData.preferredCompanies, id],
      });
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="text-center text-4xl font-bold">
        Preferred Companies
      </h1>

      <p className="mt-4 text-center text-zinc-400">
        Select companies you dream of working for.
      </p>

      <input
        type="text"
        placeholder="🔍 Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-8 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-teal-500"
      />

      <SelectionSection
        title=""
        subtitle=""
        options={filteredCompanies}
        selectedItems={formData.preferredCompanies}
        onToggle={toggleCompany}
      />

    </div>
  );
}

export default CompaniesStep;