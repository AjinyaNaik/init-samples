import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Catalog from './pages/catalog/Catalog' 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/catalog" element={<Catalog />} /> 
    </Routes>
  )
}

export default App