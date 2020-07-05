import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Radio from "@material-ui/core/Radio";

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
    margin: theme.spacing(2, 0, 2, 0),
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

export default function EditSubject({ subject }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const { id, id_module, module, id_subject } = router.query;

  const [cookies] = useCookies();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    name: subject.name,
    description: subject.description,
    quesioner: subject.quesioner,
    videoTitle: "",
    pptTitle: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  if (subject.video[0]) {
    var videoName = subject.video[0].name;
    var videoFile = subject.video[0];
  } else {
    var videoName = "";
    var videoFile = "";
  }

  const [video, setVideo] = React.useState(videoFile);

  const handleVideo = (e) => {
    if (e.target.files.length) {
      setVideo(e.target.files[0]);
    }
  };

  if (subject.presentation[0]) {
    var pptName = subject.presentation[0].name;
    var pptFile = subject.presentation[0].content_file;
  } else {
    var pptName = "";
    var pptFile = "";
  }

  const [presentation, setPresentation] = React.useState(pptFile);

  const handlePresentation = (e) => {
    if (e.target.files.length) {
      setPresentation(e.target.files[0]);
    }
  };

  if (subject.exam[0]) {
    var type_exam = subject.exam[0].type_exam;
  } else {
    var type_exam = "";
  }

  const [exam, setExam] = React.useState(type_exam);

  // const [selectedValue, setSelectedValue] = React.useState('quiz');

  const handleChangeRadio = (event) => {
    setExam(event.target.value);
  };

  const postEditSubject = async () => {
    setOpen(false);
    const urlSubject =
      process.env.NEXT_PUBLIC_BASE_URL + "/subject/" + subject.id;
    const auth = cookies.admin.token;

    const MyJOSN = JSON.stringify({
      name: values.name,
      description: values.description,
      quesioner: values.quesioner,
    });

    try {
      const response = await axios.patch(urlSubject, MyJOSN, {
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
    } finally {
      setLoad(false);
    }
  };

  const postVideo = async () => {
    const urlVideo = process.env.NEXT_PUBLIC_BASE_URL + "/filesubject";
    const auth = cookies.admin.token;

    const formDataVideo = new FormData();
    formDataVideo.append("name", values.videoTitle);
    formDataVideo.append("content_file", video);
    formDataVideo.append("subject_id", subject.id);
    formDataVideo.append("category_file", "video");

    try {
      const response = await axios.post(urlVideo, formDataVideo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };
  const postEditVideo = async () => {
    const urlVideo =
      process.env.NEXT_PUBLIC_BASE_URL + `/filesubject/${subject.video[0].id}`;
    const auth = cookies.admin.token;

    const formDataVideo = new FormData();
    formDataVideo.append("name", values.videoTitle);
    formDataVideo.append("content_file", video);
    formDataVideo.append("category_file", "video");

    try {
      const response = await axios.patch(urlVideo, formDataVideo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  const postPresentation = async () => {
    const urlPPT = process.env.NEXT_PUBLIC_BASE_URL + "/filesubject";
    const auth = cookies.admin.token;

    const formDataPPT = new FormData();
    formDataPPT.append("name", values.pptTitle);
    formDataPPT.append("content_file", presentation);
    formDataPPT.append("subject_id", subject.id);
    formDataPPT.append("category_file", "presentation");

    try {
      const response = await axios.post(urlPPT, formDataPPT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  const postEditPresentation = async () => {
    const urlPPT =
      process.env.NEXT_PUBLIC_BASE_URL +
      `/filesubject/${subject.presentation[0].id}`;
    const auth = cookies.admin.token;

    const formDataPPT = new FormData();
    formDataPPT.append("name", values.pptTitle);
    formDataPPT.append("content_file", presentation);
    formDataPPT.append("category_file", "video");

    try {
      const response = await axios.patch(urlPPT, formDataPPT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  const postExam = async () => {
    const urlExam = process.env.NEXT_PUBLIC_BASE_URL + "/exam";
    const auth = cookies.admin.token;

    const MyJOSN = JSON.stringify({
      subject_id: subject.id,
      type_exam: exam,
    });

    try {
      const response = await axios.post(urlExam, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  const postEditExam = async () => {
    const urlExam =
      process.env.NEXT_PUBLIC_BASE_URL + `/exam/${subject.exam[0].id}`;
    const auth = cookies.admin.token;

    const MyJOSN = JSON.stringify({
      subject_id: subject.id,
      type_exam: exam,
    });

    try {
      const response = await axios.patch(urlExam, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
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
          <TextField
            id="outlined-multiline-static"
            label="Subject Name"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
            defaultValue={subject.name}
            size={"small"}
            onChange={handleChange("name")}
          />
          <TextField
            id="outlined-multiline-static2"
            label="Subject Description"
            multiline
            color="secondary"
            className={classes.textFieldFile}
            defaultValue={subject.description}
            variant="outlined"
            onChange={handleChange("description")}
          />
          <TextField
            id="outlined-multiline-static3"
            label="Subject Quesioner"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
            defaultValue={subject.quesioner}
            size={"small"}
            onChange={handleChange("quesioner")}
          />
          <Divider />
          <Divider />
          <div className={classes.inputFile}>
            <InputLabel htmlFor="outlined-adornment-file444">
              Choose Video File
            </InputLabel>
            <br />
            <input
              accept="video/*"
              className={classes.input}
              id="upload-video"
              style={{ display: "none", marginTop: "20px" }}
              type="file"
              onChange={handleVideo}
            />
            <label htmlFor="upload-video">
              <Button variant="contained" color="primary" component="span">
                Browse
              </Button>
            </label>
            <TextField
              id="outlined-multiline-static33"
              label="Video Name"
              color="secondary"
              style={{ marginLeft: "10px", marginRight: "10px" }}
              variant="outlined"
              size={"small"}
              onChange={handleChange("videoTitle")}
            />

            {subject.video[0] ? (
              <Button
                onClick={postEditVideo}
                variant="contained"
                color="secondary"
                component="span"
                style={{ color: "#fff" }}
              >
                Change
              </Button>
            ) : (
              <Button
                onClick={postVideo}
                variant="contained"
                color="secondary"
                component="span"
                style={{ color: "#fff" }}
              >
                Upload
              </Button>
            )}
          </div>
          <div className={classes.inputFile}>
            <InputLabel htmlFor="outlined-adornment-file">
              Choose Presentation File
            </InputLabel>
            <br />
            <input
              accept="application/*"
              className={classes.input}
              id="upload-ppt"
              style={{ display: "none", marginTop: "20px" }}
              type="file"
              onChange={handlePresentation}
            />
            <label htmlFor="upload-ppt">
              <Button variant="contained" color="primary" component="span">
                Browse
              </Button>
            </label>
            <TextField
              id="outlined-multiline-static5"
              label="Presentation Name"
              color="secondary"
              style={{ marginLeft: "10px", marginRight: "10px" }}
              variant="outlined"
              size={"small"}
              onChange={handleChange("presentationName")}
            />
            {!presentation ? (
              <Button
                onClick={postPresentation}
                variant="contained"
                color="secondary"
                component="span"
                style={{ color: "#fff" }}
              >
                Upload
              </Button>
            ) : (
              <Button
                onClick={postEditPresentation}
                variant="contained"
                color="secondary"
                component="span"
                style={{ color: "#fff" }}
              >
                Change
              </Button>
            )}
          </div>
          <div className={classes.inputFile}>
            <InputLabel htmlFor="outlined-adornment-file">
              Choose Type Exam
            </InputLabel>
            <br />
            <div style={{ display: "flex" }}>
              <RadioGroup
                style={{ display: "flex", flexDirection: "row" }}
                aria-label="quiz"
                name="quiz"
                value={exam}
                onChange={handleChangeRadio}
              >
                <FormControlLabel
                  value="quiz"
                  control={<Radio />}
                  label="Quiz"
                />
                <FormControlLabel
                  value="livecode"
                  control={<Radio />}
                  label="Livecode"
                />
              </RadioGroup>
              {!type_exam ? (
                <Button
                  onClick={postExam}
                  variant="contained"
                  color="secondary"
                  component="span"
                  style={{ color: "#fff", marginLeft: "150px" }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  onClick={postEditExam}
                  variant="contained"
                  color="secondary"
                  component="span"
                  style={{ color: "#fff", marginLeft: "150px" }}
                >
                  Change
                </Button>
              )}
            </div>
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
            onClick={postEditSubject}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
