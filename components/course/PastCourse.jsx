import React from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Typography from "@material-ui/core/Typography";
import NestedList from "./NestedList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.secondary.secondary,
    fontWeight: "bold",
  },
  currentContent: {
    color: theme.palette.secondary.secondary,
  },
}));

const lists = [
  {
    key: 1,
    label: "Index 01: Python",
    icon: InboxIcon,
    items: [
      {
        key: "Basic MySQL",
        label: "Subject",
        icon: "Task",
      },
      {
        key: "Basic MySQL",
        label: "Subject",
        icon: "Task",
      },
      {
        key: "Basic MySQL",
        label: "Subject",
        icon: "Task",
      },
    ],
  },
  {
    key: 2,
    label: "Index 02: JavaScript",
    icon: DraftsIcon,
    items: [
      {
        key: "Basic MySQL",
        label: "Subject",
        icon: "Task",
      },
    ],
  },
];

const PastCourses = ({ module }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.text}>
        <Typography>Past Courses</Typography>
      </div>
      <br />
      <div className={classes.currentContent}>
        <NestedList module={module} lists={lists} />
      </div>
    </React.Fragment>
  );
};

export default PastCourses;
