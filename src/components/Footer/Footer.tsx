"use client";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Button from "../ui/Button";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-clubBlack text-white mt-12">
      {/* Top Bar */}
      <div className="bg-[#0a0a0a] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Social Icons */}
        <div className="flex gap-4">
          <Link href="https://facebook.com" target="_blank"><FaFacebookF className="hover:text-clubRed cursor-pointer" /></Link>
          <Link href="https://instagram.com" target="_blank"><FaInstagram className="hover:text-clubRed cursor-pointer" /></Link>
          <Link href="https://twitter.com" target="_blank"><FaTwitter className="hover:text-clubRed cursor-pointer" /></Link>
          <Link href="https://youtube.com" target="_blank"><FaYoutube className="hover:text-clubRed cursor-pointer" /></Link>
        </div>

        {/* Auth Buttons */}
        {!isAuthenticated && (
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="solid">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="solid">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Useful Links */}
      <div className="bg-[#111] px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm text-gray-300">
        <div>
          <h4 className="font-semibold mb-2 text-white">Useful Links</h4>
          <ul className="space-y-1">
            <li><Link href="/pages/download-the-app" className="hover:underline">Download the App</Link></li>
            <li><Link href="/pages/help" className="hover:underline">Help</Link></li>
            <li><Link href="/pages/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/pages/terms-of-use" className="hover:underline">Terms of Use</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-white">About</h4>
          <ul className="space-y-1">
            <li><Link href="/pages/our-story" className="hover:underline">Our Story</Link></li>
            <li><Link href="/pages/careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/pages/media" className="hover:underline">Media</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-white">Fans</h4>
          <ul className="space-y-1">
            <li><Link href="/pages/membership" className="hover:underline">Membership</Link></li>
            <li><Link href="/pages/events" className="hover:underline">Events</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-black text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Classic FC. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
