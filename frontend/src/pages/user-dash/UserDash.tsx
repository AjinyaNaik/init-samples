import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStoredUser } from "../../utils/auth";
import { useLogin } from "../../hooks/userHooks"; 

export default function UserDash() {
  const navigate = useNavigate();
  const { logout } = useLogin(); 
  const user = getStoredUser() || {
    id: 999,
    username: "producer_gareth",
    email: "producer@test.com",
    role: "USER" as const,
    status: "ACTIVE" as const,
    is_seller: false,
  };

  const mockPacks = [
    { id: 1, name: "Retro Soul Essentials", tracks: 2, artwork: "/uploads/covers/soul-artwork.jpg" },
  ];

  const mockSamples = [
    { id: 4, name: "Mellow Rhodes Chords", type: "Mids", url: "/uploads/audio/rhodes-chords.wav" },
    { id: 5, name: "Whisper Vocal Phrase", type: "Vocals", url: "/uploads/audio/whisper-phrase.wav" },
  ];

  return (
    <div className="min-h-screen text-zinc-50 bg-zinc-950 pt-24 px-8 pb-32">
      <style>{`
        @keyframes dash-neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #d8b4fe, 0 0 40px #a855f7, 0 0 80px #a855f7;
            opacity: 1;
          }
          20%, 24%, 55% {
            text-shadow: none;
            opacity: 0.4;
          }
        }
      `}</style>

      {/* Back Arrow Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-purple-400 font-semibold hover:text-purple-300 transition-colors py-2 px-4 bg-zinc-900 border border-zinc-800/80 rounded-xl hover:bg-zinc-950 shadow-md cursor-pointer"
        >
          &larr; Back
        </button>
      </div>

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
        
        {/* Left Side Column: User Info Card (Spans 2/5) */}
        <div 
          className="md:col-span-2 border border-zinc-800 rounded-[32px] p-8 shadow-lg flex flex-col gap-6"
          style={{ backgroundColor: "rgba(24, 24, 27, 0.92)" }}
        >
          <h2 
            className="text-4xl text-purple-300 tracking-wide font-normal leading-tight"
            style={{ 
              fontFamily: "'Shrikhand', cursive",
              animation: "dash-neon-flicker 4s infinite alternate"
            }}
          >
            My Profile
          </h2>

          <div className="space-y-4 border-t border-zinc-800/80 pt-6">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">Username</span>
              <span className="font-bold text-zinc-200 text-base">{user.username}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">Email Address</span>
              <span className="font-bold text-zinc-200 text-base">{user.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-0.5">Account Status</span>
              <span className="inline-block text-xs uppercase font-extrabold tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 px-3 py-1 rounded-full mt-1 capitalize">
                {user.status}
              </span>
            </div>
          </div>

          {/* === SIGN OUT BUTTON === */}
          <button
            onClick={logout} // <-- Trigger central session cleanup
            className="text-center text-sm text-red-400 font-semibold hover:text-red-300 transition-all duration-300 py-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:bg-red-950/20 hover:border-red-900/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] shadow-md mt-4 cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        {/* Right Side Column: Owned Content Box (Spans 3/5) */}
        <div 
          className="md:col-span-3 border border-zinc-800 rounded-[32px] p-8 shadow-lg flex flex-col gap-8 h-full"
          style={{ backgroundColor: "rgba(24, 24, 27, 0.8)" }}
        >
          {/* User Packs Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-zinc-100 flex items-center justify-between">
              <span>My Premium Packs</span>
              <span className="text-xs font-normal text-zinc-500">{mockPacks.length} packs</span>
            </h2>

            <div className="flex flex-col gap-3">
              {mockPacks.map((pack) => (
                <Link
                  key={pack.id}
                  to={`/catalog/pack/${pack.id}`}
                  className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between hover:border-zinc-700 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-lg bg-cover bg-center shrink-0"
                      style={pack.artwork ? { backgroundImage: `url(${pack.artwork})` } : undefined}
                    ></div>
                    <div>
                      <h3 className="font-bold text-zinc-100 group-hover:text-purple-400 transition-colors duration-200">
                        {pack.name}
                      </h3>
                      <p className="text-xs text-zinc-500">{pack.tracks} tracks included</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-purple-400 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* User Standalone Samples Section */}
          <div className="border-t border-zinc-800/80 pt-6">
            <h2 className="text-2xl font-bold mb-6 text-zinc-100 flex items-center justify-between">
              <span>My Standalone Tracks</span>
              <span className="text-xs font-normal text-zinc-500">{mockSamples.length} tracks</span>
            </h2>

            <div className="flex flex-col gap-3 overflow-y-auto max-h-96 pr-1">
              {mockSamples.map((sample) => (
                <div 
                  key={sample.id} 
                  className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between hover:border-zinc-700 transition-colors duration-300"
                >
                  <div>
                    <h3 className="font-bold text-zinc-100">{sample.name}</h3>
                    <p className="text-xs text-zinc-500 capitalize">{sample.type}</p>
                  </div>
                  <audio src={sample.url} controls className="max-w-[150px] md:max-w-xs" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}