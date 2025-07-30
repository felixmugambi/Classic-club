"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../../components/context/AuthContext";
import API from "../../../api/axios";
import LoadingButton from "../../../components/ui/LoadingButton";



const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const { refreshUser } = useAuth(); // ✅ Import this from the context
  const isDisabled =  !email || !password;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      const res = await API.post("/auth/login/", {
        email,
        password,
      });

      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      localStorage.setItem("userName", res.data.name);
      localStorage.removeItem("pendingEmail");

      toast.success("Login successful!");

      // 🔥 Tell context to re-fetch user now that we're logged in
      await refreshUser();

      router.push("/"); // or /dashboard or any other route
    } catch (err: any) {
      console.log("Login error response:", err.response?.data);

      const data = err.response?.data;
      let message = "Login failed";

      // ✨ Handle verification error with resend link
      const verificationError =
        Array.isArray(data?.detail) &&
        data.detail[0]?.toLowerCase().includes("verify your email");

      if (verificationError) {
        localStorage.setItem("pendingEmail", email);

        if (data.resend?.uidb64 && data.resend?.token) {
          localStorage.setItem("resend_uid", data.resend.uidb64);
          localStorage.setItem("resend_token", data.resend.token);
        }

        toast.error("Please verify your email to log in.");
        router.push("/auth/resend-verification-email");
        return;
      }


      // 👇 Other possible errors
      if (Array.isArray(data?.detail)) {
        message = data.detail[0];
      } else if (typeof data?.detail === "string") {
        message = data.detail;
      } else if (data?.non_field_errors?.[0]) {
        message = data.non_field_errors[0];
      } else if (data?.email?.[0]) {
        message = data.email[0];
      }

      toast.error(message);
    } finally {
      setLoading(false)
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
          <h2 className="text-xl font-bold">LOG IN</h2>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-clubRed hover:underline">
              Create one now
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm focus:outline-none focus:border-clubRed"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm focus:outline-none focus:border-clubRed"
              required
            />
            <span
              className="absolute right-3 top-2 text-sm text-clubRed cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <LoadingButton type="submit" loading={loading} disabled={isDisabled}>
            Log In
          </LoadingButton>

          <Link
            href="/auth/reset-password"
            className="block text-center text-xs text-clubRed underline mt-1"
          >
            Forgot Password?
          </Link>
        </form>

        {/* OR section */}
        <div className="flex items-center gap-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-xs text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Sign In */}
        <div className="flex justify-between gap-2">
          <button className="flex-1 border px-4 py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
            <FaGoogle /> Google
          </button>
          <button className="flex-1 border px-4 py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
            <FaFacebook /> Facebook
          </button>
          <button className="flex-1 border px-4 py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
            <FaApple /> Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
