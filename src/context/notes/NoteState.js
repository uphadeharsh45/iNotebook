import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);


  // Fetch all notes
  const getallnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  };


  // Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    // return response.json(); // parses JSON response into native JavaScript objects
    const note = await response.json();
    setNotes(notes.concat(note))
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    // return response.json(); // parses JSON response into native JavaScript objects
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes)
  };

  // Delete Note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },


    });
    // return response.json(); // parses JSON response into native JavaScript objects
    const json = await response.json();
    

    
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getallnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;