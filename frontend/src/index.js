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
import SollenProductScreen from './screens/privateScreens/sollenProductScreen/SollenProductScreen'
import UserRoute from './components/utils/UserRoutes'
import UserHomeScreen from './screens/userScreens/UserHomeScreen'
import UserListScreen from './screens/adminScreens/userListScreen/UserListScreen'
import SimulationGuide from './screens/privateScreens/SimulationGuide/SimulationGuide'
import SimulationsScreen from './screens/privateScreens/simulationScreen/SimulationScreen'
import ParametrageScreen from './screens/adminScreens/parametrageScreen.jsx/ParametrageScreen'
import SimulationDetails from './screens/privateScreens/simulationDetails/SimulationDetails'
import SuivieAffairesScreen from './screens/privateScreens/suivieAffairesScreen/SuivieAffairesScreen'

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
        <Route path="/creer-simulation" element={<SimulationGuide />} />
        <Route path="/simulations" element={<SimulationsScreen />} />
        <Route path="/simulation/:id" element={<SimulationDetails />} />
        <Route path="/catalogue-sollen" element={<SollenProductScreen />} />
        <Route path="/suivie-affaires" element={<SuivieAffairesScreen />} />
      </Route>
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/gestion-utilisateurs" element={<UserListScreen />} />
        <Route path="/parametrage-sollen" element={<ParametrageScreen />} />
      </Route>
      {/* Users */}
      <Route path="" element={<UserRoute />}>
        <Route path="/votre-espace-sollen" element={<UserHomeScreen />} />
      </Route>
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
