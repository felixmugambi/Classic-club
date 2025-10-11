"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 text-gray-800">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold mb-4 text-red-600"
      >
        404
      </motion.h1>
      <p className="text-lg mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
      >
        <Home size={18} />
        Go Back Home
        </button>
    </div>
  );
}
