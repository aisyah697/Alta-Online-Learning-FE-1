import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AdminContext from "../../store/adminContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  yesButton: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    minWidth: theme.spacing(10),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
  noButton: {
    backgroundColor: theme.palette.secondary.secondary,
    borderColor: theme.palette.secondary.secondary,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    minWidth: theme.spacing(10),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  actionArea: {
    padding: theme.spacing(2, 3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteUserPopUp(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openBar, setOpenBar] = React.useState(false);

  const { admin_, token_, load_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [token, setToken] = token_;
  const [load, setLoad] = load_;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenBar = () => {
    setOpenBar(true);
  };

  const handleCloseBar = () => {
    setOpenBar(false);
  };

  const handleDelete = () => {
    handleClose();
    deleteAdmin();
    setOpenBar(true);
  };

  const deleteAdmin = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/admin/" + props.ID;
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
      }
    } catch (error) {
      console.error("Something Wrong, Please Try Again!", error);
      throw new Error(error);
    }
  };

  return (
    <div>
      <IconButton
        color={"secondary"}
        variant="outlined"
        size="small"
        onClick={handleClickOpen}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ color: "#19355f" }}>
          {`Are you sure want to delete ${props.username} ?`}
        </DialogTitle>
        <DialogActions className={classes.actionArea}>
          <Button
            className={classes.noButton}
            variant="outlined"
            size="small"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            className={classes.yesButton}
            variant="outlined"
            size="small"
            onClick={handleDelete}
            autoFocus
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openBar}
        autoHideDuration={6000}
        onClose={handleCloseBar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleCloseBar} severity="success">
          Admin has been deleted!
        </Alert>
      </Snackbar>
    </div>
  );
}
