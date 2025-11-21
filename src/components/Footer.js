import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Branding / Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-green-600/10 flex items-center justify-center text-green-400 font-bold">
            CP
          </div>
          <div>
            <div className="text-white font-semibold">Cyber Pinnacle</div>
            <div className="text-sm text-gray-400">Secured Network</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <div className="text-sm">
            <FaEnvelope className="inline mr-2 text-green-400" />
            <a className="hover:text-green-300" href="mailto:cyberpinnacle7@gmail.com">
              cyberpinnacle7@gmail.com
            </a>
          </div>
          <div className="text-sm mt-1">
            <FaPhone className="inline mr-2 text-green-400" />
            <a className="hover:text-green-300" href="tel:+2349134812608">
              +234 913 481 2608
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a className="hover:text-green-300" href="https://facebook.com/cyberpinnacle" target="_blank" rel="noreferrer">
            <FaFacebook size={20} />
          </a>
          <a className="hover:text-green-300" href="https://instagram.com/cyber_pinnacle" target="_blank" rel="noreferrer">
            <FaInstagram size={20} />
          </a>
          <a className="hover:text-green-300" href="https://x.com/cyber_pinnacle" target="_blank" rel="noreferrer">
            <FaTwitter size={20} />
          </a>
          <a className="hover:text-green-300" href="https://tiktok.com/@cyber_pinnacle" target="_blank" rel="noreferrer">
            <FaTiktok size={20} />
          </a>
          <a className="hover:text-green-300" href="https://youtube.com/@cyber_pinnacle" target="_blank" rel="noreferrer">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 pb-4">
        © {new Date().getFullYear()} Cyber Pinnacle. All rights reserved.
      </div>
    </footer>
  );
}
