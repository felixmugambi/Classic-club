'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUsers, FiLogOut, FiPlusCircle, FiX } from 'react-icons/fi';

const navItems = [
  { name: 'Players', href: '/dashboard/player', icon: <FiUsers /> },
  { name: 'Create Player', href: '/dashboard/player/create', icon: <FiPlusCircle /> },
];

export default function Sidebar({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed lg:static top-0 left-0 h-full bg-gray-900 text-white flex flex-col p-4 transition-transform z-50
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 rounded-xl md:translate-x-0 w-64 lg:w-80`}
    >
      {/* Close button for mobile */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 hidden md:block">Player Manager</h2>

      <div className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition ${
              pathname === item.href ? 'bg-gray-700' : ''
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <button
        className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-300"
        onClick={() => {
          localStorage.clear();
          window.location.href = '/auth/login';
        }}
      >
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}
