"use client";

import Image from "next/image";
import { ReactNode } from "react";

const AuthWrapper = ({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center space-y-2">
          <Image src="/club-logo.png" alt="Club Logo" width={60} height={60} className="mx-auto" />
          <h1 className="text-2xl font-bold text-clubRed">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div className="space-y-4">{children}</div>
        {footer}
      </div>
    </div>
  );
};

export default AuthWrapper;
