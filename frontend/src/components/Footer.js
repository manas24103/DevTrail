import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t py-6 px-10 flex flex-col items-center gap-3.5 border-border-light bg-white" style={{ padding: '24px 40px' }}>
      <p className="text-xs text-muted-text">
        © 2026 DevTrail. All rights reserved.
      </p>
      <div className="flex gap-8">
        {['Privacy Policy', 'Terms of Service', 'API Docs', 'Contact Support'].map(link => (
          <a key={link} href="#" className="text-xs text-muted-text no-underline">
            {link}
          </a>
        ))}
      </div>
      <div className="flex gap-3 text-muted-text">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 3c-3 4-3 14 0 18M12 3c3 4 3 14 0 18"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
