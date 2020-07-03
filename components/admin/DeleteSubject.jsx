import React, { useContext } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { useCookies } from "react-cookie";

import AdminContext from "../../store/adminContext";
import {useRouter} from "next/router";
import Router from "next/router";
import Link from "next/link";

const Loading = dynamic(() => import('../Loading'))

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
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    margin: theme.spacing(2, 2, 2, 0),
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

export default function DeleteModule({ID}) {
  const classes = useStyles();
  const router = useRouter();
  const { id, id_module, module, id_subject } = router.query;

  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteQuestion = async () => {
    setOpen(false);
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/subject/" + ID;
    const auth = cookies.token_admin;

    const MyJOSN = JSON.stringify({
      status: false,
    });

    try {
      const response = await axios.put(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
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

    return (
      <div>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete Subject
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure want to delete this subject?"}
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
            <Link href={'/admin/academy/phase/[id]/[id_module]/[module]'}
                  as={`/admin/academy/phase/${id}/${id_module}/${module}`}>
              <Button
                onClick={deleteQuestion}
                variant="outlined"
                size="medium"
                className={classes.buttonInPop}
              >
                Yes
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
}
