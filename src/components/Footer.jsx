import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = ['Tech', 'AI', 'Health', 'Education', 'Finance', 'Productivity'];
  const platformLinks = [
    { name: 'Browse Ideas', href: '#' },
    { name: 'Submit Idea', href: '#' },
    { name: 'Profile', href: '#' }
  ];

  return (
    <footer className="relative bg-[#0b0f19] text-gray-400 font-sans pt-16 pb-8 overflow-hidden w-full">
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3 group">
              <div className="p-2.5 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30 group-hover:border-purple-400 transition-colors duration-300">
                {/* Lightbulb SVG */}
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Idea<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Vault</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              A platform to share, validate, and refine innovative startup ideas with the community.
            </p>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-purple-400 transition-colors duration-200 block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Categories</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {categories.map((category) => (
                <li key={category}>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-200 block">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Connect</h4>
            
            <div className="flex items-center gap-3">
              {/* X / Twitter */}
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300" aria-label="X (Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* GitHub */}
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300" aria-label="GitHub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              {/* Email */}
              <a href="mailto:contact@ideavault.com" className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300" aria-label="Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </a>
            </div>

            <div className="pt-2">
              <a href="mailto:contact@ideavault.com" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 border-b border-gray-700 hover:border-purple-400 pb-0.5">
                contact@ideavault.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {currentYear} IdeaVault. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}