import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import dynamic from "next/dynamic";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import AdminContext from "../../store/adminContext";

const EditChoice = dynamic(() => import("./EditChoice"));

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
    marginTop: theme.spacing(3),
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
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(2),
    color: theme.palette.common.white,
    margin: theme.spacing(2, 2, 2, 0),
    minWidth: theme.spacing(12),
    textTransform: "none",
    fontSize: "15px",
    "&:hover": {
      borderColor: "theme.palette.secondary.main",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
    },
  },
  buttonAddChoice: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    border: "1px solid #f4752e",
    borderRadius: theme.spacing(2),
    color: theme.palette.common.white,
    margin: theme.spacing(3, 0, 3, 0),
    minWidth: theme.spacing(12),
    textTransform: "none",
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      border: "1px solid #f4752e",
      WebkitBoxShadow: "none",
    },
  },
  inputQuestion: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.6em + 0.5vw)`,
    color: theme.palette.secondary.secondary,
  },
  action: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function EditAltaTest(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [cookies, setCookie] = useCookies();

  const { load_, trigger_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [trigger] = trigger_;
  const [choices, setChoices] = useState("");

  const [values, setValues] = React.useState({
    question: props.question,
    choice: "",
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
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/questionaltatest/" + props.ID;
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
        setOpenBar(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    }
  };

  const postAddChoice = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/choicealtatest";
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
    }

    setValues({ ...values, choice: "" });
    // reset input form
    document.getElementById("add-choice").value = "";
  };

  React.useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/questionaltatest/" + props.ID;
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
          {"Edit Question Alta Test"}
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.inputQuestion}>
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
          <TextField
            id="add-choice"
            label="Add Choice"
            multiline
            color="secondary"
            className={classes.textFieldChoice}
            rows={2}
            variant="outlined"
            onChange={handleChange("choice")}
            defaultValue={values.choice}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonAddChoice}
            startIcon={<AddIcon />}
            onClick={postAddChoice}
          >
            Add Multiple Choice
          </Button>
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
