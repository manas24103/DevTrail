import React from 'react';
import { Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200/60 bg-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <p className="text-xs text-gray-400 font-medium">
          © 2026 DevTrail. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {['Privacy Policy', 'Terms of Service', 'API Docs', 'Contact Support'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-gray-400 hover:text-teal-600 font-medium transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-3 text-gray-400">
          <Globe size={16} className="hover:text-teal-600 cursor-pointer transition-colors" />
          <Mail size={16} className="hover:text-teal-600 cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
