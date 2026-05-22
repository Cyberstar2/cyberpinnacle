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

          <h2 className="text-3xl font-bold mb-10">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="border border-green-500/10 bg-[#07110d] rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-4">
                Ethical Hacking
              </h3>

              {/* Ethical Hacking */}
<p className="text-green-300 leading-relaxed">
  Develop practical offensive security skills including
  penetration testing, vulnerability assessment,
  reconnaissance, exploitation methodologies,
  and ethical hacking techniques used in real-world environments.
</p>

{/* Cybersecurity Training */}
<p className="text-green-300 leading-relaxed">
  Access structured cybersecurity learning programs,
  hands-on labs, workshops, and technical mentorship
  designed for students, beginners, and aspiring professionals.
</p>

{/* Security Research */}
<p className="text-green-300 leading-relaxed">
  Explore emerging cyber threats, threat intelligence,
  defensive security strategies, digital investigations,
  and modern cybersecurity technologies shaping the future of security.
</p>
                          </div>

          </div>

        </div>

      </div>

    </div>
  );
}