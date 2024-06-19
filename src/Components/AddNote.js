import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const onChange=(e)=>{
            setNote({...note,[e.target.name]:e.target.value})
    }
    // ...note means that keep overwrite the value of note
    const handleClick=(e)=>{
        e.preventDefault(); 
        // e.preventDefault() stop the pg from reloading
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:"default"})
        props.showAlert("Added Successfully","success")
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note </h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title :</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" >Description :</label>
            <input type="text" className="form-control" id="description" name='description'  onChange={onChange} minLength={5} required value={note.description}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag :</label>
            <input type="text" className="form-control" id="tag" name='tag'  onChange={onChange} value={note.tag} />
          </div>
          <div className="mb-3 form-check">
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.description.length<5 || note.title.length<5}>Add Note</button>
        </form>
        </div>
    </div>
  )
}

export default AddNote
