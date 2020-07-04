import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import InputLabel from "@material-ui/core/InputLabel";
import { useCookies } from "react-cookie";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import AdminContext from "../../store/adminContext";

const useStyles = makeStyles((theme) => ({
  buttonIcon: {
    color: theme.palette.secondary.secondary,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
    fontSize: `calc(2em + 4vw)`,
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
export default function AddVideo(props) {
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
    videoName: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [video, setVideo] = React.useState();
  const handleVideo = (e) => {
    if (e.target.files.length) {
      setVideo(e.target.files[0]);
    }
  };
  const postAddVideo = async () => {
    setOpen(false);
    const urlVideo = process.env.NEXT_PUBLIC_BASE_URL + "/filesubject";
    const auth = cookies.admin.token;
    const formDataVideo = new FormData();
    formDataVideo.append("name", values.videoName);
    formDataVideo.append("content_file", video);
    formDataVideo.append("subject_id", props.ID);
    formDataVideo.append("category_file", "video");
    try {
      const responseVideo = await axios.post(urlVideo, formDataVideo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      if (responseVideo.status === 200) {
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
        <VideoCallIcon className={classes.buttonIcon} fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">
          {"Add Video"}
        </DialogTitle>
        <Divider />
        <DialogContent>
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
                type="file"
                onChange={handleVideo}
              />
            </Button>
          </div>
          <TextField
            id="outlined-multiline-static"
            label="Video Name"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
            onChange={handleChange("videoName")}
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
            autoFocus
            className={classes.button}
            onClick={() => postAddVideo()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
