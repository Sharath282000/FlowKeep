'use client';

import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-950 to-black text-white p-8 overflow-hidden">
      
      {/* Floating Glow Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-sky-600 rounded-full mix-blend-soft-light blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-700 rounded-full mix-blend-soft-light blur-3xl animate-pulse-slow delay-700" />
      </div>

      <div className="max-w-lg w-full p-10 md:p-12 bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-700/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]">
        
        {/* Icon with soft pulse */}
        <div className="mb-8 flex justify-center relative">
          <div className="relative p-4 rounded-full bg-sky-500/10 border border-sky-500/40">
            <WifiOff className="h-12 w-12 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            <span className="absolute inset-0 rounded-full bg-sky-400/40 animate-ping-slow" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold mb-3 text-transparent bg-clip-text bg-linear-to-r from-sky-300 to-sky-600">
          Connection Lost
        </h1>

        <p className="text-gray-300 mb-8 text-base md:text-lg font-light leading-relaxed">
          You’re currently offline, but don’t worry — your FlowKeep data is safe and will sync automatically once you’re back online.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center cursor-pointer px-6 py-3 border border-transparent text-xs md:text-sm font-medium rounded-full shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Retry Connection
          </button>
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
    </main>
  );
}

/* ✅ Add this to your global.css or Tailwind config */
