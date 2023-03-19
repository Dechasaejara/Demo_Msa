
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import About from './pages/About'

import CustomerPage from './pages/admin/CustomerPage'
import FoodsPage from './pages/admin/FoodsPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="admin/foods" element={<FoodsPage />} />
            <Route path="admin/customers" element={<CustomerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
