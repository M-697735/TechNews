function NavigationButtons({
  currentStep,
  totalSteps,
  setStep,
  formData,
  onFinish,
  isEditMode = false,
}) {
  const canContinue = () => {
    switch (currentStep) {
      case 2:
        return formData.role !== "";

      case 3:
        return formData.role === "student"
          ? formData.academicYear !== ""
          : formData.experience !== "";

      case 4:
        return formData.interests.length > 0;

      case 5:
        return formData.contentPreferences.length > 0;

      case 6:
        return formData.preferredCompanies.length > 0;

      case 7:
        return formData.careerGoals.length > 0;

      case 8:
        return true;

      default:
        return true;
    }
  };

  const handleContinue = () => {
    if (!canContinue()) return;

    if (currentStep < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="mt-10 flex items-center justify-between">

      <button
        disabled={currentStep === 1}
        onClick={() => setStep((prev) => prev - 1)}
        className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:border-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Previous
      </button>

      <button className="text-zinc-400 transition hover:text-white">
        Skip for now
      </button>

      <button
        disabled={!canContinue()}
        onClick={handleContinue}
        className={`rounded-xl px-8 py-3 font-semibold transition ${
          canContinue()
            ? "bg-teal-500 text-black hover:bg-teal-400"
            : "cursor-not-allowed bg-zinc-700 text-zinc-500"
        }`}
      >
        {currentStep === totalSteps
          ? isEditMode
            ? "Save Changes"
            : "Finish Setup"
          : "Continue →"}
      </button>

    </div>
  );
}

export default NavigationButtons;