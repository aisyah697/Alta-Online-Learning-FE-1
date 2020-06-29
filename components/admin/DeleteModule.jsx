import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import AdminContext from "../../store/adminContext";
import axios from "axios";

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
}));
export default function DeleteModule(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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

  const handleDelete = () => {
    handleClose();
    deleteModule();
  };

  const deleteModule = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/module/" + props.ID;
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
      <IconButton variant="outlined" size="small" onClick={handleClickOpen}>
        <DeleteIcon className={classes.buttonIcon} fontSize="default" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure want to delete ${props.name}?`}
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
            onClick={handleDelete}
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
