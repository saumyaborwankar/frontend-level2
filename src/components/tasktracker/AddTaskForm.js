import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export const AddTaskForm = (props) => {
  // for date
  const startDate = null;
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState({
    title: "",
    description: "",
    status: "notCompleted",
    dueDate: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    // console.log(id, value);
    setTask({
      ...task,
      [id]: value,
    });
  };
  const handleRadioChange = (event) => {
    // setSelectedValue(event.target.value);

    const { name, value } = event.target;
    if (name !== undefined) {
      //   console.log(name, value);
      setTask({
        ...task,
        [name]: value,
      });
    }
  };

  const handleDateChange = (e) => {
    const month = e.$M + 1;
    // const newDate = month + "/" + e.$D + "/" + e.$y;
    const newDate = e.$y + "-" + month + "-" + e.$D;
    // console.log(e);
    setTask({
      ...task,
      ["dueDate"]: newDate,
    });
    // console.log(e.$D);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    // console.log(task);
    if (task.title !== "" && task.description !== "") {
      const tasks = await axios.post(
        "https://backend-level2.vercel.app/addTask",
        {
          name: props.user,
          task,
        }
      );
      if (tasks.status === 200) {
        //   console.log(tasks.data);
        const { message } = tasks.data;
        //   processItems(message);
        console.log(message);
        props.setTaskList(message[0].tasks);
      } else {
        console.log("error");
      }
    }

    setOpen(false);
  };
  return (
    <div className="task-add-btn">
      <Button variant="contained" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add your task here</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Task Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="notCompleted"
            name="status"
            onClick={handleRadioChange}
          >
            <FormControlLabel
              value="notCompleted"
              control={<Radio />}
              label="Not Completed"
            />
            <FormControlLabel
              value="completed"
              control={<Radio />}
              label="Completed"
            />
          </RadioGroup>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={startDate} onChange={handleDateChange} />
            {/* <DatePicker
              value={startDate}
              onChange={(newValue) => setValue(newValue)}
            /> */}
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
