import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import Greeting from "../components/dashboard/Greeting";
import Highlights from "../components/dashboard/Highlights";
import AIBrief from "../components/dashboard/AIBrief";
import NewsSection from "../components/dashboard/NewsSection";
import JobsSection from "../components/dashboard/JobsSection";
import HackathonSection from "../components/dashboard/HackathonSection";
import CoursesSection from "../components/dashboard/CoursesSection";

import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/firestoreService";

function Dashboard() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const data = await getUserProfile(user.uid);

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080C10] text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <MainLayout>

      <Greeting profile={profile} />

      <Highlights profile={profile} />

      <AIBrief profile={profile} />

      <NewsSection profile={profile} />

      <JobsSection profile={profile} />

      <HackathonSection profile={profile} />

      <CoursesSection profile={profile} />

    </MainLayout>
  );
}

export default Dashboard;