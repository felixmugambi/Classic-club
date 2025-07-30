// components/navbar/TopBar.tsx
"use client";

import { FaUser } from "react-icons/fa";
import Button from "../ui/Button";
import { useAuth } from "../context/AuthContext";

const TopBar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-black text-white px-4 py-2 flex justify-between items-center text-sm">
      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <FaUser className="text-lg" />
            <span>Hi, {user?.name || 'Guest'}</span>
          </div>
        ) : (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <FaUser className="text-lg" />
              <span>Sign In</span>
            </div>
            <div className="absolute top-8 left-0 bg-white text-black shadow-lg rounded w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <Button variant="ghost" fullWidth>
                <a href="/auth/login">Login</a>
              </Button>
              <Button variant="ghost" fullWidth>
                <a href="/auth/signup">Sign Up</a>
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <img src="/Adidas-logo.png" alt="Adidas" className="h-6" />
        <img src="/nike-logos-swoosh-white.webp" alt="Nike" className="h-6" />
      </div>
    </div>
  );
};

export default TopBar;
