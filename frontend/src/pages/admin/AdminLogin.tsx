import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/userHooks'; 

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { login, isLoading } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login(email, password);
      
      if (data.user.role === 'ADMIN') {
        navigate('/admin/dashboard'); 
      } 
      else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Unauthorized: Admin access required');
      }
    } 
    catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-lg border border-gray-300 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Admin Login</h2>
        
        {error && (
          <div className="mb-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Note the subtle update below passing the isLoading state to the form button */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-2 flex justify-center rounded bg-blue-600 p-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;