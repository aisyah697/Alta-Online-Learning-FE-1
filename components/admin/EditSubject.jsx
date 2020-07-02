import React, { useContext } from "react";
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
export default function EditSubject(props) {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  var namaPresentasi = "";
  var namaVideo = "";
  var videoFile = "";
  var presFile = "";
  if (props.subject.video[0] != undefined) {
    var namaVideo = props.subject.video[0].name;
    var videoFile = props.subject.video[0].content_file;
  }
  if (props.subject.presentation[0] != undefined) {
    var namaPresentasi = props.subject.video[0].name;
    var presFile = props.subject.presentation[0].content_file;
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [quiz, setQuiz] = React.useState();
  const [cookies] = useCookies();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;

  const [values, setValues] = React.useState({
    name: props.subject.name,
    description: props.subject.description,
    // video
    videoName: namaVideo,
    // presentation
    pressentationName: namaPresentasi,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [video, setVideo] = React.useState(videoFile);
  const [presentation, setPresentation] = React.useState(presFile);

  const handleVideo = (e) => {
    if (e.target.files.length) {
      setVideo(e.target.files[0]);
    }
  };
  const handlePresentation = (e) => {
    if (e.target.files.length) {
      setPresentation(e.target.files[0]);
    }
  };

  const postEditSubject = async () => {
    setOpen(false);
    const urlSubject =
      process.env.NEXT_PUBLIC_BASE_URL + "/subject/" + props.subject.id;
    const urlVideo =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/filesubject/" +
      props.subject.video[0].id;
    const urlPresentation =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/filesubject/" +
      props.subject.presentation[0].id;
    const auth = cookies.admin.token;

    const formDataVideo = new FormData();
    formDataVideo.append("name", values.videoName);
    formDataVideo.append("content_file", video);

    const formDataPresentation = new FormData();
    formDataVideo.append("name", values.videoName);
    formDataVideo.append("content_file", presentation);

    const MyJOSN = JSON.stringify({
      name: values.name,
      description: values.description,
    });
    try {
      const response = await axios.patch(urlSubject, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      const responseVideo = await axios.patch(urlVideo, formDataVideo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      const responsePresentation = await axios.patch(
        urlPresentation,
        formDataPresentation,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      );

      if (
        response.status === 200 &&
        responseVideo.status === 200 &&
        responsePresentation.status === 200
      ) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
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
        startIcon={<EditIcon />}
      >
        Edit Subject
      </Button>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">
          {"Edit Subject"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography className={classes.allText}>
            {props.subject.name}
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Subject Name"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
            onChange={handleChange("name")}
          />
          <Divider />
          <Divider />
          <Typography className={classes.allText}>
            {props.subject.description}
          </Typography>
          <TextField
            onChange={handleChange("description")}
            id="outlined-multiline-static"
            label="Subject Description"
            multiline
            color="secondary"
            className={classes.textFieldFile}
            rows={4}
            variant="outlined"
          />
          <Typography className={classes.allText}>{props.videoName}</Typography>
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
          <Divider />
          <Typography className={classes.allText}>
            {props.pressentationName}
          </Typography>
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
                onChange={handlePresentation}
                row={3}
                type="file"
              />
            </Button>
            <TextField
              id="outlined-multiline-static"
              label="Presentation Name"
              color="secondary"
              className={classes.textFieldFile}
              variant="outlined"
              onChange={handleChange("pressentationName")}
            />
          </div>
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
            onClick={() => postEditSubject()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
