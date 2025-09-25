import React from 'react'
import { useState } from 'react'
import './CreateNotes.css'

const CreateNotes = () => {
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const [tenantId,setTid]=useState("")
    const [authorId,setAid]=useState("")




    async function handleSubmit(e){
        e.preventDefault()

        const response=await fetch('http://localhost:4000/notes',{
            method:"POST",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({title,content,tenantId,authorId})
        })

    }
  return (
    <div className="create-notes-container">
      <form onSubmit={handleSubmit} className='create-note-form'>
        <label>Title:<input type="text" id='title' value={title} onChange={(e)=>setTitle(e.target.value) } required/></label>
        <label>Content:<input type="text" id='content' value={content} onChange={(e)=>setContent(e.target.value)} required /></label>
        <label>Tenant ID:<input type="text" id='tenantId' value={tenantId} onChange={(e)=>setTid(e.target.value)} required /></label>
        <label>Author ID:<input type="text" id='authorId' value={authorId} onChange={(e)=>setAid(e.target.value)}  required/></label>
        <button type='submit'>Create Note</button>
      </form>
    </div>
  )
}

export default CreateNotes
