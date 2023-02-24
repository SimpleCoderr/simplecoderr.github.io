import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setErr(false)
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className="logo">Simple Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
            <input required type="email" placeholder='email'/>
            <input required type="password" placeholder='password'/>
            <button>Sign in</button>
            {err && <div style={{color: 'red', textAlign: 'center', fontSize: '12px'}}>you entered the wrong email or password. <br /> please, try again.</div>}
            <p>You don't have an account? <Link to="/register">Register</Link ></p>
        </form>
      </div >
    </div>
  )
}

export default Login
