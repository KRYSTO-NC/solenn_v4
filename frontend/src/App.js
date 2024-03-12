import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './SASS/main.css'

import ScrollToTop from './components/utils/ScrollToTop'

import { Outlet } from 'react-router-dom'
import Navbar from './components/layout/navbar/Navbar'

const App = () => {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Navbar />
      <>
        <main>
          <Outlet />
        </main>
      </>
    </>
  )
}

export default App
