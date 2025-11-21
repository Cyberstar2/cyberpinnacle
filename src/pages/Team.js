import React from "react";
import sayfullah from "../assets/team/sayfullah.png";
import hudhayfah from "../assets/team/hudhayfah.png";
import fauziyah from "../assets/team/fauziyah.png";
import rasheedah from "../assets/team/rasheedah.png";
import oganija from "../assets/team/oganija.png";
import ajara from "../assets/team/ajara.png";
import basheerat from "../assets/team/basheerat.jpg";
import aishat from "../assets/team/aishat.png";
import lawrence from "../assets/team/lawrence.png";
import busari from "../assets/team/busari.png";
import masturoh from "../assets/team/masturoh.png";
import david from "../assets/team/david.png";
import habeebah from "../assets/team/habeebah.png";
import kabir from "../assets/team/kabir.png";



const teamMembers = [
  {
    name: "Abdul-Roheem Abdul-Razaq (Sayfullah)",
    role: "Founder, Lead Cybersecurity Analyst, Penetration Tester",
    image: sayfullah,
  },
  {
    name: "Abdulqodir Hudhayfah",
    role: "Deputy Lead Cybersecurity Analyst",
    image: hudhayfah,
  },
  {
    name: "Adenike Fauziyah",
    role: "Technical Writer",
    image: fauziyah,
  },
  {
    name: "Haruna Rasheedah",
    role: "Technical Writer",
    image: rasheedah,
  },
  {
    name: "Abdullah Oganija Sherrifdeen",
    role: "Operation Manager 1",
    image: oganija,
  },
  {
    name: "Mubarak Ajara",
    role: "Deputy Operation Manager",
    image: ajara,
  },
  {
    name: "Abdulrazaq Basheerat Alaba",
    role: "Operation Manager 2",
    image: basheerat,
  },
  {
    name: "Aishat Alawaye",
    role: "Business Support Specialist",
    image: aishat,
  },
  {
    name: "Lawrence",
    role: "Business Support Specialist",
    image: lawrence,
  },
  {
    name: "Ahmad Busari",
    role: "Chief Technology Officer (CTO)",
    image: busari,
  },
  {
    name: "Masturoh",
    role: "IT Associate",
    image: masturoh,
  },
  {
    name: "David",
    role: "Strategist & Policy Analyst, Penetration Tester",
    image: david,
  },
  {
    name: "Habeebah",
    role: "Strategist & Policy Analyst",
    image: habeebah,
  },
  {
    name: "Muhammad Kabir",
    role: "Visual & Creative Designer (VCD)",
    image: kabir,
  },
];


const galleryImages = [
  "https://i.imgur.com/ybZpOaK.jpg",
  "https://i.imgur.com/DZVf7Oo.jpg",
  "https://i.imgur.com/SX2SYuY.jpg",
  "https://i.imgur.com/ZFtRsrN.jpg",
  "https://i.imgur.com/4bYg3aQ.jpg",
  "https://i.imgur.com/ohLdzQp.jpg",
  "https://i.imgur.com/NXkqU74.jpg",
  "https://i.imgur.com/6iqZ2sy.jpg",
];

function Team() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-16 font-mono">
      <h1 className="text-4xl font-bold text-center text-green-400 mb-10 border-b-2 border-green-500 inline-block">
        Meet Our Team
      </h1>

      {/* Team Members */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-2xl p-6 text-center hover:scale-105 hover:shadow-green-400 transition-all duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-green-400 object-cover"
            />
            <h2 className="text-lg font-semibold text-green-300">{member.name}</h2>
            <p className="text-green-500 text-sm mt-2">{member.role}</p>
          </div>
        ))}
      </div>

      {/* Gallery */}
      <h2 className="text-3xl font-bold text-center text-green-400 mb-8 border-b-2 border-green-500 inline-block">
        Our Gallery
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {galleryImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery ${index}`}
            className="rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}

export default Team;
