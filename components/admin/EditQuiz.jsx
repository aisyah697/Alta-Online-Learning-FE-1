import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import dynamic from "next/dynamic";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminContext from "../../store/adminContext";
import Loading from "../Loading";

const EditChoice = dynamic(() => import("./EditChoiceQuiz"));

const useStyles = makeStyles((theme) => ({
  buttonIcon: {
    color: theme.palette.secondary.secondary,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  title: {
    color: theme.palette.secondary.secondary,
  },
  textFieldQuestion: {
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
  textFieldChoice: {
    width: "100%",
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
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    marginBottom: theme.spacing(1),
    minWidth: theme.spacing(12),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
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
  action: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function EditQuiz(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [choices, setChoices] = useState("");

  const [values, setValues] = React.useState({
    question: props.question, choice: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postEditQuestion = async () => {
    setOpen(false);
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/questionquiz/" + props.ID;
    const auth = cookies.token_admin;

    const MyJOSN = JSON.stringify({
      question: values.question,
    });

    try {
      const response = await axios.patch(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    } finally {
      setLoad(false)
    }
  };

  const postAddChoice = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/choicequiz";
    const auth = cookies.token_admin;

    const MyJOSN = JSON.stringify({
      choice: values.choice,
      question_id: props.ID,
    });

    try {
      const response = await axios.post(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    } finally {
      setLoad(false)
    }

    setValues({ ...values, choice: "" });
    document.getElementById("add-choices").value = "";
  };

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/questionquiz/" + props.ID;
    const auth = cookies.token_admin;
    const fetchData = async function () {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        });
        if (response.status === 200) {
          setChoices(response.data.choice_id);
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, [load]);

    return (
      <div>
        <IconButton variant="outlined" size="small" onClick={handleClickOpen}>
          <EditIcon className={classes.buttonIcon} fontSize="small" />
        </IconButton>

        <Dialog
          open={open}
          fullWidth
          maxWidth={"md"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.title} id="alert-dialog-title">
            {"Edit Question Quiz"}
          </DialogTitle>
          <DialogContent>
            <Typography className={classes.isiQuestion}>
              {props.question}
            </Typography>
            <TextField
              id="outlined-multiline-static"
              label="Edit Question"
              multiline
              color="secondary"
              className={classes.textFieldQuestion}
              rows={4}
              variant="outlined"
              defaultValue={props.question}
              onChange={handleChange("question")}
            />
            <div>
              {choices
                ? choices.map((item, index) => (
                    <EditChoice
                      key={index}
                      choice={item.choice}
                      ID={item.id}
                      correct={item.is_correct}
                    />
                  ))
                : null}
            </div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonAddChoice}
              startIcon={<AddIcon />}
              onClick={postAddChoice}
            >
              Add Multiple Choice
            </Button>
            <TextField
              id="add-choices"
              label="Add Choice"
              multiline
              color="secondary"
              className={classes.textFieldChoice}
              rows={2}
              variant="outlined"
              onChange={handleChange("choice")}
              defaultValue={values.choice}
            />
          </DialogContent>
          <DialogActions className={classes.action}>
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
              onClick={postEditQuestion}
              autoFocus
              className={classes.button}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
