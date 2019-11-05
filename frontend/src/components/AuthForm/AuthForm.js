import React, { useRef } from 'react'
import { Redirect } from 'react-router'
import './AuthForm.css';
const Form = ({
  isLogin,
  emailRef,
  passwordRef,
  nameRef,
  onSubmit,
 }) => {

  const containerRef = useRef(null);  
  return (
    <>
      {
        isLogin == true ? <Redirect to="/game"/> : 
        <div className="authForm" ref={containerRef}>
        <div className="form-container  right-panel-active">
          <form action="#">
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" ref={!isLogin ? nameRef : null} />
            <input type="email" placeholder="Email" ref={!isLogin ? emailRef : null} />
            <input type="password" placeholder="Password" ref={!isLogin ? passwordRef : null} />
            <button onClick={onSubmit}>Sign Up</button>
          </form>
        </div>
      </div>
      } 
    </>
  )
}

export default Form;