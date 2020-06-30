import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  blue: {
    color: theme.palette.secondary.secondary,
    width: "2000px",
    position: "absolute",
  },
  orange: {
    color: theme.palette.secondary.main,
    position: "absolute",
  },
}));

export default function Loading() {
  const classes = useStyles();
  const [open] = React.useState(false);

  return (
    <div>
      <Backdrop open={!open}>
        <CircularProgress
          thickness={3}
          size={70}
          className={classes.blue}
        />
        <CircularProgress size={70} thickness={3} className={classes.orange} />
      </Backdrop>
    </div>
  );
}
