
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../services/authService";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordReset(email);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error sending reset link:", err);
      setError("Unable to send reset link. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col bg-white">
      <div className="flex justify-center">
        <div className="w-full max-w-md px-8">
          {/* Header Section */}
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
          {isSubmitted ? (
            <div className="text-center">
              <p className="text-lg text-green-600 font-semibold">
                A reset link has been sent to your email!
              </p>
              <Link
                to="/signin"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-4">
              <div>
                <label className="block mb-2 text-sm text-black font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="email@umb.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Send Reset Link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
