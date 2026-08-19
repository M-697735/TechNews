import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ProgressBar from "../components/onboarding/ProgressBar";
import NavigationButtons from "../components/onboarding/NavigationButtons";

import WelcomeStep from "../components/onboarding/WelcomeStep";
import RoleStep from "../components/onboarding/RoleStep";
import AcademicYearStep from "../components/onboarding/AcademicYearStep";
import ExperienceStep from "../components/onboarding/ExperienceStep";
import InterestStep from "../components/onboarding/InterestStep";
import ContentPreferencesStep from "../components/onboarding/ContentPreferencesStep";
import CompaniesStep from "../components/onboarding/CompaniesStep";
import CareerGoalsStep from "../components/onboarding/CareerGoalsStep";
import NotificationStep from "../components/onboarding/NotificationStep";
import FinishStep from "../components/onboarding/FinishStep";

import { useAuth } from "../context/AuthContext";

import {
  saveUserProfile,
  getUserProfile,
} from "../services/firestoreService";

function Onboarding() {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const { user } = useAuth();

  const [searchParams] = useSearchParams();

  const isEditMode =
    searchParams.get("edit") === "true";

  const [loading, setLoading] = useState(
    isEditMode
  );

  const [formData, setFormData] = useState({
    role: "",

    academicYear: "",

    experience: "",

    interests: [],

    contentPreferences: [],

    preferredCompanies: [],

    careerGoals: [],

    notifications: {
      dailyDigest: true,
      breakingNews: true,
      jobs: true,
      hackathons: true,
      courses: true,
    },
  });

  useEffect(() => {
    async function loadExistingProfile() {
      if (!isEditMode || !user) {
        setLoading(false);
        return;
      }

      try {
        const profile =
          await getUserProfile(user.uid);

        if (profile) {
          setFormData({
            role:
              profile.role || "",

            academicYear:
              profile.academicYear || "",

            experience:
              profile.experience || "",

            interests:
              profile.interests || [],

            contentPreferences:
              profile.contentPreferences || [],

            preferredCompanies:
              profile.preferredCompanies || [],

            careerGoals:
              profile.careerGoals || [],

            notifications:
              profile.notifications || {
                dailyDigest: true,
                breakingNews: true,
                jobs: true,
                hackathons: true,
                courses: true,
              },
          });
        }
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadExistingProfile();
  }, [user, isEditMode]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading Profile...
      </div>
    );
  }

const handleFinish = async () => {
  console.log(
    isEditMode
      ? "Saving Profile..."
      : "Finish button clicked"
  );

  try {
    if (!user) {
      alert("No authenticated user found.");
      return;
    }

    await saveUserProfile(user.uid, formData);

    console.log("Profile saved successfully");

    if (isEditMode) {
      navigate("/profile");
    } else {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Firestore Error:", error);
    alert(error.message);
  }
};

const totalSteps = 9;

function renderStep() {
  switch (step) {
    case 1:
      return <WelcomeStep />;

    case 2:
      return (
        <RoleStep
          formData={formData}
          setFormData={setFormData}
        />
      );

    case 3:
      return formData.role === "student" ? (
        <AcademicYearStep
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <ExperienceStep
          formData={formData}
          setFormData={setFormData}
        />
      );

    case 4:
      return (
        <InterestStep
          formData={formData}
          setFormData={setFormData}
        />
      );

    case 5:
      return (
        <ContentPreferencesStep
          formData={formData}
          setFormData={setFormData}
        />
      );

    case 6:
      return (
        <CompaniesStep
          formData={formData}
          setFormData={setFormData}
        />
      );

    case 7:
      return (
        <CareerGoalsStep
          formData={formData}
          setFormData={setFormData}
        />
      );

    case 8:
      return (
        <NotificationStep
          formData={formData}
          setFormData={setFormData}
        />
      );

    case 9:
      return (
        <FinishStep
          formData={formData}
          isEditMode={isEditMode}
        />
      );

    default:
      return <WelcomeStep />;
  }
}

return (
  <div className="min-h-screen bg-zinc-950 text-white">
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">

      <ProgressBar
        currentStep={step}
        totalSteps={totalSteps}
      />

      <div className="mt-12 flex-1">

        {isEditMode && (
          <div className="mb-8 rounded-2xl border border-teal-500/30 bg-teal-500/10 p-4">

            <h2 className="text-xl font-bold text-teal-400">
              Edit Your Profile
            </h2>

            <p className="mt-2 text-zinc-400">
              Update your preferences and we'll personalize your TechNews
              experience accordingly.
            </p>

          </div>
        )}

        {renderStep()}

      </div>

      <NavigationButtons
        currentStep={step}
        totalSteps={totalSteps}
        setStep={setStep}
        formData={formData}
        onFinish={handleFinish}
        isEditMode={isEditMode}
      />

    </div>
  </div>
);
}

export default Onboarding;