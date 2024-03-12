import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './SASS/main.css'
import ScrollToTop from './components/utils/ScrollToTop'

import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />

      <>
        <main className="container">
          <Outlet />
        </main>
      </>
    </>
  )
}

export default App
