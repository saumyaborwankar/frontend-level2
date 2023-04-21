import React, { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "./Task";
import { AddTaskForm } from "./AddTaskForm";
import "./Task.css";
import Sort from "../dropdownSort/Sort";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  setSession,
  getSession,
  clearSession,
} from "../SessionProvider/SessionProvider";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
export const TaskList = (props) => {
  const [user, setUser] = useState(props.user);
  const [taskList, setTaskList] = useState();

  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(null);

  useEffect(() => {
    // setUser(props.user);
    // console.log("task tracker started for", { user });
    const fetchData = async () => {
      const reponse = await axios.post(
        "https://backend-level2.vercel.app/getTasks",
        {
          name: user,
        }
      );
      if (reponse.status === 200) {
        // console.log("jw ii", reponse.data.message[0].tasks);
        setTaskList(reponse.data.message[0].tasks);
      }
    };
    fetchData();
    // console.log("task tracker opened for", { user });

    // const session = getSession();
    // if (session) {
    //   setUser(session.user);
    //   setToken(session.token);
    //   setExpiry(session.expiry);
    // }
  }, []);
  const handleDelete = async (user, row) => {
    console.log(user, row);
    // console.log("dee");
    const tasks = await axios.post(
      "https://backend-level2.vercel.app/deleteTask",
      {
        name: user,
        // task: row,
        id: row._id,
      }
    );
    if (tasks.status === 200) {
      //   console.log(tasks.data);
      const { message } = tasks.data;
      //   processItems(message);
      // console.log(message);
      setTaskList(message[0].tasks);
    } else {
      console.log("error");
    }
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setToken(null);
    setExpiry(null);
    props.setIsLoggedIn(false);
    console.log("logout");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortClose = () => {
    setAnchorEl(null);
  };
  const handleTitleSort = () => {
    console.log("sort");
    console.log(taskList);
    const sortedTaskList = taskList.sort((a, b) => {
      //   console.log(a);
      if (a.title < b.title) {
        return -1;
      }
    });
    console.log(sortedTaskList);
    setTaskList(sortedTaskList);
    setAnchorEl(null);
  };
  const handleDueDateSort = () => {
    console.log("sort");
    const sortedTaskList = taskList.sort((a, b) => {
      var c = new Date(a.dueDate);
      var d = new Date(b.dueDate);
      return c - d;
    });
    console.log(sortedTaskList);
    setTaskList(sortedTaskList);
    setAnchorEl(null);
  };
  const handleDescriptionSort = () => {
    console.log("sort");
    const sortedTaskList = taskList.sort((a, b) => {
      if (a.description < b.description) {
        return -1;
      }
    });
    console.log(sortedTaskList);
    setTaskList(sortedTaskList);
    setAnchorEl(null);
  };
  return (
    // <div>
    //   <div>TaskList for {user}</div>
    //   <Sort taskList={taskList} setTaskList={setTaskList} />
    //   <button onClick={handleLogout}>Logout</button>
    //   <div className="tasks">
    //     {taskList ? (
    //       taskList.map((row) => {
    //         if (row.status != "deleted") {
    //           return (
    //             <div>
    //               <Task row={row} user={user} setTaskList={setTaskList} />
    //             </div>
    //           );
    //         }
    //       })
    //     ) : (
    //       <div></div>
    //     )}
    //   </div>
    //   <AddTaskForm user={user} setTaskList={setTaskList} />
    // </div>
    <div className="main">
      <div class="container">
        <div class="task-list completed">
          <h2>Completed Tasks</h2>
          {taskList ? (
            taskList.map((row) => {
              if (row.status != "deleted" && row.status === "completed") {
                return (
                  <div>
                    <Task row={row} user={user} setTaskList={setTaskList} />
                  </div>
                );
              }
            })
          ) : (
            <div></div>
          )}
          {/* <div class="card">
          <div class="details">
            <div class="title">Task 2</div>
            <div class="description">This is the description for Task 2.</div>
            <div class="status">Completed</div>
            <div class="due-date">Due: 2023-05-05</div>
          </div>
        </div>
        <div class="card">
          <div class="details">
            <div class="title">Task 3</div>
            <div class="description">This is the description for Task 3.</div>
            <div class="status">Completed</div>
            <div class="due-date">Due: 2023-05-10</div>
          </div>
        </div> */}
        </div>
        <div class="task-list not-completed">
          <h2>Not Completed Tasks</h2>
          {taskList ? (
            taskList.map((row) => {
              if (row.status != "deleted" && row.status === "notCompleted") {
                return (
                  <div>
                    <Task row={row} user={user} setTaskList={setTaskList} />
                  </div>
                );
              }
            })
          ) : (
            <div></div>
          )}
          {/* <div class="card">
          <div class="details">
            <div class="title">Task 4</div>
            <div class="description">This is the description for Task 4.</div>
            <div class="status">Not Completed</div>
            <div class="due-date">Due: 2023-05-10</div>
          </div>
        </div> */}
        </div>
        <div className="user-info">
          <h2 className="tasklist">TaskList for {user}</h2>
          <AddTaskForm
            className="add-btn"
            user={user}
            setTaskList={setTaskList}
          />
          {/* <Sort taskList={taskList} setTaskList={setTaskList} /> */}

          <div className="sorting">
            <div>
              <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleSortClick}
                endIcon={<KeyboardArrowDownIcon />}
                size="medium"
              >
                Sort
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleSortClose}
              >
                <MenuItem onClick={handleTitleSort} disableRipple>
                  Title
                </MenuItem>
                <MenuItem onClick={handleDescriptionSort} disableRipple>
                  Description
                </MenuItem>
                <MenuItem onClick={handleDueDateSort} disableRipple>
                  Due Date
                </MenuItem>
              </StyledMenu>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
