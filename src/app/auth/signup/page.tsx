"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import publicAPI from "../../../api/publicAxios";
import LoadingButton from "../../../components/ui/LoadingButton";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isDisabled = !name || !email || !password;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await publicAPI.post("auth/signup/", {
        name,
        email,
        password,
      });

      
      toast.success("Signup successful! Please check your email.");

      localStorage.setItem("pendingEmail", email);
      router.push("/auth/confirm-email"); 
    } catch (err: any) {
      console.error("Signup error:", err.response?.data || err.message);

      const errorData = err.response?.data;

      // Show specific field errors as toast
      if (errorData) {
        if (errorData.email) {
          toast.error(errorData.email[0]);
        } else if (errorData.password) {
          toast.error(errorData.password[0]);
        } else if (errorData.name) {
          toast.error(errorData.name[0]);
        } else {
          toast.error("Signup failed. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-6">
        {/* Club Logo */}
        <div className="flex justify-center">
          <Image src="/club_logo.webp" alt="Club Logo" width={60} height={60} />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold">CREATE AN ACCOUNT</h2>
          <p className="text-sm text-gray-600">
            Join now for free and be part of Classic's fan community to enjoy
            exclusive content, perks & rewards
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded text-sm focus:outline-none focus:border-clubRed"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded text-sm focus:outline-none focus:border-clubRed"
            required
          />
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <p className="text-xs text-gray-500">
            By signing up, you agree to Classic FC Group using your personal data
            in accordance with our Privacy Policy.
          </p>

          <LoadingButton type="submit" loading={loading} disabled={isDisabled}>
            Create Account
          </LoadingButton>
        </form>

        {/* OR section */}
        <div className="flex items-center gap-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-xs text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Sign Up */}
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

        {/* Login link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-clubRed hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

