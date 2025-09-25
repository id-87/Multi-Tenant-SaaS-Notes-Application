import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <button><Link to='/'>Home</Link></button>
      <button><Link to='/login'>Login</Link></button>
      <button><Link to='/signup'>Signup</Link></button>
      
    </div>
  )
}

export default Navbar