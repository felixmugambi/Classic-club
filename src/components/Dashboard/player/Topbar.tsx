'use client';

import { FiMenu } from 'react-icons/fi';

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="shadow px-6 ml-2 rounded-md py-3 flex justify-between items-center">
      {/* Menu button for mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded hover:bg-gray-100"
      >
        <FiMenu size={24} />
      </button>

      <h1 className="text-lg font-semibold">Player Manager Dashboard</h1>
    </header>
  );
}
