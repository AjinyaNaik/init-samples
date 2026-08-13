import { useNavigate } from "react-router-dom";
import { getStoredUser } from "../../utils/auth";
import { useEffect } from "react";

const AdminDash = () => {
  const navigate = useNavigate();
  const user = getStoredUser();

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>
        {user ? (
          <p>Welcome back, {user.username} ({user.email})</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDash;