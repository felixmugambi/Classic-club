"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import API from "../../../api/axios";
import LoadingButton from "../../../components/ui/LoadingButton";

const ResetPasswordClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = !password || !confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/reset-password/", {
        email,
        password,
        confirm_password: confirmPassword,
      });

      toast.success("Password reset successful");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);

    } catch (error: any) {
      toast.error(
        error.response?.data?.detail || "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-6">
        <div className="flex justify-center">
          <Image src="/club_logo.webp" alt="Club Logo" width={60} height={60} />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold">RESET PASSWORD</h2>
          <p className="text-sm text-gray-600">
            Enter your new password
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded text-sm"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded text-sm"
          />

          <LoadingButton
            type="submit"
            loading={loading}
            disabled={isDisabled}
          >
            Update Password
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordClient;