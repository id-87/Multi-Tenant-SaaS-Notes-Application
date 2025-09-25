import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <button><Link to='/login'>Login</Link></button>
      <button><Link to='/signup'>Signup</Link></button>
      <button><Link to='/'>Home</Link></button>
    </div>
  )
}

export default Navbar