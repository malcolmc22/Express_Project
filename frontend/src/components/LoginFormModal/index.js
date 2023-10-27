import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newUser = await dispatch(sessionActions.setSessionUserThunk({ credential, password }))
      console.log('new user', newUser)

      if (newUser.message) {
        // const data = await newUser.json()
        setErrors(newUser)
      } else {
        closeModal()
      }
  };

  const demoLogin = async (e) => {
    const demoUser = await dispatch(sessionActions.setSessionUserThunk({credential : 'Demo-lition', password: 'password'}))
    closeModal()
  }
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.message && <p>{errors.message}</p>}
        <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <button onClick={demoLogin}>Log in as demo user</button>
      </form>
    </>
  );
}

export default LoginFormModal
