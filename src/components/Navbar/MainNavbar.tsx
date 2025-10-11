"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Logo from "../ui/Logo";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  {
    title: "Latest",
    submenu: [
      { title: "All News", href: "/news" },
      { title: "Latest News", href: "/news" },
    ],
  },
  {
    title: "Fixtures",
    submenu: [
      { title: "All Fixtures", href: "/matches" },
      { title: "Results", href: "/results" },
      { title: "League Table", href: "/fixtures/matches" },
    ],
  },

  {
    title: "Players",
    submenu: [
      { title: "Meet Our Players", href: "/players" },
    ],
  },
  {
    title: "More",
    submenu: [
      { title: "About Us", href: "/pages/about-the-club" },
      { title: "history", href: "/pages/about-the-club/history" },
    ],
  },
];

const MainNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();


  return (
    <nav className="bg-red-700 text-white px-4 py-3 z-40 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left */}

        <div className="flex ml-2">
          <Link href='/'>
            <Logo />
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden focus:outline-none ml-2"
          >
            <FiMenu className="text-2xl" />
          </button>
        </div>
        <div className="flex gap-4">
          {/* Hamburger button */}


          {/* Desktop nav */}
          <div className="hidden md:flex gap-3 text-sm font-medium relative">
            {navLinks.map((link) => (
              <div key={link.title} className="relative group">
                <button className="relative group-hover:text-white transition">
                  <span className="text-xl px-2 font-bold">{link.title}</span>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300"></span>
                </button>

                {/* Submenu dropdown */}
                {link.submenu && (
                  <div className="absolute left-0 top-full mt-2 w-64 rounded shadow-lg bg-white text-black z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-gray-800 relative group/submenu hover:text-clubRed"
                      >
                        <span>{sub.title}</span>
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-clubRed group-hover/submenu:w-full transition-all duration-300"></span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* My Classic (auth-based) */}
            <div className="relative group">
              <button className="relative group-hover:text-white transition px-2">
                <span className="text-xl px-2 font-bold">{isAuthenticated ? "My Classic" : "Already Signed Up?"}</span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300"></span>
              </button>

              <div className="absolute left-0 top-full mt-2 w-64 rounded shadow-lg bg-white text-black z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {isAuthenticated ? (
                  <>
                    <Link href="/classic" className="block px-4 py-2 text-sm hover:text-clubRed">
                      My Profile
                    </Link>
                    <Link href="/classic" className="block px-4 py-2 text-sm hover:text-clubRed">
                      Edit Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="block px-4 py-2 text-sm hover:text-clubRed">
                      Log In
                    </Link>
                    <Link href="/auth/signup" className="block px-4 py-2 text-sm hover:text-clubRed">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Search or other icons */}
        <div className="flex items-center gap-4">

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="bg-white text-black w-72 h-full p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="mb-6 flex items-center gap-2 text-red-700 font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              <FiX className="text-2xl" /> Close
            </button>

            {/* Links */}
            {navLinks.map((link) => (
              <div key={link.title} className="mb-4">
                <button
                  onClick={() =>
                    setOpenSubmenu(openSubmenu === link.title ? null : link.title)
                  }
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-800"
                >
                  {link.title}
                  {link.submenu && (
                    <FiChevronDown
                      className={`transition-transform ${openSubmenu === link.title ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {openSubmenu === link.title && link.submenu && (
                  <div className="mt-2 ml-4 space-y-2">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className="block text-sm text-gray-600 hover:text-red-700"
                        onClick={() => setMobileOpen(false)} // close after click
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Auth section */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-gray-700">
                {isAuthenticated ? "My Classic" : "Account"}
              </h4>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/classic"
                    className="block mb-2 text-sm text-gray-600 hover:text-red-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/profile/edit"
                    className="block text-sm text-gray-600 hover:text-red-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    Edit Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block mb-2 text-sm text-gray-600 hover:text-red-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block text-sm text-gray-600 hover:text-red-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
