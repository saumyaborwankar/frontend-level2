import React, { useContext, useState } from "react";
import axios from "axios";
import {
  setSession,
  getSession,
  clearSession,
} from "../SessionProvider/SessionProvider";

export const Login = (props) => {
  // const { login } = useContext(SessionContext);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async () => {
    let response = await axios.post("https://backend-level2.vercel.app/login", {
      name: username,
      password: password,
    });
    if (response.status === 200) {
      props.setIsLoggedIn(true);
      props.setUser(username);
      console.log("logged in", username);

      const token = "my-auth-token";
      const expiry = Date.now() + 3600000; // 1 hour from now
      setSession(username, token, expiry);
      setUser(username);
      setToken(token);
      setExpiry(expiry);
    } else if (response.status === 250) {
      alert("Wrong pass");
    } else {
      alert("Wrong pass and username");
      console.log("Wrong credentials");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password);
    loginUser();
    // const token = await loginUser({
    //   username,
    //   password
    // });
    // setToken(token);
  };

  return (
    <div className="auth-form-container">
      <h1>Please Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
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
          <p>Password</p>
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
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
