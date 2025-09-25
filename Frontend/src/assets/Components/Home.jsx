import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className='home-container'>
        <h1>Welcome to Multi Tenant Notes App</h1>

        <button><Link to='/allnotes'>View all notes</Link></button>
        <button><Link to='/getnote'>Get a particular note</Link></button>
        <button><Link to='/create'>Create note</Link></button>
        <button><Link to='/update'>Update note</Link></button>
    </div>
  )
}

export default Home