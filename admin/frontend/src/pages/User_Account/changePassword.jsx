import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    const passwordData = {
      oldPassword,
      newPassword,
    };

    try {
      const res = await axios.post(
        "http://localhost:3663/api/change-password",
        passwordData,
        {
          withCredentials: true,
        }
      );

      setSuccess("Password changed successfully!");
      // Clear form
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Password change failed:", err);
      setError(
        err.response?.data?.message || 
        "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#1a3355] p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#AE9142] opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#AE9142] opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-[#AE9142] opacity-5 blur-3xl"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Main card - Now full width */}
        <div className="bg-white backdrop-blur-sm bg-opacity-95 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0C2340] to-[#1a3355] px-12 py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[#AE9142] opacity-10"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-[#AE9142] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Change Password</h2>
              <p className="text-white/80 text-lg">Update your account security</p>
            </div>
          </div>

          <div className="px-12 py-10">
            {/* Two column layout for better use of space */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left column - Form */}
              <div className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#0C2340] mb-2">Password Information</h3>
                  <p className="text-gray-600">Enter your current password and choose a new secure password for your account.</p>
                </div>

                {/* Alert messages */}
                {error && (
                  <div className="mb-6 bg-red-50 border-l-4 border-red-400 rounded-lg p-4 animate-fade-in">
                    <div className="flex">
                      <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-700 text-sm font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="mb-6 bg-green-50 border-l-4 border-green-400 rounded-lg p-4 animate-fade-in">
                    <div className="flex">
                      <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-700 text-sm font-medium">{success}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  {/* Current Password */}
                  <div className="space-y-3">
                    <label htmlFor="oldPassword" className="block text-sm font-semibold text-[#0C2340]">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.old ? "text" : "password"}
                        id="oldPassword"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full px-5 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#AE9142] focus:ring-0 transition-all duration-300 disabled:bg-gray-50 disabled:opacity-70 text-[#0C2340] placeholder-gray-400"
                        placeholder="Enter your current password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('old')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#AE9142] hover:text-[#0C2340] transition-colors"
                      >
                        {showPassword.old ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415M14.12 14.12L9.878 9.878" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-3">
                    <label htmlFor="newPassword" className="block text-sm font-semibold text-[#0C2340]">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full px-5 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#AE9142] focus:ring-0 transition-all duration-300 disabled:bg-gray-50 disabled:opacity-70 text-[#0C2340] placeholder-gray-400"
                        placeholder="Enter your new password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#AE9142] hover:text-[#0C2340] transition-colors"
                      >
                        {showPassword.new ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415M14.12 14.12L9.878 9.878" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-3">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#0C2340]">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full px-5 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#AE9142] focus:ring-0 transition-all duration-300 disabled:bg-gray-50 disabled:opacity-70 text-[#0C2340] placeholder-gray-400"
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#AE9142] hover:text-[#0C2340] transition-colors"
                      >
                        {showPassword.confirm ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415M14.12 14.12L9.878 9.878" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#AE9142] to-[#c4a652] hover:from-[#c4a652] hover:to-[#AE9142] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:ring-4 focus:ring-[#AE9142]/30 focus:outline-none text-lg"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Changing Password...
                        </div>
                      ) : (
                        "Change Password"
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right column - Security info and tips */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#0C2340] mb-4">Password Security</h3>
                    <p className="text-gray-600 mb-6">Follow these guidelines to create a strong and secure password for your account.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#AE9142] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-[#0C2340] font-medium">Use at least 8 characters</p>
                        <p className="text-gray-600 text-sm">Longer passwords are more secure</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#AE9142] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-[#0C2340] font-medium">Mix letters, numbers, and symbols</p>
                        <p className="text-gray-600 text-sm">Combine uppercase, lowercase, numbers, and special characters</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#AE9142] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-[#0C2340] font-medium">Avoid common words</p>
                        <p className="text-gray-600 text-sm">Don't use dictionary words or personal information</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#AE9142] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-[#0C2340] font-medium">Keep it unique</p>
                        <p className="text-gray-600 text-sm">Use a different password for each account</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional security note */}
                  {/* <div className="mt-8 p-4 bg-[#0C2340]/5 rounded-lg border border-[#0C2340]/10">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-[#AE9142] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-[#0C2340] font-medium mb-1">Important Note</p>
                        <p className="text-sm text-[#0C2340]/70">
                          After changing your password, you may need to sign in again on all your devices. Make sure to remember your new password.
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChangePassword;
