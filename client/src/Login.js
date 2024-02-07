import React, { useState } from "react";
import "./Login.css";

export default function Login(props) {
  // setting up email and password
  const [info, setInfo] = useState({ name: "", email: "", password: "" });
  function handleName(e) {
    setInfo((prev) => ({ ...prev, name: e.target.value }));
  }
  function handleEmail(e) {
    setInfo((prev) => ({ ...prev, email: e.target.value }));
  }
  function handlePass(e) {
    setInfo((prev) => ({ ...prev, password: e.target.value }));
  }
  function checkInfo() {
    const currName = info.name.trim();
    const currEmail = info.email.trim();
    const currPassword = info.password.trim();
    if (currName && currEmail && currPassword) {
      setInfo((prev) => ({ ...prev, name: currName }));
      setInfo((prev) => ({ ...prev, email: currEmail }));
      setInfo((prev) => ({ ...prev, password: currPassword }));
      return true;
    } else {
      alert("Please enter valid Credentials");
      return false;
    }
  }

  return (
    <div className="login">
      <div className="container">
        <p className="sign-in">Sign in</p>
        <p className="text">Name</p>
        <input
          type="text"
          className="input"
          value={info.name}
          onChange={handleName}
        />
        <p className="text">Email</p>
        <input
          type="email"
          className="input"
          value={info.email}
          onChange={handleEmail}
        />
        <p className="text">Password</p>
        <input
          type="password"
          className="input"
          value={info.password}
          onChange={handlePass}
        />
        <button
          className="sign-in-btn"
          onClick={() => checkInfo() && props.checkUser(info)}
        >
          Sign in
        </button>
        <small className="terms">
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our Privacy Notice and Terms and Conditions.
        </small>
        <div className="newtext">New to Amazon?</div>
        <button className="create" onClick={() => props.createUser(info)}>
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}
