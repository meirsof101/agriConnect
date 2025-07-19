// components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">AgriConnect</h3>
            <p className="text-gray-400 mb-4">
              Empowering farmers with modern technology to optimize crop yields,
              reduce costs,<br /> and build sustainable agricultural practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
            </div>
          </div>
          {/* Partners */}
            <div>
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Our Partners
                </h4>
                <ul className="space-y-2">
                <li>
                    <a href="https://sifaskillseal.com" className="text-gray-400 hover:text-white transition-colors">
                    SifaSkillSeal 
                    </a>
                </li>
                <li>
                    <a href="https://goodtimesfarm.netlify.app/" className="text-gray-400 hover:text-white transition-colors">
                    Good Times Farm
                    </a>
                </li>
                </ul>
            </div>
            {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 AgriConnect. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm">
                Made with 💚 for farmers
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;