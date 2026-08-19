import MainLayout from "../components/layout/MainLayout";

import AccountSection from "../components/settings/AccountSection";
import NotificationSettings from "../components/settings/NotificationSettings";
import SettingsCard from "../components/settings/SettingsCard";
import DangerZone from "../components/settings/DangerZone";

import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getUserProfile } from "../services/firestoreService";

function Settings() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const data = await getUserProfile(user.uid);

      setProfile(data);
    }

    loadProfile();
  }, [user]);

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-white">
            Settings
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage your TechNews account and preferences.
          </p>
        </div>

        {/* Account */}

        <AccountSection user={user} />

        {/* Notifications */}

        <NotificationSettings
          notifications={profile?.notifications}
        />

        {/* General */}

        <SettingsCard
          title="General"
          description="More personalization features are coming soon."
        />

        {/* Danger Zone */}

        <DangerZone />

      </div>
    </MainLayout>
  );
}

export default Settings;