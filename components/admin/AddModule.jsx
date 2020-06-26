import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import PostAddIcon from "@material-ui/icons/PostAdd";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    minWidth: theme.spacing(8),
    padding: "7px 20px",
    textTransform: "none",
    width: "180px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
}));
export default function AddModule() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="primary"
        size="medium"
        className={classes.button}
        startIcon={<PostAddIcon />}
      >
        Add Module
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delete this user?"}
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" size="small" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClose}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
