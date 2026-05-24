import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 px-6 pt-24 pb-20">

      <div className="max-w-6xl mx-auto text-center">

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-5xl mx-auto">
          Become an Elite Cybersecurity Professional
        </h1>

        {/* Hero Description */}
        <p className="text-green-300 mt-6 text-lg leading-8 max-w-3xl mx-auto">
          Cyber Pinnacle is a cybersecurity organization dedicated to developing
  the next generation of ethical hackers, security researchers,
  and digital defenders through practical training,
  cybersecurity innovation, security awareness,
  and real-world technical experience.
  We equip individuals and organizations with the skills,
  knowledge, and mindset needed to navigate and secure
  today’s evolving digital landscape.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            to="/courses"
            className="bg-green-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-green-400 transition"
          >
            Explore Courses
          </Link>

          <Link
            to="/training"
            className="border border-green-500 px-8 py-3 rounded-lg font-bold hover:bg-green-500 hover:text-black transition"
          >
            Join Training
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-[#07110d] border border-green-500/10 rounded-2xl p-8">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

            <div>
              <h2 className="text-3xl font-bold">450+</h2>
              <p className="text-green-300 mt-2">
                Students Trained
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">25+</h2>
              <p className="text-green-300 mt-2">
                Specialized Courses
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">10+</h2>
              <p className="text-green-300 mt-2">
                Countries Reached
              </p>
            </div>

          </div>

        </div>

        {/* Focus Areas */}
        <div className="mt-24">

          {/* What We Offer */}
<div className="mt-24">

  <h2 className="text-3xl font-bold mb-4">
    What We Offer
  </h2>

  <p className="text-green-300 max-w-3xl mx-auto mb-12 leading-8">
    Cyber Pinnacle delivers comprehensive cybersecurity education,
    technical training, security awareness, and innovation-driven
    programs designed to prepare individuals and organizations for
    today’s evolving digital threats and opportunities.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* Cybersecurity Training */}
    <div className="border border-green-500/10 bg-[#07110d] rounded-xl p-6">
      <h3 className="text-2xl font-semibold mb-4">
        Cybersecurity Training
      </h3>

      <p className="text-green-300 leading-relaxed">
        Structured hands-on training programs covering foundational
        and advanced cybersecurity concepts for students,
        professionals, and aspiring security experts.
      </p>
    </div>

    {/* Ethical Hacking */}
    <div className="border border-green-500/10 bg-[#07110d] rounded-xl p-6">
      <h3 className="text-2xl font-semibold mb-4">
        Ethical Hacking & Penetration Testing
      </h3>

      <p className="text-green-300 leading-relaxed">
        Learn offensive security techniques including reconnaissance,
        vulnerability assessment, exploitation methodologies,
        web security testing, and real-world penetration testing practices.
      </p>
    </div>

    {/* Security Awareness */}
    <div className="border border-green-500/10 bg-[#07110d] rounded-xl p-6">
      <h3 className="text-2xl font-semibold mb-4">
        Security Awareness
      </h3>

      <p className="text-green-300 leading-relaxed">
        Promote digital safety through cybersecurity awareness programs,
        workshops, seminars, and educational campaigns for schools,
        organizations, and communities.
      </p>
    </div>

    {/* Digital Forensics */}
    <div className="border border-green-500/10 bg-[#07110d] rounded-xl p-6">
      <h3 className="text-2xl font-semibold mb-4">
        Digital Forensics
      </h3>

      <p className="text-green-300 leading-relaxed">
        Explore cyber investigations, evidence analysis,
        incident response methodologies, and forensic techniques
        used in modern cybersecurity operations.
      </p>
    </div>

    {/* Research & Innovation */}
    <div className="border border-green-500/10 bg-[#07110d] rounded-xl p-6">
      <h3 className="text-2xl font-semibold mb-4">
        Security Research & Innovation
      </h3>

      <p className="text-green-300 leading-relaxed">
        Conduct research on emerging cyber threats,
        defensive technologies, threat intelligence,
        and innovative solutions shaping the future of cybersecurity.
      </p>
    </div>

    {/* Mentorship */}
    <div className="border border-green-500/10 bg-[#07110d] rounded-xl p-6">
      <h3 className="text-2xl font-semibold mb-4">
        Mentorship & Community
      </h3>

      <p className="text-green-300 leading-relaxed">
        Build a strong cybersecurity community through mentorship,
        collaborative learning, networking opportunities,
        technical events, and career development initiatives.
      </p>
    </div>

  </div>

</div>
  );
}