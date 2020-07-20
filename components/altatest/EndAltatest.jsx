import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonIcon: {
    color: "white",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
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
  button: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(4),
    fontSize: "calc(0.6em + 0.7vw)",
    fontFamily: "Muli, sans-serif",
    color: theme.palette.common.white,
    margin: theme.spacing(2, 2, 2, 4),
    minWidth: theme.spacing(20),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
}));

export default function EndAltatest(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sendEndTest = () => {
    // eslint-disable-next-line react/prop-types
    props.endTest("end");
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="primary"
        size="medium"
        className={classes.button}
      >
        End Test
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          "Are you sure want to end this test?"
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="medium"
            className={classes.buttonInPop}
          >
            No
          </Button>
          <Button
            onClick={sendEndTest}
            variant="outlined"
            size="medium"
            className={classes.buttonInPop}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
