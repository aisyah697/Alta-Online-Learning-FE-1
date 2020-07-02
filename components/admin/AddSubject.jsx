import React from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import clsx from "clsx";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import PostAddIcon from "@material-ui/icons/PostAdd";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import AdminContext from "../../store/adminContext";

const useStyles = makeStyles((theme) => ({
  buttonIcon: {
    color: "white",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  title: {
    color: theme.palette.secondary.secondary,
  },
  textFieldFile: {
    width: "100%",
    marginTop: theme.spacing(5),
    background: "white",
    "&:hover label.Mui-focused": {
      color: "darkBlue",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "darkBlue",
      },
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
  buttonInpuFile: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(1),
    color: theme.palette.common.white,
    margin: theme.spacing(2, 2, 2, 0),
    minWidth: theme.spacing(10),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1, 0, 1, 0),
    background: "white",
    "&:hover label.Mui-focused": {
      color: "darkBlue",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "darkBlue",
      },
    },
  },

  inputFile: {
    margin: theme.spacing(3, 0, 0, 0),
  },
}));
export default function AddSubject(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { admin_, token_, load_ } = React.useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [token, setToken] = token_;
  const [load, setLoad] = load_;
  const [cookies] = useCookies();

  const [subject, setSubject] = React.useState();
  const [values, setValues] = React.useState({
    name: "", description: "", quesioner: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const postAddSubject = async (e) => {
    e.preventDefault();
    setOpen(false);
    const urlSubject = process.env.NEXT_PUBLIC_BASE_URL + "/subject";
    const auth = cookies.token_admin;

    const DataSubject = JSON.stringify({
      name: values.name,
      description: values.description,
      module_id: props.ID,
      quesioner: values.quesioner,
    });

    try {
      const response = await axios.post(urlSubject, DataSubject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
        setSubject(response.data);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
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
        startIcon={<PostAddIcon />}
      >
        Add Subject
      </Button>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">
          {"Add Subject"}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static1"
            label="Subject Name"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
            onChange={handleChange("name")}
          />
          <TextField
            id="outlined-multiline-static2"
            label="Quesioner"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
            onChange={handleChange("quesioner")}
          />
          <TextField
            id="outlined-multiline-static3"
            label="Subject Description"
            multiline
            color="secondary"
            className={classes.textFieldFile}
            rows={4}
            variant="outlined"
            onChange={handleChange("decription")}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            variant="outlined"
            size="small"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => postAddSubject(e)}
            autoFocus
            className={classes.button}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
