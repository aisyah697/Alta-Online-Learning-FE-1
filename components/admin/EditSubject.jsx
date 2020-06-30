import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

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
    margin: theme.spacing(5, 0, 2, 0),
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

  inputFile: {
    margin: theme.spacing(3, 0, 0, 0),
  },
  allText: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    margin: theme.spacing(3, 0, -3, 0),
  },
}));
export default function EditSubject() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="primary"
        size="medium"
        className={classes.button}
        startIcon={<EditIcon />}
      >
        Edit Subject
      </Button>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">
          {"Edit Subject"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography className={classes.allText}>Algorithm</Typography>
          <TextField
            id="outlined-multiline-static"
            label="Subject Name"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
          />
          <Divider />
          <Typography className={classes.allText}>
            Learn Algorithm.mp4
          </Typography>
          <div className={classes.inputFile}>
            <InputLabel htmlFor="outlined-adornment-file">
              Chose Video FIle
            </InputLabel>
            <Button variant="outlined" className={classes.buttonInpuFile}>
              <input
                className={classes.textFieldFile}
                accept="video/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                row={3}
                type="file"
              />
            </Button>
          </div>
          <Divider />
          <Typography className={classes.allText}>Algorithm.ppt</Typography>
          <div className={classes.inputFile}>
            <InputLabel htmlFor="outlined-adornment-file">
              Chose Presentation File
            </InputLabel>
            <Button variant="outlined" className={classes.buttonInpuFile}>
              <input
                className={classes.textFieldFile}
                accept="application/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                row={3}
                type="file"
              />
            </Button>
          </div>
          <Divider />
          <Typography className={classes.allText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Subject Description"
            multiline
            color="secondary"
            className={classes.textFieldFile}
            rows={4}
            variant="outlined"
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
            onClick={handleClose}
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
