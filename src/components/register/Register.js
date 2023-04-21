import axios from "axios";
import React, { useState } from "react";
// import PropTypes from 'prop-types';

export const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // if (name && password && password === reEnterPassword) {
    if (username && password) {
      axios
        .post("https://backend-level2.vercel.app/register", {
          name: username,
          password: password,
        })
        .then((res) => {
          alert(res.data.message);
          props.onFormSwitch("login");
        });
    } else {
      alert("invlid input");
    }
  };

  return (
    <div className="auth-form-container">
      <h1>Please Register an Account</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          <p>Create an Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            id="username"
            type="username"
            name="username"
          />
        </label>
        <label>
          <p>Create a Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
            id="password"
            type="password"
            name="password"
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        {" "}
        Already have an account? Login here.{" "}
      </button>
    </div>
  );
};

// Register.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
