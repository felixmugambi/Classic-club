"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import LoadingButton from "../../../components/ui/LoadingButton";

const ConfirmEmailSent = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <div className="max-w-md w-full text-center p-6 bg-gray-100 rounded-lg shadow">
        <FaEnvelope className="text-clubRed text-4xl mx-auto mb-4" />

        <h2 className="text-xl font-bold mb-2">CONFIRM YOUR DETAILS</h2>
        <p className="text-gray-700 mb-4">
          To complete your sign-up, simply click the activation link in the email we've just sent you. Be Sure to Check Spam & Junk.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You can change your email preferences or unsubscribe at any time by following the links in the marketing emails that we send you.
        </p>
        <p className="text-sm text-gray-500 italic mb-6">
          Thank you for your continued amazing support!
        </p>

        <Link href="/auth/login">
          <LoadingButton onClick={handleClick} loading={loading}>Login</LoadingButton>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmailSent;
