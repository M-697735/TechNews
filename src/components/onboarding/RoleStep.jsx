import roles from "../../data/roles";
import SelectionChip from "../ui/SelectionChip";

function RoleStep({ formData, setFormData }) {
  return (
    <div className="mx-auto max-w-4xl">

      <h1 className="text-center text-4xl font-bold">
        Let's get to know you
      </h1>

      <p className="mt-4 text-center text-zinc-400">
        Choose the option that best describes you.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-4">

        {roles.map((role) => (
          <SelectionChip
            key={role.id}
            title={role.title}
            icon={role.icon}
            selected={formData.role === role.id}
            onClick={() =>
              setFormData({
                ...formData,
                role: role.id,
              })
            }
          />
        ))}

      </div>

    </div>
  );
}

export default RoleStep;