import React, { useState } from 'react'
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('MEMBER')
  const [tenantSlug, setTenantSlug] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault() 
    
    const response = await fetch('http://localhost:4000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role, tenantId })
    })

    if (response.ok) {
      alert('Account created successfully!')
      setEmail('')
      setPassword('')
      setRole('MEMBER')
      setTenantSlug('')
    } else {
      alert('Signup failed')
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        
        <label>Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="MEMBER">Member</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        
        <label>Tenant Slug:
          <input type="text" value={tenantSlug} onChange={(e) => setTenantSlug(e.target.value)} required />
        </label>
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup