import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Catalog from './pages/catalog/Catalog' 
import AdminLogin from './pages/admin/AdminLogin'
import AdminDash from './pages/admin/AdminDash'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/catalog" element={<Catalog />} /> 
      <Route path="/admin" element={<AdminLogin />} /> 
      <Route path="/admin/dashboard" element={<AdminDash />} />
    </Routes>
  )
}

export default App