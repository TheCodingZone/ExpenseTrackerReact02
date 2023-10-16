import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Login/Login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/FirebaseConfig'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const navigate=useNavigate();
  const[loginMessage,setLoginMessge]=useState(null);

  const loginHandler=(event)=>{
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    console.log(enteredEmail+" "+enteredPassword);
    signInWithEmailAndPassword(auth,enteredEmail,enteredPassword).then((response)=>{
      
        console.log(response);
        navigate('/Home');
     
    }).catch((error)=>{
      setLoginMessge(error.message);
      console.log("error"+" "+error.message);
    })
  }
  setTimeout(() => {
    setLoginMessge(null);
  }, 4000);
  return (
    <div className="login">
    {/* <h4>LOGIN HERE</h4> */}
    
    <form className="login-form">
    <label htmlFor="email">Email</label>
        <input type="text" className="input-box" ref={emailInputRef}/>
        <label htmlFor="email">Password</label>
        <input type="password" className="input-box" ref={passwordInputRef}/>
       
        <p><span><input type="checkbox" /></span>I agree to the terms of services</p>
        <button className="loginbutton" onClick={loginHandler}>LOGIN</button>
        <div style={{color:'red'}}>{loginMessage}</div>
        <hr />
        <div className="or">OR</div>
   
        <div>Do Not Have Account?<Link to='/Signup'>SIGNUP HERE</Link></div>
        
    </form>
</div>
  )
}

export default Login
