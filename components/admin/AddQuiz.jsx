import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminContext from "../../store/adminContext";
import PostAddIcon from "@material-ui/icons/PostAdd";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.secondary,
  },
  textFieldQuestion: {
    width: "100%",
    height: "50%",
    marginTop: theme.spacing(2),
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
  textFieldChoice: {
    width: "100%",
    minWidth: "50vw",
    marginTop: theme.spacing(-3),
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
    borderRadius: theme.spacing(3),
    color: theme.palette.common.white,
    margin: theme.spacing(2, 2, 2, 0),
    minWidth: theme.spacing(12),
    textTransform: "none",
    fontSize: "16px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
  buttonAddChoice: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(1),
    color: theme.palette.common.white,
    margin: theme.spacing(5, 0, 5, 0),
    minWidth: theme.spacing(12),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  isiQuestion: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.6em + 0.5vw)`,
    color: theme.palette.secondary.secondary,
  },
  dialog: {
    minWidth: "50vw",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddQuestion(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [cookies, setCookie] = useCookies();
  const { load_, admin_, trigger_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [admin, setAdmin] = admin_;
  const [trigger, setTrigger] = trigger_;

  const [values, setValues] = React.useState({ question: "" });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postAddQuestion = async () => {
    setOpen(false);
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/questionquiz";
    const auth = cookies.token_admin;

    const MyJSON = JSON.stringify({
      question: values.question,
      quiz_id: props.quizID,
    });

    try {
      const response = await axios.post(url, MyJSON, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
        setTrigger(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    } finally {
      setLoad(false);
      setTrigger(false);
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
        Add Question
      </Button>

      <Dialog
        className={classes.dialog}
        open={open}
        fullWidth
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">
          {"Add Question"}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            label="Question"
            multiline
            color="secondary"
            className={classes.textFieldQuestion}
            rows={6}
            variant="outlined"
            onChange={handleChange("question")}
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
            onClick={postAddQuestion}
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
