import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import AdminContext from "../../store/adminContext";
import axios from "axios";
import Loading from "../../components/Loading";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteModule(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openBar, setOpenBar] = React.useState(false);

  const [cookies, setCookie] = useCookies();
  const { admin_, token_, load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
    e.stopPropagation();
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

  const deleteModule = async () => {
    setOpen(false);
    setLoading(true);
    setOpenBar(true);
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/module/" + props.id_module;
    const auth = cookies.token_admin;

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + auth,
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

  if (load) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
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
          <DialogTitle id="alert-dialog-title" style={{ color: "#19355f" }}>
            {`Are you sure want to delete this module?`}
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
              onClick={deleteModule}
              variant="outlined"
              size="medium"
              className={classes.buttonInPop}
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
            Module deleted!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
