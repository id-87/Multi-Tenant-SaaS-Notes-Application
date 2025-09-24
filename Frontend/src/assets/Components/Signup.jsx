import React from 'react'

const Signup = () => {
  return (
    <div>
      <form action="">
        <label >Email:<input type="email" id='email' name='email' required /></label>
        <label >Password:<input type="password" id='password' name='password' required /></label>
        <label >Role:<input type="text" id='role' required/></label>
        <label >Tenant Id:<input type="text" id='tenantId' required/></label>
        
      </form>
    </div>
  )
}

export default Signup
