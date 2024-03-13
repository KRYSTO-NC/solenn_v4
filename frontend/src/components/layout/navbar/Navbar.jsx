import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import {
  FaCogs,
  FaPlusCircle,
  FaProductHunt,
  FaSignOutAlt,
  FaSolarPanel,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../../../slices/userApiSlice'

import icon from '../../../assets/logo.png'
import { logout } from '../../../slices/authSlice'
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo)
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      console.log('logout')
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <nav className="navbar bg-dark">
      <h1 className="logo">
        <Link to="/">
          <div className="logo">
            <img src={icon} alt="" />
            SOLLEN
          </div>
        </Link>
      </h1>
      <ul className="links">
        {userInfo && userInfo.role !== 'User' && (
          <>
            <li>
              <Link to="/catalogue-sollen">
                <FaProductHunt />
                <span>Catalogue Sollen</span>
              </Link>
            </li>
            <li>
              <Link to="/creer-simulation">
                <FaPlusCircle />
                <span>Nouvelle Simulation</span>
              </Link>
            </li>
          </>
        )}

        {userInfo && userInfo.isAdmin === true && (
          <>
            <li>
              <Link to="/gestion-utilisateurs">
                <span>Gestion des utilisateurs</span>
              </Link>
            </li>
            <li>
              <Link to="/parametrage-sollen">
                <FaCogs style={{ fontSize: '3rem' }} />
              </Link>
            </li>
          </>
        )}

        {userInfo && userInfo.role === 'User' && (
          <>
            <li>
              <Link to="/simulation-solis">
                <FaSolarPanel />
                <span>Mes installations</span>
              </Link>
            </li>
            <li>
              <Link to="/simulation-solis">
                <FaSolarPanel />
                <span>Ma simulation</span>
              </Link>
            </li>
          </>
        )}

        {userInfo ? (
          <li>
            <Link onClick={logoutHandler}>
              <FaSignOutAlt />
              <span className="hide-sm">Déconnexion</span>{' '}
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/">Connexion</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
