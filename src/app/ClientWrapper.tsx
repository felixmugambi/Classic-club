'use client';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '../components/context/AuthContext';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <AuthProvider>
      {isDashboard ? (
        children
      ) : (
        <>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </AuthProvider>
  );
}
