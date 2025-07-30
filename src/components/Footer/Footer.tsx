"use client";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Button from "../ui/Button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-clubBlack text-white mt-12">
      {/* Top Bar */}
      <div className="bg-[#0a0a0a] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Social Icons */}
        <div className="flex gap-4">
          <FaFacebookF className="hover:text-clubRed cursor-pointer" />
          <FaInstagram className="hover:text-clubRed cursor-pointer" />
          <FaTwitter className="hover:text-clubRed cursor-pointer" />
          <FaYoutube className="hover:text-clubRed cursor-pointer" />
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="solid">Sign Up</Button>
          </Link>
        </div>
      </div>

      {/* Useful Links */}
      <div className="bg-[#111] px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm text-gray-300">
        <div>
          <h4 className="font-semibold mb-2 text-white">Useful Links</h4>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:underline">Download the App</Link></li>
            <li><Link href="#" className="hover:underline">Help</Link></li>
            <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:underline">Terms of Use</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-white">About</h4>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:underline">Our Story</Link></li>
            <li><Link href="#" className="hover:underline">Careers</Link></li>
            <li><Link href="#" className="hover:underline">Media</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-white">Fans</h4>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:underline">Membership</Link></li>
            <li><Link href="#" className="hover:underline">Fan Shop</Link></li>
            <li><Link href="#" className="hover:underline">Events</Link></li>
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
