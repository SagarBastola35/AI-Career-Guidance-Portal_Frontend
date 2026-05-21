import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✨</span>
              <span className="font-bold text-xl">CareerAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered career guidance platform helping you navigate your
              professional journey with intelligent insights.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-indigo-400 transition"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/career-recommendation"
                  className="hover:text-indigo-400 transition"
                >
                  Career AI
                </a>
              </li>
              <li>
                <a href="/ai-chat" className="hover:text-indigo-400 transition">
                  AI Chat Assistant
                </a>
              </li>
              <li>
                <a
                  href="/resume-analyzer"
                  className="hover:text-indigo-400 transition"
                >
                  Resume Analyzer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Career Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Interview Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Salary Guide
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition text-gray-400 hover:text-white"
              >
                Git
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition text-gray-400 hover:text-white"
              >
                Tw
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition text-gray-400 hover:text-white"
              >
                Li
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition text-gray-400 hover:text-white"
              >
                ✉️
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              SagarBastola © 2026 CareerAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
