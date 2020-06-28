import React, {useContext} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import AdminContext from "../../store/adminContext";
import axios from "axios";

export default function DeleteUserPopUp(props) {
  const [open, setOpen] = React.useState(false);

  const {admin_, token_, load_} = useContext(AdminContext);
  const [admin, setAdmin] = admin_
  const [token, setToken] = token_
  const [load, setLoad] = load_

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleClose();
    deleteAdmin();
  }

  const deleteAdmin = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/admin/' + props.ID
      try {
        const response = await axios.delete(url,{
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization':'Bearer ' + token
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
  }

  return (
    <div>
      <IconButton color={"secondary"} variant="outlined" size="small" onClick={handleClickOpen}>
        <DeleteIcon fontSize="small" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{color: '#19355f'}}>
          {`Are you sure want to delete ${props.username} ?`}
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" size="small" onClick={handleClose}>
            No
          </Button>
          <Button
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
    </div>
  );
}
