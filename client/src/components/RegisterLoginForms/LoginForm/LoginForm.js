import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";

const LoginForm = ({ setShowRegister, setLoginUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Successfully Logged In");
    axios.post("/login", formData).then((res) => {
      // alert(res.data.message);
      setLoginUser(res.data.user);
    });
  };

  return (
    <div className="form-container is-flex">
      <h1 className="form-title">Login</h1>
      <form className="form is-flex" onSubmit={(e) => onSubmit(e)}>
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          minLength="6"
        />
        <button className="form-button" type="submit" value="Login">
          Login
        </button>
      </form>
      <p className="form-paragraph is-flex">
        Don't have an account?{" "}
        <button onClick={() => setShowRegister(false)}>Register</button>
      </p>
    </div>
  );
};

export default LoginForm;
