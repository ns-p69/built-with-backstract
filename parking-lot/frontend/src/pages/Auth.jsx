import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signupUrl = "https://cc1fbde45ead-in-south-01.backstract.io/affectionate-keller-d1d63ba4eaaa11efab560242ac12000527/api/users/";
  const signinUrl = "https://cc1fbde45ead-in-south-01.backstract.io/affectionate-keller-d1d63ba4eaaa11efab560242ac12000527/api/users/signin";

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError("");
  };

  const checkPasswordStrength = (password) => {
    setPassword(password);
    if (password.length < 6) setPasswordStrength("Weak");
    else if (password.length < 10) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!phoneNumber || !password || (isRegister && !fullName)) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      let response;
      if (isRegister) {
        // Signup logic
        response = await fetch(signupUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: fullName,
            phone_number: phoneNumber,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store the user ID in localStorage
          localStorage.setItem('userId', data.id);
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          setError(data.message || 'Signup failed. Please try again.');
        }
      } else {

        response = await fetch(`${signinUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store the token in localStorage
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          setError(data.message || 'Authentication failed. Please try again.');
        }
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left - Logo and Welcome Text */}
        <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex flex-col justify-center items-center text-white">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Park Mate</h1>
            <p className="text-lg text-blue-100">Find and reserve parking spots in real-time</p>
          </div>
          <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center mb-8">
            <img src="https://media.discordapp.net/attachments/1339850284066799677/1339875860508971041/DALLE_2025-02-14_13.57.52_-_A_professional_and_modern_logo_for_Park_Mate_with_the_tagline_Find_Park_Relax._The_design_includes_a_stylized_letter_P_integrated_with_a_parking.webp?ex=67b05022&is=67aefea2&hm=451fba6f9bcfa7c2d00ee514bce0dfdee0d43e38a7d4dd9b10d8c9dcd394d8fe&=&format=webp&width=468&height=468" alt="Park Mate Logo" />
          </div>
          <p className="text-center text-sm text-blue-100 max-w-xs">
            Join thousands of users who have simplified their parking experience
          </p>
        </div>

        {/* Right - Form */}
        <div className="w-1/2 p-12 bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600">
              {isRegister
                ? "Start your journey with Park Mate"
                : "Log in to access your account"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                type="tel"
                placeholder="+1 (123) 456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                type="password"
                placeholder="••••••••"
                onChange={(e) => checkPasswordStrength(e.target.value)}
                value={password}
                disabled={loading}
              />
              {passwordStrength && (
                <p className={`text-sm mt-1 ${
                  passwordStrength === "Weak" ? "text-red-500" :
                  passwordStrength === "Medium" ? "text-yellow-600" : "text-green-500"
                }`}>
                  Password Strength: {passwordStrength}
                </p>
              )}
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isRegister ? "Create Account" : "Sign In"
              )}
            </button>

            <p className="text-center text-gray-600 mt-4">
              {isRegister ? "Already have an account? " : "Don't have an account? "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-blue-600 font-semibold hover:underline"
                disabled={loading}
              >
                {isRegister ? "Sign In" : "Create Account"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;