import { useEffect, useState } from "react";
import "./App.css";
import { TaskList } from "./components/tasktracker/TaskList";
import { AddTaskForm } from "./components/tasktracker/AddTaskForm";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import {
  setSession,
  getSession,
  clearSession,
} from "./components/SessionProvider/SessionProvider";

function App() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");

  //session
  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(null);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  useEffect(() => {
    const session = getSession();
    if (session) {
      console.log("hi", session.token);
      setUser(session.user);
      setToken(session.token);
      setExpiry(session.expiry);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      {/* <TaskList user={user} /> */}

      <div className="Title">
        <h1>Task Tracker</h1>
      </div>
      <div className="login-register">
        {isLoggedIn && user ? (
          <TaskList user={user} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <div>
            {currentForm === "login" ? (
              <Login
                onFormSwitch={toggleForm}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            ) : (
              <Register onFormSwitch={toggleForm} />
            )}
            <h6>Sample Username: liem, PW: liem</h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
