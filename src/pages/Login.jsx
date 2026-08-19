import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      console.log("Login button clicked");

      const { user, isNewUser } = await signInWithGoogle();

      console.log("Logged In User:", user);

      if (isNewUser) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Firebase Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-10 shadow-2xl">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500 text-2xl font-bold text-black">
            TN
          </div>

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-zinc-400">
            Continue your personalized tech journey.
          </p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-950 py-3 font-semibold text-white transition hover:border-teal-500 hover:bg-zinc-800"
        >
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-zinc-800"></div>

          <span className="mx-4 text-sm text-zinc-500">
            Secure Authentication
          </span>

          <div className="h-px flex-1 bg-zinc-800"></div>
        </div>

        {/* Features */}
        <div className="space-y-4 text-sm text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="text-teal-400">✓</span>
            Personalized News Feed
          </div>

          <div className="flex items-center gap-3">
            <span className="text-teal-400">✓</span>
            Save Jobs & Internships
          </div>

          <div className="flex items-center gap-3">
            <span className="text-teal-400">✓</span>
            Bookmark Hackathons
          </div>

          <div className="flex items-center gap-3">
            <span className="text-teal-400">✓</span>
            AI Powered Recommendations
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm leading-6 text-zinc-500">
          By continuing, you agree to our
          <span className="cursor-pointer text-teal-400">
            {" "}Terms of Service{" "}
          </span>
          and
          <span className="cursor-pointer text-teal-400">
            {" "}Privacy Policy
          </span>.
        </p>
      </div>
    </div>
  );
}

export default Login;