import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getStoredUser } from "../../utils/auth";
import { useLogin } from "../../hooks/userHooks";
import { useMyPurchasedSamples, useMyPurchasedSamplePacks } from "../../hooks/order.hooks";
import UserSidebar from "./components/UserSidebar";
import UserRightContent from "./components/UserRightContent";
import RetroStarfield from "../../components/shared/RetroStarfield"; 

type Tab = "packs" | "samples";

export default function UserDash() {
  const navigate = useNavigate();
  const { logout } = useLogin();
  const [searchParams] = useSearchParams();

  const initialTab = (searchParams.get("tab") as Tab) || "packs";
  const highlightId = searchParams.get("highlightId");
  
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [showReceiptBanner, setShowReceiptBanner] = useState(false);

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

  useEffect(() => {
    if (highlightId) {
      setShowReceiptBanner(true);
      const timer = setTimeout(() => {
        setShowReceiptBanner(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [highlightId]);

  return (
    <div className="min-h-screen text-zinc-50 bg-zinc-950 pt-24 px-8 pb-32 relative overflow-hidden">

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

        @keyframes slide-down {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Slide-Down Receipt Notification Banner */}
      {showReceiptBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-xl bg-zinc-900/95 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-md rounded-2xl p-4 flex items-center justify-between gap-4 animate-slide-down">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-100">Order Receipt Emailed</h4>
                <p className="text-xs text-zinc-400">Check your inbox, or spam folder if you do not see it.</p>
              </div>
            </div>
            <button
              onClick={() => setShowReceiptBanner(false)}
              className="text-zinc-400 hover:text-zinc-200 p-1 transition-colors cursor-pointer"
              title="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mb-6 relative z-10">
        <button
          onClick={() => navigate("/catalog")}
          className="flex items-center gap-2 text-sm text-purple-400 font-semibold hover:text-purple-300 transition-colors py-2 px-4 bg-zinc-900 border border-zinc-800/80 rounded-xl hover:bg-zinc-950 shadow-md cursor-pointer animate-fade-in"
        >
          &larr; Back to Catalog
        </button>
      </div>

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
          highlightId={highlightId}
        />
      </div>
    </div>
  );
}