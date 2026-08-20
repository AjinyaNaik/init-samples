import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegister } from "../../hooks/userHooks";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, isLoading, error: hookError } = useRegister();

  // -----------------------------
  // Password strength
  // -----------------------------
  const getPasswordStrength = (password: string) => {
    if (!password) {
      return {
        score: 0,
        label: "",
        width: "0%",
      };
    }

    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return {
        score,
        label: "Weak",
        width: "25%",
      };
    }

    if (score <= 3) {
      return {
        score,
        label: "Fair",
        width: "50%",
      };
    }

    if (score <= 4) {
      return {
        score,
        label: "Good",
        width: "75%",
      };
    }

    return {
      score,
      label: "Strong",
      width: "100%",
    };
  };

  const passwordStrength = getPasswordStrength(password);

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const passwordsDoNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  // -----------------------------
  // Register
  // -----------------------------
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    try {
      await register(username, email, password);

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      setLocalError(err.message || "Failed to register account");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12">
      <style>{`
        @keyframes signup-neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow:
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 20px #d8b4fe,
              0 0 40px #a855f7,
              0 0 80px #a855f7;
            opacity: 1;
          }

          20%, 24%, 55% {
            text-shadow: none;
            opacity: 0.4;
          }
        }

        @keyframes password-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(168, 85, 247, 0.15);
          }

          50% {
            box-shadow: 0 0 12px rgba(168, 85, 247, 0.3);
          }
        }
      `}</style>

      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-lg">

        {/* Heading */}
        <h1
          className="mb-8 text-center text-4xl font-normal text-purple-300"
          style={{
            fontFamily: "'Shrikhand', cursive",
            animation: "signup-neon-flicker 4s infinite alternate",
          }}
        >
          Signup
        </h1>

        {/* Error */}
        {(localError || hookError) && (
          <div className="mb-4 rounded-xl border border-red-900/50 bg-red-950/30 p-3 text-center text-sm font-semibold text-red-400">
            {localError || hookError}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-5">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-semibold text-zinc-400"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
              placeholder="your_handle"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold text-zinc-400"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
              placeholder="name@email.com"
            />
          </div>

          {/* Password */}
          <div>
  <label
    htmlFor="password"
    className="mb-1 block text-sm font-semibold text-zinc-400"
  >
    Password
  </label>

  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      disabled={isLoading}
      minLength={6}
      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 pr-20 text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
      placeholder="minimum 6 characters"
    />

    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-purple-400 transition hover:text-purple-300"
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>

  {/* Strength indicator */}
  {password && (
    <div className="mt-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            passwordStrength.label === "Weak"
              ? "bg-red-500"
              : passwordStrength.label === "Fair"
              ? "bg-yellow-500"
              : passwordStrength.label === "Good"
              ? "bg-purple-500"
              : "bg-green-500"
          }`}
          style={{
            width: passwordStrength.width,
          }}
        />
      </div>

      <p className="mt-2 text-xs text-zinc-600">
        Use 10+ characters with uppercase, numbers, and symbols.
      </p>
    </div>
  )}
</div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-semibold text-zinc-400"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className={`w-full rounded-xl border bg-zinc-950 p-3 pr-10 text-zinc-100 placeholder-zinc-600 outline-none transition focus:ring-1 disabled:opacity-50 ${
                  passwordsDoNotMatch
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : passwordsMatch
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                    : "border-zinc-800 focus:border-purple-500 focus:ring-purple-500"
                }`}
                placeholder="re-enter your password"
              />

              {/* Match indicator */}
              {confirmPassword && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {passwordsMatch ? (
                    <span className="text-lg text-green-400">✓</span>
                  ) : (
                    <span className="text-lg text-red-400">×</span>
                  )}
                </div>
              )}
            </div>

            {passwordsDoNotMatch && (
              <p className="mt-2 text-xs text-red-400">
                Passwords do not match.
              </p>
            )}

            {passwordsMatch && (
              <p className="mt-2 text-xs text-green-400">
                Passwords match.
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              isLoading ||
              password.length < 6 ||
              password !== confirmPassword
            }
            className="mt-2 w-full cursor-pointer rounded-xl bg-purple-600 p-3 font-semibold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 transition hover:text-purple-300 hover:underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}