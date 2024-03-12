import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import {

  FaPlusCircle,
  FaProductHunt,
  FaSignOutAlt,
  FaSolarPanel,

} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../../../slices/userApiSlice'

import icon from '../../../assets/logo.png'
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo)
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logoutApiCall())
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <nav className="navbar bg-dark">
      <h1 className="logo">
        <Link>
          <div className="logo">
            <img src={icon} alt="" />
            SOLLEN
          </div>
        </Link>
      </h1>
      <ul className="links">



          {/* if user is logged in, show these links */}
          {userInfo ? (
            <>
              <li>
                <Link to="/catalogue-sollen">
                  <FaProductHunt /> <span className="hide-sm">Catalogue Sollen</span>{' '}
                </Link>
              </li>
              <li>
                <Link to="/products">
                  <FaPlusCircle /> <span className="hide-sm">Nouvelle Simulation</span>{' '}
                </Link>
              </li>
              <li>
                <Link to="/simulation-solis">
                  <FaSolarPanel />{' '}
                  <span className="hide-sm">Ma simulation</span>{' '}
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FaSignOutAlt onClick={logoutHandler} />{' '}
                  <span className="hide-sm">Déconnexion</span>{' '}
                </Link>
              </li>
            </>
          ) : (
            <>
            {/* If user is logged out, show these links */}
              <li>
                <Link to="/login">Connexion</Link>
              </li>
              <li>
                <Link to="/register">Inscription</Link>
              </li>
            </>
          )}
       

        
      </ul>
    </nav>
  )
}

export default Navbar
