import React from "react";
import { Link, useParams } from "react-router-dom";

export default function ArticleTemplate() {
  const { slug } = useParams();

  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-8">
      
      {/* Back Link */}
      <Link
        to="/articles"
        className="text-green-300 underline hover:text-green-400 transition mb-10 inline-block"
      >
        ← Back to Articles
      </Link>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">{formattedTitle}</h1>

      {/* Description */}
      <p className="text-green-300 max-w-3xl mb-10">
        In-depth tutorials and real-world hacking techniques for {formattedTitle}. 
        Learn step-by-step exploitation, tools, commands, and security defense strategies.
      </p>

      {/* Content Section Placeholder */}
      <div className="bg-gray-900 border border-green-500 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-green-300">
          Detailed hacking walkthroughs, practical exploitation labs, commands & 
          hands-on exercises will appear here soon.
        </p>
      </div>
    </div>
  );
}
