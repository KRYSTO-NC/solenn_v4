import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import PrivateRoute from './components/utils/PrivateRoute'
import AdminRoute from './components/utils/AdminRoute'
import NotFound from './screens/NotFound'
import HomeScreen from './screens/privateScreens/homeScreen/HomeScreen'
import LoginScreen from './screens/publicScreens/loginScreen/LoginScreen'
import SimulationSolis from './screens/publicScreens/simulationSolis/SimulationSolis'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index={true} path="/" element={<LoginScreen />} />

      <Route path="/simulation-solis" element={<SimulationSolis />} />

      {/* Route générique pour gérer toutes les autres routes non définies */}
      <Route path="*" element={<NotFound />} />
      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" element={<HomeScreen />} />
      </Route>
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}></Route>
    </Route>,
  ),
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
