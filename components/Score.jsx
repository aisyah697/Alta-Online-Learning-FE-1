import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Typography } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonInPop: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    minWidth: theme.spacing(12),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
}));

export default function Scores(props) {
  const [opens, setOpens] = React.useState(false);
  const classes = useStyles();
  const handleClickOpens = () => {
    setOpens(true);
  };

  const handleClose = () => {
    setOpens(false);
  };
  return (
    <div>
      <Button
        onClick={handleClickOpens}
        variant="outlined"
        size="medium"
        className={classes.buttonInPop}
      >
        Yes
      </Button>
      <Dialog
        open={opens}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ color: "#19355f" }}>
          Your Score is {props.score}
        </DialogTitle>
        <DialogContent>{props.score}</DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="medium"
            className={classes.buttonInPop}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
