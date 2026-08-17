import type { User } from "../../../utils/dtos/auth.dto";

interface UserSidebarProps {
  user: User;
  logout: () => void;
}

export default function UserSidebar({ user, logout }: UserSidebarProps) {
  return (
    <div 
      className="md:col-span-2 border border-zinc-800 rounded-[32px] p-8 shadow-lg flex flex-col gap-6"
      style={{ backgroundColor: "rgba(24, 24, 27, 1)" }}
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

      <button
        onClick={logout}
        className="text-center text-sm text-red-400 font-semibold hover:text-red-300 transition-all duration-300 py-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:bg-red-950/20 hover:border-red-900/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] shadow-md mt-4 cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}