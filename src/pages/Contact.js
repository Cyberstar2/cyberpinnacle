import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaLinkedin
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">

      <h1 className="text-4xl font-bold text-center text-green-400 mb-10">
        Contact Us
      </h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Contact Information */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Get in Touch
          </h2>

          <div className="space-y-4">
            <p className="flex items-center space-x-3 text-lg">
              <FaEnvelope className="text-green-400" />
              <span>cyberpinnacle7@gmail.com</span>
            </p>

            <p className="flex items-center space-x-3 text-lg">
              <FaPhone className="text-green-400" />
              <span>+234 913 481 2608</span>
            </p>
          </div>

          {/* Social Media */}
          <h3 className="text-xl font-semibold mt-8 mb-4 text-green-300">
            Follow Us
          </h3>

          <div className="flex space-x-6 text-2xl">

            {/* SAFE: no href="#" or javascript:void(0) */}
            <a href="https://facebook.com/profile.php?id=61582365811291" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>

            <a href="https://instagram.com/cyber_pinnacle" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://x.com/cyber_pinnacle" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>

            <a href="https://tiktok.com/@cyber_pinnacle" target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>

            <a href="https://youtube.com/@cyber_pinnacle" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>

            <a href="https://Linkedin.com/company/the-cyberpinnacle" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-400"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-400"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-400"
          ></textarea>

          <button
            type="button"
            className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition"
          >
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}