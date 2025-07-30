"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
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
      { title: "League Table", href: "/fixtures/league-table" },
      { title: "Add Fixtures to Calendar", href: "/fixtures/calendar" },
      { title: "All Fixtures", href: "/matches" },
      { title: "Results", href: "/results" },
    ],
  },
  {
    title: "Fans",
    submenu: [
      { title: "Fan Zone", href: "/fans/zone" },
      { title: "Top Supporters", href: "/fans/supporters" },
    ],
  },
  {
    title: "Players",
    submenu: [
      { title: "Team Roster", href: "/players/roster" },
      { title: "Statistics", href: "/players/stats" },
      {title: "Meet Our Players", href: "/players"}
    ],
  },
  {
    title: "More",
    submenu: [
      { title: "About Us", href: "/more/about" },
      { title: "Contact", href: "/more/contact" },
    ],
  },
];

const MainNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-red-700 text-white px-4 py-3 z-40 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileOpen(true)} className="md:hidden">
            <FiMenu className="text-2xl" />
          </button>
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex gap-6 text-sm font-medium relative">
            {navLinks.map((link) => (
              <div key={link.title} className="relative group">
                <button className="relative group-hover:text-white transition">
                  <span>{link.title}</span>
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
              <button className="relative group-hover:text-white transition">
                <span>{isAuthenticated ? "My Classic" : "Already Signed Up?"}</span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300"></span>
              </button>

              <div className="absolute left-0 top-full mt-2 w-64 rounded shadow-lg bg-white text-black z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {isAuthenticated ? (
                  <>
                    <Link href="/classic" className="block px-4 py-2 text-sm relative group/submenu hover:text-clubRed">
                      <span>My Profile</span>
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-clubRed group-hover/submenu:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href="/profile/edit" className="block px-4 py-2 text-sm relative group/submenu hover:text-clubRed">
                      <span>Edit Profile</span>
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-clubRed group-hover/submenu:w-full transition-all duration-300"></span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="block px-4 py-2 text-sm relative group/submenu hover:text-clubRed">
                      <span>Log In</span>
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-clubRed group-hover/submenu:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href="/auth/signup" className="block px-4 py-2 text-sm relative group/submenu hover:text-clubRed">
                      <span>Sign Up</span>
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-clubRed group-hover/submenu:w-full transition-all duration-300"></span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Search or other icons */}
        <div className="flex items-center gap-4">🔍</div>
      </div>
    </nav>
  );
};

export default MainNavbar;
