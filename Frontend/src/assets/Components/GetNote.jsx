import React, { useState } from 'react'
import './GetNote.css'

const GetNote = () => {
    const [id, setId] = useState("")
    const [note, setNote] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/notes/${id}`)
        if (response.ok) {
            setNote(await response.json())
        }
    }

    return (
        <div className="get-note-container">
            <form onSubmit={handleSubmit} className='get-note-form'>
                <input 
                    placeholder="Enter Note ID" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                    required 
                />
                <button type='submit'>Get Note</button>
            </form>

            {note && (
                <div className='note-details'>
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                </div>
            )}
        </div>
    )
}

export default GetNote