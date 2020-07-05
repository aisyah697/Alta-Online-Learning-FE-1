import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { useCookies } from "react-cookie";
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
  textFieldliveCode: {
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
}));
export default function EditLiveCode({ livecode }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies();

  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [values, setValues] = React.useState({
    name: livecode.name,
    link: livecode.link,
    description: livecode.description,
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

  const postEditChoice = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/livecode/" + livecode.id;
    const auth = cookies.token_admin;

    const MyJOSN = JSON.stringify({
      name: values.name,
      link: values.link,
      decription: values.description,
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
    }
  };

  return (
    <div>
      <IconButton variant="outlined" size="small" onClick={handleClickOpen}>
        <EditIcon className={classes.buttonIcon} fontSize="default" />
      </IconButton>

      <Dialog
        className={classes.dialog}
        open={open}
        fullWidth
        maxWidth={"md"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">
          {"Edit live Code"}
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.allText}>
            <strong>Name : </strong>
            {livecode.name}
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Name"
            multiline
            size="small"
            color="secondary"
            className={classes.textFieldliveCode}
            rows={1}
            variant="outlined"
            onChange={handleChange("name")}
          />
          <br />
          <Typography className={classes.allText}>
            <strong>Description : </strong>
            {livecode.description}
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            size="small"
            color="secondary"
            className={classes.textFieldliveCode}
            rows={3}
            variant="outlined"
            onChange={handleChange("description")}
          />
          <br />
          <Typography className={classes.allText}>
            <strong>Link : </strong>
            {livecode.link}
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Link"
            multiline
            size="small"
            color="secondary"
            className={classes.textFieldliveCode}
            rows={1}
            variant="outlined"
            onChange={handleChange("link")}
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
            onClick={postEditChoice}
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
