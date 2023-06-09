import * as React from "react";
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

export default function Sort(props) {
  //   const [taskList, setTaskList] = React.useState(props.taskList);
  const [dummy, setDummy] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTitleSort = () => {
    console.log("sort");
    console.log(props.taskList);
    const sortedTaskList = props.taskList.sort((a, b) => {
      //   console.log(a);
      if (a.title < b.title) {
        return -1;
      }
    });
    console.log(sortedTaskList);
    props.setTaskList(sortedTaskList);
    setAnchorEl(null);
  };
  const handleDueDateSort = () => {
    console.log("sort");
    const sortedTaskList = props.taskList.sort((a, b) => {
      var c = new Date(a.dueDate);
      var d = new Date(b.dueDate);
      return c - d;
    });
    console.log(sortedTaskList);
    props.setTaskList(sortedTaskList);
    setAnchorEl(null);
  };
  const handleDescriptionSort = () => {
    console.log("sort");
    const sortedTaskList = props.taskList.sort((a, b) => {
      if (a.description < b.description) {
        return -1;
      }
    });
    console.log(sortedTaskList);
    setDummy(sortedTaskList);
    props.setTaskList(sortedTaskList);
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
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
        onClose={handleClose}
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
        {/* <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem> */}
      </StyledMenu>
    </div>
  );
}
