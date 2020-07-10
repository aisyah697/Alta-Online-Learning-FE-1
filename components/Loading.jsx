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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.56)'
  },
}));

export default function Loading() {
  const classes = useStyles();
  const [open] = React.useState(false);

  return (
      <div>
        <Backdrop className={classes.backdrop} open={!open}>
          <CircularProgress
              thickness={2}
              size={70}
              className={classes.blue}
              variant="indeterminate"
          />
          <CircularProgress size={60} thickness={3} className={classes.orange} />
        </Backdrop>
      </div>
  );
}
