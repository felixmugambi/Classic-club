'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUsers, FiEdit, FiChevronsRight, FiCalendar } from 'react-icons/fi';

const groups = [
  { name: 'Player Manager', href: '/dashboard/player', icon: <FiUsers /> },
  { name: 'Blog Manager', href: '/dashboard/blog', icon: <FiEdit /> },
  { name: 'Fixture Manager', href: '/dashboard/fixture', icon: <FiCalendar /> },
];

export default function GroupSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-[90vh] m-4 rounded-lg p-4 bg-gray-900 text-white flex flex-col gap-4 shadow-lg">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      {groups.map((group) => (
        <Link
          key={group.name}
          href={group.href}
          className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition ${
            pathname.startsWith(group.href) ? 'bg-gray-700' : ''
          }`}
        >
          {group.icon}
          {group.name}
        </Link>
      ))}
    </aside>
  );
}
