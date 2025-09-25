import React, { useState, useEffect } from 'react'
import './AllNotes.css'

const AllNotes = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/notes')
            .then(response => response.json())
            .then(data => setNotes(data))
    }, [])

    return (
        <div className="notes-container">
            {notes.map(note => (
                <div key={note.id} className="note-card">
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    )
}

export default AllNotes