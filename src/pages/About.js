import React from "react";

export default function About() {
  return (
    <div>

      {/* Heading */}
      <div className="mb-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About Cyber Pinnacle
        </h1>

        <div className="space-y-6 text-lg text-green-300 leading-relaxed max-w-5xl">

          <p>
            Cyber Pinnacle is a forward-thinking cybersecurity organization
            dedicated to advancing digital security through education,
            innovation, security research, ethical hacking, and
            modern defensive technologies. Founded with the vision of
            building a stronger and safer digital future, Cyber Pinnacle
            focuses on empowering students, professionals, institutions,
            startups, and businesses with practical cybersecurity knowledge
            and real-world technical skills.
          </p>

          <p>
            Cyber Pinnacle was established to bridge the growing gap between cybersecurity
            awareness and practical technical expertise, especially among
            young talents and emerging technology communities across Africa.
          </p>

          <p>
            Through bootcamps, workshops, outreach programs, CTF activities,
            and hands-on learning experiences, Cyber Pinnacle develops the next generation
            of ethical hackers, SOC analysts, and security researchers.
          </p>

          <p>
            Cybersecurity is not only a profession, but a responsibility necessary for
            protecting digital trust, privacy, businesses, and national development.
          </p>

        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-8">

        <div className="border border-green-500/20 rounded-xl p-6 bg-green-500/5">
          <h2 className="text-2xl font-semibold mb-4">
            🌍 Our Vision
          </h2>

          <p className="text-green-300 leading-relaxed">
            To become one of Africa’s leading cybersecurity communities
            and innovation-driven organizations, inspiring a generation
            of ethical hackers, security researchers, and digital leaders
            capable of shaping a safer technological future.
          </p>
        </div>

        <div className="border border-green-500/20 rounded-xl p-6 bg-green-500/5">
          <h2 className="text-2xl font-semibold mb-4">
            💡 Our Mission
          </h2>

          <p className="text-green-300 leading-relaxed">
            To provide accessible cybersecurity education, practical
            technical training, security awareness, research opportunities,
            and innovative security solutions that empower individuals
            and organizations to stay ahead of evolving cyber threats.
          </p>
        </div>

      </div>

    </div>
  );
}