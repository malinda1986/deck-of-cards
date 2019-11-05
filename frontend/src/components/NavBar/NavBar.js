import React, { useContext } from 'react'
import './NavBar.css'

import { NavLink } from 'react-router-dom';

const NavBar = () => {

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <h1>Game of Deck</h1>
      </div>
      <nav className="navbar__items">
        <ul>
          <li><NavLink to="/game">Game</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;