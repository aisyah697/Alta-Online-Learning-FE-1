import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  blue: {
    color: theme.palette.secondary.secondary,
    // width: "2000px",
    position: "absolute",
  },
  orange: {
    color: theme.palette.secondary.main,
    // position: "absolute",
    // width: "2000px",
  },
}));

export default function LoadingSmall() {
  const classes = useStyles();

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <CircularProgress
          thickness={3}
          size={70}
          className={classes.blue}
          variant="indeterminate"
        />
        <CircularProgress
          // variant="determinate"
          size={60}
          thickness={4}
          className={classes.orange}
        />
      </Grid>
    </div>
  );
}
