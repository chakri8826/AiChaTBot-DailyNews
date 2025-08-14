import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, username, password }, () => navigate("/search"));
  };

  return (
    <div className="min-h-screen w-full hero-bg flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
        <div className="w-full p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-6 bg-black/60 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md backdrop-blur-sm">
          <h1 className="text-center text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
            Sign Up
          </h1>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="email"
                className="text-sm sm:text-base font-medium text-gray-300 block mb-2"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 mt-1 border border-gray-700 rounded-md sm:rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="text-sm sm:text-base font-medium text-gray-300 block mb-2"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 mt-1 border border-gray-700 rounded-md sm:rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                placeholder="johndoe"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm sm:text-base font-medium text-gray-300 block mb-2"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 mt-1 border border-gray-700 rounded-md sm:rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                placeholder="••••••••"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 sm:py-3 bg-white text-black font-semibold rounded-md sm:rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="text-center text-gray-400 text-sm sm:text-base">
            Already a member?{" "}
            <Link to={"/login"} className="text-white hover:underline transition-colors duration-200">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage; 