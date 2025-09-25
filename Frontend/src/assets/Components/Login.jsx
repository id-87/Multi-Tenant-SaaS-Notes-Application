import React from 'react'
import { useState } from 'react'
import './Login.css'

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  async function handleSubmit(e){
    e.preventDefault()
    const response=await fetch('http://localhost:4000/auth/login',{
      method:"POST",
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({email, password})
    })

    if (response.ok) {
      alert('Login successful!')
    } else {
      alert('Login failed')
    }
  }
  
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email:<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/></label>
        <label>Password:<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/></label>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login