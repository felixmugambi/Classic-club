'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiUsers, FiLogOut, FiPlusCircle, FiX } from 'react-icons/fi';
import ConfirmModal from '../../confirm/ConfirmModal';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Players', href: '/dashboard/player', icon: <FiUsers /> },
  { name: 'Create Player', href: '/dashboard/player/create', icon: <FiPlusCircle /> },
];

export default function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()


  const handleLogout = async () => {
    await logout()
    setOpenModal(false)

    router.push("/auth/login")
  }

  return (
    <aside className="w-64 h-[90vh] bg-gray-900 text-white flex flex-col p-4 rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-6">Players Manager</h2>

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
          setOpenModal(true)
        }}
      >
        <FiLogOut />
        Logout
      </button>

      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleLogout}
        title="Logout?"
        description="You will be logged out."
        confirmText="Logout"
        cancelText="Cancel"
      />
    </aside>
  );
}
