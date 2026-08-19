import { motion } from "framer-motion";

function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Personalization Setup
          </h2>

          <p className="text-sm text-zinc-400">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        <span className="text-sm font-semibold text-teal-400">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
          className="h-full rounded-full bg-teal-500"
        />
      </div>
    </div>
  );
}

export default ProgressBar;