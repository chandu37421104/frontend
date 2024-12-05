/*import React, { useState } from "react";*/
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../services/authService";

export const Signin = () => {
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSigninClick = async () => {
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      await login({ email, password });
      navigate("../Dashboard"); // Redirect to the Student Dashboard
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col bg-white">
      <div className="flex justify-center">
        <div className="w-full max-w-md px-8">
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/beaconsathletics.com/responsive_2020/images/svgs/logo_main.svg"
              className="h-24"
              alt="University of Massachusetts Boston"
            />
            <h1 className="text-2xl font-semibold text-center text-gray-900">
              University of Massachusetts Boston
            </h1>
          </div>

          {/* Form Section */}
          <div className="pt-4">
            <div>
              <label className="block mb-2 text-sm text-black font-semibold pt-4">
                Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="email@umb.edu"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-black font-semibold pt-4">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="password"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm">
                <Link to="/forgotpassword" className="text-blue-500 hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSigninClick}
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



