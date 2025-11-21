import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaYoutube,
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
          <h3 className="text-xl font-semibold mt-8 mb-4 text-green-300">Follow Us</h3>
          <div className="flex space-x-6 text-2xl">
            <a href="#" className="hover:text-green-400"><FaFacebook /></a>
            <a href="#" className="hover:text-green-400"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400"><FaTwitter /></a>
            <a href="#" className="hover:text-green-400"><FaTiktok /></a>
            <a href="#" className="hover:text-green-400"><FaYoutube /></a>
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

          <button className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition">
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}
