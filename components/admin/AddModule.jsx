import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
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
    minWidth: theme.spacing(8),
    padding: "7px 20px",
    textTransform: "none",
    width: "250px",
    marginBottom: theme.spacing(3),
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
}));
export default function AddModule() {
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
        startIcon={<PostAddIcon />}
      >
        Add Index
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.allText} id="form-dialog-title">
          Add Index
        </DialogTitle>
        <DialogContent>
          <TextField
            className={classes.textField}
            variant="outlined"
            color="secondary"
            label="Index Name"
            size="small"
          />
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            size="small"
            color="secondary"
          >
            <InputLabel color="secondary">Mentor</InputLabel>
            <Select label="Mentor">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"1"}>
                Prof. Kobar Septianus S.Pd, M.Komp
              </MenuItem>
              <MenuItem value={"2"}>Dinsyah</MenuItem>
              <MenuItem value={"3"}>Razin</MenuItem>
              <MenuItem value={"4"}>Faris</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className={classes.textField}
            variant="outlined"
            color="secondary"
            rows={7}
            multiline
            label="Index Description"
            size="small"
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            color="secondary"
            rows={2}
            multiline
            label="System Requirements Index"
            size="small"
          />
          <Button
            onClick={handleClickOpen}
            variant="outlined"
            color="primary"
            size="medium"
            className={classes.buttonIcon}
            startIcon={<AddIcon />}
          >
            Add System Requirements
          </Button>
          <Typography className={classes.allText}>
            System Requirements :
          </Typography>
          <List>
            <ListItem>
              <IconButton>
                <DeleteIcon color="secondary" />
              </IconButton>
              <Typography className={classes.allText}>
                Lorem ipsum dolor sit amet, consectetur
              </Typography>
            </ListItem>
            <ListItem>
              <IconButton>
                <DeleteIcon color="secondary" />
              </IconButton>
              <Typography className={classes.allText}>
                Lorem ipsum dolor sit amet, consectetur
              </Typography>
            </ListItem>
            <ListItem>
              <IconButton>
                <DeleteIcon color="secondary" />
              </IconButton>
              <Typography className={classes.allText}>
                Lorem ipsum dolor sit amet, consectetur
              </Typography>
            </ListItem>
            <ListItem>
              <IconButton>
                <DeleteIcon color="secondary" />
              </IconButton>
              <Typography className={classes.allText}>
                Lorem ipsum dolor sit amet, consectetur
              </Typography>
            </ListItem>
            <ListItem>
              <IconButton>
                <DeleteIcon color="secondary" />
              </IconButton>
              <Typography className={classes.allText}>
                Lorem ipsum dolor sit amet, consectetur
              </Typography>
            </ListItem>
            <ListItem>
              <IconButton>
                <DeleteIcon color="secondary" />
              </IconButton>
              <Typography className={classes.allText}>
                Lorem ipsum dolor sit amet, consectetur
              </Typography>
            </ListItem>
          </List>
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
            onClick={handleClose}
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
