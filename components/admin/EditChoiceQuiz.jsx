import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios";
import {useCookies} from "react-cookie";
import AdminContext from "../../store/adminContext";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  textFieldQuestion: {
    width: "100%",
    width: "100%",
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
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0, 0, 0, 2),
    color: theme.palette.common.white,
    marginBottom: theme.spacing(5),
    minWidth: theme.spacing(8),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  isiChoice: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.5em + 0.5vw)`,
    color: theme.palette.secondary.secondary,
  },
  expansionChoice: {
    marginLeft: theme.spacing(6),
  },
  buttonPosition: {
    marginLeft: theme.spacing(6),
  },
}));

export default function EditChoiceQuiz(props) {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies()

  const [correct, setCorrect] = React.useState(props.correct);
  const [checked, setChecked] = React.useState(props.correct);

  const {load_} = useContext(AdminContext);
  const [load, setLoad] = load_

  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    choice: props.choice
  });

  const handleInput = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setCorrect(!correct)
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postEditChoice = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/choicequiz/' + props.ID
    const auth = cookies.token_admin

    const MyJOSN = JSON.stringify({
      choice: values.choice,
      is_correct: correct
    })

    try {
      const response = await axios.patch(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          'Authorization':'Bearer ' + auth
        }
      });
      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    }
  }

  const postDeleteChoice = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/choicequiz/' + props.ID
    const auth = cookies.token_admin

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          'Authorization':'Bearer ' + auth
        }
      });
      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    }
  }
  
  console.log("AAAA", props.ID)

  return (
    <div className={classes.root}>
      <ExpansionPanel elevation={0}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
              control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    name="correct"
                    color="secondary"
                />
              }
              label={props.choice}
          />
          
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionChoice}>
          <TextField
            id="outlined-multiline-static"
            label="Edit Choice"
            multiline
            color="secondary"
            className={classes.textFieldQuestion}
            rows={2}
            variant="outlined"
            defaultValue={props.choice}
            onChange={handleInput('choice')}
          />
        </ExpansionPanelDetails>
        <div className={classes.buttonPosition}>
          <Button
              className={classes.button}
              variant="outlined"
              size="small"
              onClick={postEditChoice}
          >
            Submit Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            autoFocus
            className={classes.button}
            onClick={handleOpen}
          >
            Delete Choice
          </Button>
        </div>
      </ExpansionPanel>

      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{color: '#19355f'}}>
          {`Are you sure want to delete this choice ?`}
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" size="small" onClick={handleClose}>
            No
          </Button>
          <Button
              variant="outlined"
              size="small"
              onClick={postDeleteChoice}
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
