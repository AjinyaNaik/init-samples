import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredUser } from "../../utils/auth";
import { useLogin } from "../../hooks/userHooks";
import { useMyPurchasedSamples, useMyPurchasedSamplePacks } from "../../hooks/order.hooks";
import UserSidebar from "./components/UserSidebar";
import UserRightContent from "./components/UserRightContent";
import RetroStarfield from "./components/RetroStarfield"; 

type Tab = "packs" | "samples";

export default function UserDash() {
  const navigate = useNavigate();
  const { logout } = useLogin();
  const [activeTab, setActiveTab] = useState<Tab>("packs");

  const { 
    samplePacks, 
    getMyPurchasedSamplePacks, 
    isLoading: loadingPacks, 
    error: packsError 
  } = useMyPurchasedSamplePacks();

  const { 
    samples, 
    getMyPurchasedSamples, 
    isLoading: loadingSamples, 
    error: samplesError 
  } = useMyPurchasedSamples();

  const user = getStoredUser() || {
    id: 1,
    username: "producer_gareth",
    email: "producer@test.com",
    role: "USER" as const,
    status: "ACTIVE" as const,
    is_seller: false,
  };

  useEffect(() => {
    if (activeTab === "packs") {
      getMyPurchasedSamplePacks().catch((err) => console.error(err));
    } else {
      getMyPurchasedSamples().catch((err) => console.error(err));
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen text-zinc-50 bg-zinc-950 pt-24 px-8 pb-32">

      <RetroStarfield />

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
      <div className="max-w-7xl mx-auto mb-6 relative z-10">
        <button
          onClick={() => navigate("/catalog")}
          className="flex items-center gap-2 text-sm text-purple-400 font-semibold hover:text-purple-300 transition-colors py-2 px-4 bg-zinc-900 border border-zinc-800/80 rounded-xl hover:bg-zinc-950 shadow-md cursor-pointer animate-fade-in"
        >
          &larr; Back to Catalog
        </button>
      </div>

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-start relative z-10">
        
        <UserSidebar user={user} logout={logout} />

        <UserRightContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          samplePacks={samplePacks}
          loadingPacks={loadingPacks}
          packsError={packsError}
          samples={samples}
          loadingSamples={loadingSamples}
          samplesError={samplesError}
        />

      </div>
    </div>
  );
}