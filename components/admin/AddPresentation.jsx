import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import InputLabel from "@material-ui/core/InputLabel";
import { useCookies } from "react-cookie";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
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
    margin: theme.spacing(3, 0, 2, 0),
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
  buttonInputFile: {
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
  buttonIcon: {
    color: theme.palette.secondary.secondary,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
    fontSize: `calc(2em + 4vw)`,
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0.5, 2),
    textTransform: "none",
    fontSize: "14px",
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
    },
  },
  buttonCancel: {
    backgroundColor: theme.palette.secondary.secondary,
    color: theme.palette.primary.main,
    borderColor: theme.palette.secondary.secondary,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0.5, 2),
    textTransform: "none",
    fontSize: "14px",
    "&:hover": {
      color: theme.palette.secondary.secondary,
      backgroundColor: theme.palette.primary.main,
    },
  },
  actions: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
export default function AddPresentation(props) {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cookies] = useCookies();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [values, setValues] = React.useState({
    presentationName: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [presentation, setPresentation] = React.useState();
  const handlePresentation = (e) => {
    if (e.target.files.length) {
      setPresentation(e.target.files[0]);
    }
  };
  const postAddPresentation = async () => {
    setOpen(false);
    const urlpresentation = process.env.NEXT_PUBLIC_BASE_URL + "/filesubject";
    const auth = cookies.token_admin;
    const formDataPresentation = new FormData();
    formDataPresentation.append("name", values.presentationName);
    formDataPresentation.append("content_file", presentation);
    formDataPresentation.append("subject_id", props.ID);
    formDataPresentation.append("category_file", "presentation");
    try {
      const responsepresentation = await axios.post(
        urlpresentation,
        formDataPresentation,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      );
      if (responsepresentation.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      if (error === 500) {
        return <div />;
      }
      throw new Error(error);
    }
  };
  return (
    <div>
      <IconButton variant="outlined" size="small" onClick={handleClickOpen}>
        <AddToQueueIcon className={classes.buttonIcon} fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">
          {"Add Pesentation"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className={classes.inputFile}>
            <InputLabel htmlFor="outlined-adornment-file">
              Choose Presentation File
            </InputLabel>
            <Button variant="outlined" className={classes.buttonInputFile}>
              <input
                className={classes.textFieldFile}
                accept="presentation/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handlePresentation}
              />
            </Button>
          </div>
          <TextField
            id="outlined-multiline-static"
            label="Presentation Name"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
            onChange={handleChange("presentationName")}
            size={"small"}
          />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button
            className={classes.buttonCancel}
            variant="outlined"
            size="small"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="small"
            autoFocus
            className={classes.button}
            onClick={() => postAddPresentation()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
