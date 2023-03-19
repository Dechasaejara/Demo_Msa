import React from 'react'
import Footer from '../layouts/Footer'
import Header from '../layouts/header/Header'

import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="layoutcontainer">

      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
