import React, { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('MEMBER')
  const [tenantId, setTenantId] = useState('')

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
      setTenantId('')
    } else {
      alert('Signup failed')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        
        <label>Tenant Id:
          <input type="text" value={tenantId} onChange={(e) => setTenantId(e.target.value)} required />
        </label>
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup