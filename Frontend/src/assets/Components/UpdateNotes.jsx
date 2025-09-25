import React from 'react'
import { useState } from 'react'
import './UpdateNotes.css'
const UpdateNotes = () => {
    const [id,setId]= useState("")
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
   




    async function handleSubmit(e){
        e.preventDefault()

        const response=await fetch(`http://localhost:4000/notes/${id}`,{
            method:"PUT",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({title,content})
        })

    }
  return (
    <div className="update-notes-container">
      <form onSubmit={handleSubmit} className="update-notes-form">
        <label>Title:<input type="text" id='title' value={title} onChange={(e)=>setTitle(e.target.value) } required/></label>
        <label>Content:<input type="text" id='content' value={content} onChange={(e)=>setContent(e.target.value)} required /></label>
        <label>Note ID:<input type="text" id='noteId' value={id} onChange={(e)=>setId(e.target.value)} required /></label>
        <button type='submit'>Update Note</button>
      </form>
    </div>
  )
}

export default UpdateNotes
