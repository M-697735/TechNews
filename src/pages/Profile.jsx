import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileCard from "../components/profile/ProfileCard";
import InterestChips from "../components/profile/InterestChips";
import NotificationCard from "../components/profile/NotificationCard";

import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/firestoreService";

function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080C10] text-white">
        Loading Profile...
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        <ProfileHeader
          user={user}
          profile={profile}
        />

        <div className="grid gap-6 lg:grid-cols-2">

          <ProfileCard
            title="Role"
            value={profile?.role}
          />

          <ProfileCard
            title="Academic Year / Experience"
            value={
              profile?.academicYear ||
              profile?.experience
            }
          />

          <InterestChips
            title="Interests"
            items={profile?.interests || []}
          />

          <InterestChips
            title="Preferred Companies"
            items={profile?.preferredCompanies || []}
          />

          <InterestChips
            title="Career Goals"
            items={profile?.careerGoals || []}
          />

          <NotificationCard
            notifications={profile?.notifications || {}}
          />

        </div>

      </div>
    </MainLayout>
  );
}

export default Profile;