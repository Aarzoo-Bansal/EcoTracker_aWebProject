import React, { useEffect, useState } from 'react'
import '/src/CSS/Navbar.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Navbar() {
  


  return (
    <>
      <div className='navbar'>
        <div className="navbar-brand">
            <img src="/src/assets/icon1.png" alt="logo" className="logo" />
            <h1 className="navbar-heading">Eco Tracker</h1>
        </div>
        <ul className='navbar-options'>
          <li>
            <Link to={`/home`}>Home</Link> 
          </li>
          <li>
            <Link to={`/create`}>Create a post</Link>
          </li>
          </ul>
          </div>
    </>
  )
}

export default Navbar
