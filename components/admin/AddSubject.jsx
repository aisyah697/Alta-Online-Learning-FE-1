import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PostAddIcon from "@material-ui/icons/PostAdd";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AdminContext from "../../store/adminContext";
import axios from "axios";
import { useCookies } from "react-cookie";

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

  inputFile: {
    margin: theme.spacing(3, 0, 0, 0),
  },
}));
export default function AddSubject(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    postAddSubject();
    setOpen(false);
  };

  const { admin_, token_, load_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [token, setToken] = token_;

  const [cookies] = useCookies();
  const [load, setLoad] = load_;
  const [subject, setSubject] = useState();

  const [values, setValues] = useState({
    name: "",
    description: "",
    quesioner: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const postAddSubject = async () => {
    setOpen(false);
    const urlSubject = process.env.NEXT_PUBLIC_BASE_URL + "/subject";
    // const urlExam = process.env.NEXT_PUBLIC_BASE_URL + "/subject";
    const auth = cookies.token_admin;

    const DataSubject = JSON.stringify({
      name: values.name,
      description: values.description,
      module_id: props.ID[0].module_id,
      quesioner: values.quesioner,
    });
    // const DataExam = JSON.stringify({
    //   type_exam: values.type_exam,
    //   subject_id: values.subject_id,
    // });

    try {
      const response = await axios.post(urlSubject, DataSubject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });
      // const res = await axios.post(urlExam, DataExam, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + auth,
      //   },
      // });

      if (response.status === 200) {
        setLoad(true);
        setSubject(response.data);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    }
  };
  console.log("valuesssss", props.ID);

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
        Add Subject
      </Button>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">
          {"Add Subject"}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            label="Subject Name"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
            onChange={handleChange("name")}
          />
          <TextField
            id="outlined-multiline-static"
            label="Quesioner"
            color="secondary"
            className={classes.textFieldFile}
            variant="outlined"
            onChange={handleChange("quesioner")}
          />
          {/* <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            size="small"
            color="secondary"
          >
            <InputLabel color="secondary">Chose Exam Type</InputLabel>
            <Select
              onChange={handleChange("type_exam")}
              label="Chose Exam Type"
            >
              <MenuItem value={"quiz"}>Quiz</MenuItem>
              <MenuItem value={"livecode"}>Live Code</MenuItem>
            </Select>
          </FormControl> */}
          <TextField
            id="outlined-multiline-static"
            label="Subject Description"
            multiline
            color="secondary"
            className={classes.textFieldFile}
            rows={4}
            variant="outlined"
            onChange={handleChange("decription")}
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
