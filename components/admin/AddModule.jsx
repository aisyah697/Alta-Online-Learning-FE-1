import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Dialog from "@material-ui/core/Dialog";
import InputLabel from "@material-ui/core/InputLabel";
import DialogActions from "@material-ui/core/DialogActions";
import Select from "@material-ui/core/Select";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PostAddIcon from "@material-ui/icons/PostAdd";
import MenuItem from "@material-ui/core/MenuItem";
import Router, { useRouter } from "next/router";
import AdminContext from "../../store/adminContext";
import axios from "axios";

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
    transition: "0.3s",
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
  divButton: {
    display: "flex",
    justifyContent: "left",
    marginTop: "20px",
  },
  input: {
    display: "none",
  },
  uploadPhoto: {
    backgroundColor: theme.palette.secondary.secondary,
    color: "#ffffff",
    boxShadow: "none",
    border: "1px solid #19355f",
    WebkitBorderRadius: "20px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#ffffff",
      boxShadow: "none",
      border: "1px solid #19355f",
      color: theme.palette.secondary.secondary,
    },
  },
}));

export default function AddModule() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { admin_, token_, load_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [token, setToken] = token_;

  const [cookies] = useCookies();
  const [load, setLoad] = load_;
  const [module, setModule] = useState();

  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const [images, setImages] = useState(values.image);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleImage = (e) => {
    if (e.target.files.length) {
      setImages(e.target.files[0]);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postModule = async (name, description, image, phase_id) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/module";

    if (name != "" || description != "") {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("admin_id", admin.id);
      formData.append("phase_id", id);
      formData.append("image", images);

      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setLoad(true);
          setModule(response.data);
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
        }
      } catch (error) {
        console.error("Something Wrong, Please Try Again!", error);
        throw new Error(error);
      }
    } else {
      setMessage("Please enter module name and description");
    }
  };

  const handleSubmit = async () => {
    handleClose();
    setLoad(true);
    postModule(values.name, values.description, values.image);
  };

  return (
    <div>
      {admin.role === "super" || "academic" ? (
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<PostAddIcon />}
        >
          Add Module
        </Button>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.allText} id="form-dialog-title">
          Add Module
        </DialogTitle>
        <DialogContent>
          <TextField
            className={classes.textField}
            variant="outlined"
            color="secondary"
            label="Module Name"
            size="small"
            value={values.name}
            onChange={handleChange("name")}
          />

          {/*<FormControl*/}
          {/*  className={clsx(classes.margin, classes.textField)}*/}
          {/*  variant="outlined"*/}
          {/*  size="small"*/}
          {/*  color="secondary"*/}
          {/*>*/}
          {/*  <InputLabel color="secondary">Phase</InputLabel>*/}
          {/*  <Select*/}
          {/*    label="phase"*/}
          {/*    value={values.phase_id}*/}
          {/*    onChange={handleChange("phase_id")}*/}
          {/*  >*/}
          {/*    <MenuItem value={"1"}>1</MenuItem>*/}
          {/*    <MenuItem value={"2"}>2</MenuItem>*/}
          {/*  </Select>*/}
          {/*</FormControl>*/}

          <TextField
            className={classes.textField}
            variant="outlined"
            color="secondary"
            rows={7}
            multiline
            label="Module Description"
            size="small"
            value={values.description}
            onChange={handleChange("description")}
          />

          <div className={classes.divButton}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="image"
              onChange={handleImage}
            />
            <label htmlFor="contained-button-file">
              <Button
                className={classes.uploadPhoto}
                variant="contained"
                color="primary"
                component="span"
              >
                Upload Module Image
              </Button>
            </label>
          </div>
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
            onClick={handleSubmit}
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
// }
