import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AlertTriangle, Trash2 } from "lucide-react";

import DeleteAccountModal from "./DeleteAccountModal";

import { deleteCurrentAccount } from "../../services/authService";

function DangerZone() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleDeleteAccount() {
    try {
      setLoading(true);

      await deleteCurrentAccount();

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Unable to delete account."
      );
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  }

  return (
    <>
      <div className="rounded-3xl border border-red-500/40 bg-red-500/5 p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle
            size={30}
            className="text-red-400"
          />

          <div>

            <h2 className="text-2xl font-bold text-red-400">
              Danger Zone
            </h2>

            <p className="mt-1 text-zinc-400">
              Permanent actions that cannot be
              undone.
            </p>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-red-500/20 bg-zinc-900 p-5">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Delete Account
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Permanently remove your account,
                profile and preferences.
              </p>

            </div>

            <button
              onClick={() =>
                setOpenModal(true)
              }
              className="flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              <Trash2 size={18} />

              Delete Account
            </button>

          </div>

        </div>

      </div>

      <DeleteAccountModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onDelete={handleDeleteAccount}
        loading={loading}
      />
    </>
  );
}

export default DangerZone;