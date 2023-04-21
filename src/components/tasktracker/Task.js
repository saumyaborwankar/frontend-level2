import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { EditTaskForm } from "./EditTaskForm";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "./Task.css";
export const Task = (props) => {
  const [task, setTask] = React.useState({
    title: props.row.title,
    description: props.row.description,
    status: props.row.status,
    dueDate: props.row.dueDate,
  });
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
      props.setTaskList(message[0].tasks);
    } else {
      console.log("error");
    }
  };

  const [checked, setChecked] = React.useState(props.row.status);

  const handleChange = async (e) => {
    // console.log(checked);
    const { name, value } = e.target;
    // console.log(name, value);
    if (checked === "completed") {
      setChecked("notCompleted");
      const tasks = await axios.post("http://localhost:9002/editTask", {
        name: props.user,
        task: {
          title: props.row.title,
          description: props.row.description,
          status: "notCompleted",
          dueDate: props.row.dueDate,
        },
        id: props.row._id,
      });
      if (tasks.status === 200) {
        //   console.log(tasks.data);
        const { message } = tasks.data;
        //   processItems(message);
        // console.log(message);
        props.setTaskList(message[0].tasks);
      } else {
        console.log("error");
      }
    } else {
      setChecked("completed");
      const tasks = await axios.post(
        "https://backend-level2.vercel.app/editTask",
        {
          name: props.user,
          task: {
            title: props.row.title,
            description: props.row.description,
            status: "completed",
            dueDate: props.row.dueDate,
          },
          id: props.row._id,
        }
      );
      if (tasks.status === 200) {
        //   console.log(tasks.data);
        const { message } = tasks.data;
        //   processItems(message);
        // console.log(message);
        props.setTaskList(message[0].tasks);
      } else {
        console.log("error");
      }
    }
  };
  return (
    // <div className="task-item">
    //   {props.row.title} {props.row.status} {props.row.description}{" "}
    //   {props.row.dueDate}
    // </div>

    // <Card sx={{ minWidth: 275 }}>
    //   <CardContent>
    //     <Typography variant="h5" component="div">
    //       {props.row.title}
    //     </Typography>

    //     <Typography variant="body2">{props.row.description}</Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Learn More</Button>
    //     <EditTaskForm
    //       row={props.row}
    //       user={props.user}
    //       setTaskList={props.setTaskList}
    //     />
    //     <DeleteIcon
    //       onClick={() => handleDelete(props.user, props.row)}
    //       className="edit-icon"
    //     />
    //   </CardActions>
    // </Card>

    <div class="card">
      <div class="details">
        <div class="title">{props.row.title}</div>
        <input
          type="checkbox"
          value={checked}
          name="status"
          checked={checked === "completed"}
          onChange={handleChange}
        />
        <div class="description">{props.row.description}</div>
        {/* <div class="status">{props.row.status}</div> */}

        <div class="due-date">Due By: {props.row.dueDate}</div>
        <div class="icons">
          <div class="icon-edit">
            <EditTaskForm
              row={props.row}
              user={props.user}
              setTaskList={props.setTaskList}
            />
          </div>
          <div class="icon-del">
            <DeleteIcon
              onClick={() => handleDelete(props.user, props.row)}
              className="edit-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
