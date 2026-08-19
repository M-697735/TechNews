import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

function DeleteAccountModal({
  open,
  onClose,
  onDelete,
  loading,
}) {
  const [confirmation, setConfirmation] =
    useState("");

  if (!open) return null;

  const canDelete =
    confirmation.trim() === "DELETE";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-red-500/30 bg-zinc-900 p-8 shadow-2xl">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-red-500/20 p-3">

              <AlertTriangle
                size={28}
                className="text-red-400"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Delete Account
              </h2>

              <p className="mt-1 text-zinc-400">
                This action is permanent.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X size={20} />
          </button>

        </div>

        {/* Warning */}

        <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

          <p className="text-sm leading-7 text-zinc-300">

            Deleting your account will permanently remove:

          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-zinc-400">

            <li>Your TechNews profile</li>

            <li>Saved News</li>

            <li>Saved Jobs</li>

            <li>Saved Hackathons</li>

            <li>Notification Preferences</li>

            <li>Your Firebase Account</li>

          </ul>

        </div>

        {/* Confirmation */}

        <div className="mt-8">

          <label className="mb-3 block text-sm font-medium text-zinc-300">

            Type

            <span className="mx-2 rounded bg-red-500 px-2 py-1 font-bold text-white">

              DELETE

            </span>

            to continue.

          </label>

          <input
            value={confirmation}
            onChange={(e) =>
              setConfirmation(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-red-500"
            placeholder="Type DELETE"
          />

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:border-zinc-500"
          >
            Cancel
          </button>

          <button
            disabled={!canDelete || loading}
            onClick={onDelete}
            className={`rounded-xl px-6 py-3 font-semibold transition ${
              canDelete
                ? "bg-red-500 text-white hover:bg-red-600"
                : "cursor-not-allowed bg-zinc-700 text-zinc-500"
            }`}
          >
            {loading
              ? "Deleting..."
              : "Delete Account"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteAccountModal;