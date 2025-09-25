import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>Welcome to Multi Tenant Notes App</h1>
        <button><Link to='/create'>Create note</Link></button>
        <button><Link to='/update'>Update note</Link></button>
    </div>
  )
}

export default Home