import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      const newUser = await dispatch(
        sessionActions.signupThunk({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
      if (newUser.message) {
        console.log('errors', newUser)
        setErrors(newUser)
        console.log('new user', errors)
      } else {
        closeModal()
      }
    } else {
    setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  }
  };

  return (
    <>
      <h1 className="signup-modal-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label className="signup-modal-email">
          Email
          <input
          className="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.errors && <p className="signup-error">{errors.errors.email}</p>}
        <label className="signup-modal-username">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.errors && <p className="signup-error">{errors.errors.username}</p>}
        <label className="signup-modal-firstName">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.errors && <p className="signup-error">{errors.errors.firstName}</p>}
        <label className="signup-modal-lastName">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.errors && <p className="signup-error">{errors.errors.lastName}</p>}
        <label className="signup-modal-password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.errors && <p className="signup-error">{errors.errors.password}</p>}
        <label className="signup-modal-confirm-password">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
        <button
        className="signup-modal-submit"
          type="submit"
          disabled={
            email.length < 0 ||
            username.length < 0 ||
            firstName.length < 0 ||
            lastName.length < 0 ||
            password.length < 0 ||
            confirmPassword.length < 0 ||
            username.length < 4 ||
            password.length < 6
          }
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
