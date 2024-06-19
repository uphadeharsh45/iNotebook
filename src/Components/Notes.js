import React, { useContext, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

  let navigate=useNavigate();
  const context = useContext(noteContext);
  const { notes, getallnotes,editNote } = context;
  const ref = useRef(null);
  const refClose=useRef(null)
 

  useEffect(() => {
    if(localStorage.getItem('token')){
        getallnotes()
    }
    else{
      console.log("logging in .....")
        navigate("/login");
    }
    
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    
  }

  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  // ...note means that keep overwrite the value of note

  const handleClick = (e) => {
    
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success")
    
    // e.preventDefault() stop the pg from reloading
    
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display:'none' }}>
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title :</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description :</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag :</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.edescription.length<5 || note.etitle.length<5}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes
