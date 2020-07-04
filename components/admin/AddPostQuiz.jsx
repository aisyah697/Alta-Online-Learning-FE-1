import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import dynamic from "next/dynamic";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminContext from "../../store/adminContext";
import PostAddIcon from "@material-ui/icons/PostAdd";
import IconButton from "@material-ui/core/IconButton";

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
    transition: "0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  buttonIcon: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(1),
    color: theme.palette.common.white,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
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
  allText: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
  divButton: {
    display: "flex",
    justifyContent: "left",
    marginTop: "20px",
  },
  input: {
    display: "none",
  },
}));

export default function PostQuiz({exam}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies();

  const { load_, trigger_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [trigger, setTrigger] = trigger_

  const [values, setValues] = React.useState({name: "", description: "" });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postQuiz = async () => {
    setOpen(false);
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/quiz";
    const auth = cookies.token_admin;

    const MyJOSN = JSON.stringify({
      exam_id: exam.id,
      name: values.name,
      description: values.description,
    });

    try {
      const response = await axios.post(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
        setTrigger(true)
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    } finally {
      setLoad(false)
      setTrigger(false)
    }
  };

  return (
    <div>
      <IconButton variant="outlined" size="small" onClick={handleClickOpen}>
        <AddIcon className={classes.buttonIcon} fontSize="default" />
      </IconButton>

      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.allText} id="form-dialog-title">
          Add Quiz
        </DialogTitle>
        <DialogContent>
          <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Quiz Name"
              size="small"
              value={values.name}
              onChange={handleChange("name")}
          />

          <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              rows={7}
              multiline
              label="Quiz Description"
              size="small"
              value={values.description}
              onChange={handleChange("description")}
          />
        </DialogContent>
        <DialogActions>
          <Button
              onClick={handleClose}
              variant="outlined"
              size="medium"
              className={classes.buttonInPop}
          >
            Cancel
          </Button>
          <Button
              onClick={postQuiz}
              variant="outlined"
              size="medium"
              className={classes.buttonInPop}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
