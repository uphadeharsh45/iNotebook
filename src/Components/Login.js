import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  const[credentials,setCredentials]=useState({email:"",password:""})
  let navigate=useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit=async (e)=>{
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password})
      });
      const json = await response.json();
      console.log(json);
      if(json.success)
      {
        // Save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        props.showAlert("Logged In Successfully","success")
        navigate("/");
        
      }
      else{
        props.showAlert("Invalid credentials","danger")
      }
  }

  return (
    <div>
      <h2>Login to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" id="password" value={credentials.password} onChange={onChange} />
        </div>
        <div className="mb-3 form-check">

        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
