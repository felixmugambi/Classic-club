// app/layout.tsx
'use client';

import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '../components/context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <html lang="en">
      <body>
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
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
