import React, { useState, useRef } from 'react'

import "./Auth.css";
import Form from '../../components/AuthForm/AuthForm';

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const emailElement = useRef(null);
  const passwordElement = useRef(null);
  const nameElement = useRef(null);

  const onSubmitClick = event => {
    event.preventDefault();
    console.log(event)
    const email = emailElement.current.value;
    const password = passwordElement.current.value;
    passwordElement.current.value = "";
    const name = !isLogin ? nameElement.current.value : null;
    const usersStr = localStorage.getItem('users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const newUserList = users;
    newUserList.push({name, email, password, isCurrent: true});
    setIsLogin(true);
    localStorage.setItem('users', JSON.stringify(newUserList))
    localStorage.setItem('currentUser', JSON.stringify({email, name, password}))
  }

  const onSwitchModeClick = () => {
    setIsLogin(!isLogin);
  }

  return (
    <Form
      isLogin={isLogin}
      emailRef={emailElement}
      passwordRef={passwordElement}
      nameRef={nameElement}
      onSubmit={onSubmitClick}
      switchMode={onSwitchModeClick} />
  )
}

export default Auth;