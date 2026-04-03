'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiEdit, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import ConfirmModal from '../../confirm/ConfirmModal';

const navItems = [
  { name: 'All Fixtures', href: '/dashboard/fixture', icon: <FiEdit /> },
  { name: 'Create Fixture', href: '/dashboard/fixture/create', icon: <FiPlusCircle /> },
  { name: 'All Results', href: '/dashboard/fixture/results', icon: <FiEdit /> },
  { name: 'Create Result', href: '/dashboard/fixture/results/create', icon: <FiPlusCircle /> },
];

export default function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    setIsOpen

    router.push('/auth/login/')
  }

  return (
    <aside className="w-64 h-[90vh] bg-gray-900 text-white flex flex-col p-4 rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-6">Fixtures Manager</h2>
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition ${pathname === item.href ? 'bg-gray-700' : ''
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
        <FiLogOut />
        Logout
      </button>
      <ConfirmModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleLogout}
        title="Logout?"
        description="You will be logged out."
        confirmText="Logout"
        cancelText="Cancel"
      />
    </aside>
  );
}
