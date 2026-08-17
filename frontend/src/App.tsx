import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Catalog from './pages/catalog/Catalog' 
import AdminLogin from './pages/admin/AdminLogin'
import AdminDash from './pages/admin/AdminDash'
import SampleDetail from './pages/catalog/SampleDetail' 
import PackDetail from './pages/catalog/PackDetail'   
import Login from './pages/login/Login'            
import SignUp from './pages/sign-up/SignUp'        
import UserDash from './pages/user-dash/UserDash'  

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/catalog" element={<Catalog />} /> 
      <Route path="/catalog/sample/:id" element={<SampleDetail />} /> 
      <Route path="/catalog/pack/:id" element={<PackDetail />} />     
      <Route path="/login" element={<Login />} />      
      <Route path="/signup" element={<SignUp />} />    
      <Route path="/dashboard" element={<UserDash />} /> 
      <Route path="/admin" element={<AdminLogin />} /> 
      <Route path="/admin/dashboard" element={<AdminDash />} />
    </Routes>
  )
}

export default App