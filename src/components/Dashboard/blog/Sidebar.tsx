'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiEdit, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import ConfirmModal from '../../confirm/ConfirmModal';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'All Blogs', href: '/dashboard/blog', icon: <FiEdit /> },
  { name: 'Create Blog', href: '/dashboard/blog/create', icon: <FiPlusCircle /> },
];

export default function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)
  const {logout} = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)

    router.push("/auth/login");
  }

  return (
    <aside className="w-64 h-[90vh] bg-gray-900 text-white flex flex-col p-4 rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-6">Blog Manager</h2>
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition ${
              pathname === item.href ? 'bg-gray-700' : ''
            }`}
            onClick={closeSidebar}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <button
        className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-300"
        onClick={() => {
          setIsOpen(true)
        }}
      >

        <ConfirmModal
        open = {isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleLogout}
        title="Logout?"
        description="You will be logged out."
        confirmText="Logout"
        cancelText="Cancel"
        />
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}
