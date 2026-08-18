import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useLogin } from "../../hooks/userHooks";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoading, error: hookError } = useLogin();

  const isAuthRequired = searchParams.get("reason") === "auth_required";
  const [showBanner, setShowBanner] = useState(isAuthRequired);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    try {
      await login(email, password);
      navigate("/catalog");
    } catch (err: any) {
      setLocalError(err.message || "Failed to login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 relative">
      <style>{`
        @keyframes user-neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7;
            opacity: 1;
          }
          20%, 24%, 55% {
            text-shadow: none;
            opacity: 0.4;
          }
        }
        @keyframes slide-down-banner {
          0% {
            transform: translateY(-80px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down-banner 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Perfectly Centered Floating Top Banner */}
      {showBanner && (
        <div className="fixed top-6 left-0 right-0 mx-auto z-50 max-w-md w-[90%] bg-zinc-900/95 backdrop-blur-md border border-purple-500/60 p-4 rounded-2xl shadow-[0_10px_35px_rgba(168,85,247,0.35)] flex items-center justify-between gap-4 animate-slide-down">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-950/80 border border-purple-500/40 rounded-xl flex items-center justify-center text-purple-300 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-100">Login Required</h4>
              <p className="text-xs text-purple-200">
                Please log in to purchase audio samples & packs.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowBanner(false)}
            className="text-zinc-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800 cursor-pointer shrink-0"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-lg">
        <h1
          className="mb-8 text-center text-4xl font-normal text-purple-300"
          style={{
            fontFamily: "'Shrikhand', cursive",
            animation: "user-neon-flicker 4s infinite alternate",
          }}
        >
          Login
        </h1>

        {(localError || hookError) && (
          <div className="mb-4 text-center text-sm font-semibold text-red-500">
            {localError || hookError}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-zinc-400">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-100 placeholder-zinc-600 focus:border-purple-500 focus:outline-none disabled:opacity-50"
              placeholder="name@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold text-zinc-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-100 placeholder-zinc-600 focus:border-purple-500 focus:outline-none disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl bg-purple-600 p-3 font-semibold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          New to Init?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}