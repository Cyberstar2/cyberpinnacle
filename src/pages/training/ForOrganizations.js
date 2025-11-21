import React from "react";

export default function ForOrganizations() {
  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Training for Organizations</h1>
        <p className="text-green-300 mb-8 max-w-3xl">
          CyberPinnacle provides custom training for universities, startups, NGOs and 
          companies that want to build internal cybersecurity capacity.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-900 border border-green-500 rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-3">What We Offer</h2>
            <ul className="text-sm text-green-200 space-y-2">
              <li>• Corporate red team / blue team workshops</li>
              <li>• Awareness trainings for non-technical staff</li>
              <li>• University bootcamps & hackathons</li>
              <li>• Custom labs based on your environment</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-green-500 rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-3">Why CyberPinnacle?</h2>
            <ul className="text-sm text-green-200 space-y-2">
              <li>• Youth-focused but enterprise-ready content</li>
              <li>• Practical, lab-first teaching</li>
              <li>• Flexible delivery — online or on-site</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 border border-green-500 rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-3">Request a Proposal</h2>
          <p className="text-sm text-green-200 mb-4">
            Contact us with details of your organization, target audience and goals.
          </p>
          <p className="text-sm text-green-200">
            Email: <span className="font-semibold">cyberpinnacle7@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
