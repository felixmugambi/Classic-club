"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import LoadingButton from "../../../components/ui/LoadingButton";
import { useState } from "react";

const ResetPasswordSubmittedPage = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-center space-y-6">
        {/* ✅ Green Check Icon */}
        <FaCheckCircle className="text-green-500 text-5xl mx-auto" />

        {/* ✅ Title */}
        <h2 className="text-2xl font-bold text-gray-800">Password Reset Submitted</h2>

        {/* ✅ Message */}
        <p className="text-sm text-gray-600">
          If you have an account with us, you’ll receive an email to reset your password. Just follow the instructions in the email to complete your password change.
        </p>

        {/* ✅ Login Button */}
        <Link
          href="/auth/login"
          passHref
        >
          <LoadingButton onClick={handleClick} loading={loading}>Back to Login</LoadingButton>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordSubmittedPage;
