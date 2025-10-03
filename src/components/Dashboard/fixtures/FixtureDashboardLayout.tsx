'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { FiMenu } from 'react-icons/fi';

export default function FixtureDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar for large screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white">
            <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
          </div>
          {/* Overlay background */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}


      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar with hamburger button only visible on mobile */}
        <div className="md:hidden p-2 bg-red-500 text-white flex items-center">
          <button onClick={() => setIsSidebarOpen(true)} className="text-2xl">
            <FiMenu />
          </button>
          <h2 className="ml-4 font-bold">Fixture Dashboard</h2>
        </div>

        <Topbar />

        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
