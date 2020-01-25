import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({username: '', password: ''});
  const history  = useHistory();
  
  const handleChange = event => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  };

  // Wait for token to be set
  const attemptNavigation = (count = 0 ) => {
    if(count < 5){
      localStorage.getItem('token') ? history.push('/bubbles') : attemptNavigation(count + 1);
    } else {
      alert('Something went wrong! Attempt login again');
    }
  };

  const attemptLogin = event => {
    event.preventDefault();
    axiosWithAuth.post('/login', loginData)
                 .then(res => {
                   console.log(res.data.payload);
                   localStorage.setItem('token', res.data.payload);
                   attemptNavigation();
                 })
                 .catch(err => console.log('Axios Error: ', err))
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={attemptLogin}>
        <input type="text" onChange={handleChange} name="username" value={loginData.name} placeholder="Username"></input>
        <input type="password" onChange={handleChange} name="password" value={loginData.password} placeholder="Password"></input>
        <input type="submit"></input>
      </form>
    </>
  );
};

export default Login;
