'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUsers, FiEdit, FiCalendar, FiMenu, FiX } from 'react-icons/fi';
import Logo from '../ui/Logo';

const groups = [
  { name: 'Player Manager', href: '/dashboard/player', icon: <FiUsers /> },
  { name: 'Blog Manager', href: '/dashboard/blog', icon: <FiEdit /> },
  { name: 'Fixture Manager', href: '/dashboard/fixture', icon: <FiCalendar /> },
];

export default function GroupSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex">
        {/* Toggle Button (mobile only) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden fixed top-10 left-4 z-50 p-2 text-gray-800 font-bold dark:text-slate-600 bg-white rounded shadow ml-3"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>



        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 shadow-lg flex flex-col justify-start
  transform transition-transform duration-300 z-40
  ${open ? 'translate-x-0' : '-translate-x-full'} 
  md:translate-x-0 md:relative md:flex md:flex-col md:w-64 md:h-[90vh] md:m-4 md:rounded-lg`}
        >

          <h2 className="text-2xl font-bold mb-6 mt-16">Dashboard</h2>
          <nav className="flex flex-col gap-3">
            {groups.map((group) => (
              <Link
                key={group.name}
                href={group.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition ${pathname.startsWith(group.href) ? 'bg-gray-700' : ''
                  }`}
              >
                {group.icon}
                {group.name}
              </Link>
            ))}
          </nav>
        </aside>


        {/* Overlay when sidebar is open on mobile */}
        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    </>
  );
}
