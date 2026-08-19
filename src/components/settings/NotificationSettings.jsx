import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import SettingsCard from "./SettingsCard";

import { useAuth } from "../../context/AuthContext";
import { updateNotificationPreferences } from "../../services/firestoreService";

function NotificationSettings({
  notifications = {},
}) {
  const { user } = useAuth();

  const [preferences, setPreferences] =
    useState(notifications);

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [hasChanges, setHasChanges] =
    useState(false);

  useEffect(() => {
    setPreferences(notifications);
  }, [notifications]);

  const notificationItems = [
    {
      key: "dailyDigest",
      label: "Daily Digest",
      description:
        "Receive a daily summary of the latest tech updates.",
    },
    {
      key: "breakingNews",
      label: "Breaking News",
      description:
        "Get notified about important technology news instantly.",
    },
    {
      key: "jobs",
      label: "Jobs & Internships",
      description:
        "Receive updates about new hiring opportunities.",
    },
    {
      key: "hackathons",
      label: "Hackathons",
      description:
        "Stay informed about upcoming hackathons and coding events.",
    },
    {
      key: "courses",
      label: "Courses",
      description:
        "Receive recommendations for new learning resources.",
    },
  ];

  function togglePreference(key) {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setHasChanges(true);
    setSaved(false);
  }

  async function handleSave() {
    if (!user) return;

    try {
      setSaving(true);

      await updateNotificationPreferences(
        user.uid,
        preferences
      );

      setSaved(true);
      setHasChanges(false);
    } catch (error) {
      console.error(error);
      alert("Unable to save preferences.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SettingsCard
      title="Notification Preferences"
      description="Control which updates you want to receive."
    >
      <div className="space-y-5">

        {notificationItems.map((item) => (

          <div
            key={item.key}
            className="flex items-center justify-between rounded-2xl border border-zinc-800 p-5"
          >

            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-teal-500/15 p-3">
                <Bell
                  size={18}
                  className="text-teal-400"
                />
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {item.label}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {item.description}
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                togglePreference(item.key)
              }
              className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
                preferences?.[item.key]
                  ? "bg-teal-500"
                  : "bg-zinc-700"
              }`}
            >

              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                  preferences?.[item.key]
                    ? "left-8"
                    : "left-1"
                }`}
              />

            </button>

          </div>

        ))}

        <div className="flex items-center justify-between pt-2">

          <div>

            {saved && (
              <p className="text-sm font-medium text-green-400">
                ✓ Preferences saved successfully.
              </p>
            )}

          </div>

          <button
            disabled={!hasChanges || saving}
            onClick={handleSave}
            className={`rounded-xl px-6 py-3 font-semibold transition ${
              hasChanges
                ? "bg-teal-500 text-black hover:bg-teal-400"
                : "cursor-not-allowed bg-zinc-700 text-zinc-500"
            }`}
          >
            {saving
              ? "Saving..."
              : "Save Preferences"}
          </button>

        </div>

      </div>
    </SettingsCard>
  );
}

export default NotificationSettings;