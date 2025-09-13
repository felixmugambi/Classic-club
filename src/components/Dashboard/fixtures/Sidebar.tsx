'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiEdit, FiPlusCircle, FiLogOut } from 'react-icons/fi';

const navItems = [
  { name: 'All Fixtures', href: '/dashboard/fixture', icon: <FiEdit /> },
  { name: 'Create Fixture', href: '/dashboard/fixture/create', icon: <FiPlusCircle /> },
  { name: 'All Results', href: '/dashboard/fixture/results', icon: <FiEdit /> },
  { name: 'Create Result', href: '/dashboard/fixture/results/create', icon: <FiPlusCircle /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-[90vh] bg-gray-900 text-white flex flex-col p-4 rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-6">Fixtures Manager</h2>
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
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
