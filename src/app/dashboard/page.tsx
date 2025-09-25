'use client';

import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../components/context/AuthContext";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import Link from "next/link";
import Logo from "../../components/ui/Logo";

export default function DashboardHome() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true)



  return (
    <div className="p-6">
      <div className='flex items-end justify-end'>
        <Logo />
      </div>
      <div className="flex items-center justify-center">
        <div className="relative items-center justify-center">
          <div className="flex items-center justify-center">
            <FaUserCircle className="text-9xl text-gray-500" />
          </div>

          <h2 className="text-xl font-semibold text-yellow-500 py-2">HI, {user?.name}</h2>
        </div>
      </div>
      <div className="flex justify-center bg-zinc-200 rounded-lg mt-3 p-3">
        <h1 className="md:text-xl lg:text-2xl xl:text-2xl font-bold mx-3 my-4">Welcome to the Admin Dashboard</h1>
      </div>

      <div className="flex justify-center bg-zinc-100 rounded-lg mt-5 p-3">
        <p className="md:text-lg lg:text-xl xl:text-xl font-bold mx-2 my-3">Select a department to manage from the sidebar.</p>
      </div>

      <div className="mt-14">
        <Link
          href="/"
          className="bg-clubRed hover:bg-red-600 w-full py-2 rounded font-semibold transition flex items-center justify-center gap-2 text-white"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
