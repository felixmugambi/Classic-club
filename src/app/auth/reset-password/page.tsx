"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import API from "../../../api/axios"; // Adjust the path if needed
import { useRouter } from "next/navigation";
import LoadingButton from "../../../components/ui/LoadingButton";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isDisabled =  !email

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await API.post("/auth/request-reset-email/", { email });

      toast.success("Reset email sent successfully")

      router.push("/auth/request-password-submitted");
    } catch (err: any) {
      toast.error("Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-6">
        {/* Club Logo */}
        <div className="flex justify-center">
          <Image src="/club_logo.webp" alt="Club Logo" width={60} height={60} />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold">RESET PASSWORD</h2>
          <p className="text-sm text-gray-600">
            Enter your email and we’ll send you instructions to reset your password.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleResetRequest}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded text-sm focus:outline-none focus:border-clubRed"
          />

          <LoadingButton type="submit" loading={loading} disabled={isDisabled}>Submit</LoadingButton>
        </form>

        {/* Links */}
        <div className="text-center text-sm text-gray-600 mt-4">
          <Link href="/auth/signup" className="underline text-clubRed">
            Create an account
          </Link>{" "}
          or{" "}
          <Link href="/auth/login" className="underline text-clubRed">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
