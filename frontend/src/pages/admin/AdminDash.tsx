import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredUser } from "../../utils/auth";
import CreateSamplePack from "./components/CreateSamplePack";
import CreateSample from "./components/CreateSample";

type Tab = "sample-pack" | "sample";

const AdminDash = () => {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [activeTab, setActiveTab] = useState<Tab>("sample-pack");

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/admin");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="mx-auto max-w-5xl rounded-lg bg-white shadow-sm">
        
        {/* Header section */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-gray-600">Logged in as: {user.username}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("sample-pack")}
            className={`flex-1 p-4 text-center font-medium ${
              activeTab === "sample-pack"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            Sample Packs
          </button>
          <button
            onClick={() => setActiveTab("sample")}
            className={`flex-1 p-4 text-center font-medium ${
              activeTab === "sample"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            Samples
          </button>
        </div>

        {/* Tab Content content */}
        <div className="p-6 md:p-8">
          {activeTab === "sample-pack" && <CreateSamplePack />}
          {activeTab === "sample" && <CreateSample />}
        </div>
        
      </div>
    </div>
  );
};

export default AdminDash;