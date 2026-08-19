import notificationPreferences from "../../data/notificationPreferences";
import ToggleSwitch from "../ui/ToggleSwitch";

function NotificationStep({ formData, setFormData }) {
  const toggleNotification = (id) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [id]: !formData.notifications[id],
      },
    });
  };

  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="text-center text-4xl font-bold">
        Notification Preferences
      </h1>

      <p className="mt-4 text-center text-zinc-400">
        Stay updated with what matters to you.
      </p>

      <div className="mt-10 space-y-5">

        {notificationPreferences.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
          >
            <span className="font-medium">
              {item.title}
            </span>

            <ToggleSwitch
              checked={formData.notifications[item.id]}
              onChange={() => toggleNotification(item.id)}
            />

          </div>
        ))}

      </div>

    </div>
  );
}

export default NotificationStep;