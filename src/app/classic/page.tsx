// app/classic/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaCheckCircle, FaTshirt, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { MdStars } from 'react-icons/md';
import Link from 'next/link';
import { useAuth } from '../../components/context/AuthContext';

export default function MyClassicPage() {
  const router = useRouter();
  const { isAuthenticated, user, loading, logout } = useAuth();

  const [jerseyNumber, setJerseyNumber] = useState<number>(0);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading]);
  


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-6xl text-gray-500" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name || 'Fan'}!</h2>
              <div className="flex items-center gap-2 mt-1">
                <MdStars className="text-yellow-500" />
                <span className="text-yellow-600 font-semibold">My Classic Fan</span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
              Become a Member
            </button>
            <button
              className="text-red-600 hover:text-red-800 flex items-center gap-1"
              onClick={logout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Jersey Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center gap-2 text-center">
            <FaTshirt className="text-7xl text-clubRed" />
            <h3 className="text-lg font-bold text-gray-800">{user?.name || 'Fan'}’s Jersey</h3>
            <p className="text-gray-600 text-sm">Jersey No. <span className="font-semibold">{jerseyNumber}</span></p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              href="/profile/edit"
              className="inline-flex items-center gap-2 text-clubRed hover:underline font-semibold"
            >
              <FaEdit /> Edit Profile
            </Link>
          </div>
        </div>

        {/* Fan Activity Section (coming soon placeholder) */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Fan Activity</h3>
          <p className="text-sm text-gray-500">More fan engagement features like predictions, competitions, and stats coming soon!</p>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}
