import React, { useContext } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useCookies } from "react-cookie";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";

import UserContext from "../../store/userContext";

const Link = dynamic(() => import("../../utils/link"));
const Loading = dynamic(() => import('../Loading'))

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "2rem",
  },
  main: {
    margin: "30px 24px",
  },
  viewProfile: {
    margin: "auto",
    textAlign: "right",
  },
  buttonProfile: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
    boxShadow: "none",
    cursor: "pointer",
    border: "1px solid #F47522",
    WebkitBorderRadius: "2em",
    padding: theme.spacing(1, 2),
    transition: "all 0.5s ease",
    textTransform: "capitalize",
    letterSpacing: ".02em",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#ffffff",
      boxShadow: "none",
      border: "1px solid #F47522",
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  h1: {
    color: "#19345E",
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
    },
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
  },
  form: {
    marginTop: "30px",
  },
  textField: {
    width: "80ch",
    marginBottom: "18px",
    "&:hover": {
      borderColor: "#F47522",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  input: {
    display: "none",
  },
  uploadPhoto: {
    backgroundColor: "#ffffff",
    color: "#f4752e",
    boxShadow: "none",
    border: "1px solid #F47522",
    WebkitBorderRadius: "20px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#f4752e",
      boxShadow: "none",
      border: "1px solid #F47522",
      color: "#ffffff",
    },
  },
  divButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FormProfile = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies();
  const { mentee_ } = useContext(UserContext);
  const [user, setUser] = mentee_;

  const [values, setValues] = React.useState({
    fullName: user.full_name,
    email: user.email,
    birthPlace: user.place_birth,
    birthDate: user.date_birth,
    phoneNumber: user.phone,
    address: user.address,
    background_education: user.background_education,
    github: user.github,
    about: user.description,
  });

  const [images, setImages] = React.useState(user.avatar);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (e) => {
    if (e.target.files.length) {
      setImages(e.target.files[0]);
    }
  };

  const postEditProfile = async () => {
    // eslint-disable-next-line no-undef
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/mentee/" + user.id;
    const auth = cookies.token_mentee;

    const formData = new FormData();
    formData.append("full_name", values.fullName);
    formData.append("email", values.email);
    formData.append("place_birth", values.birthPlace);
    formData.append("date_birth", values.birthDate);
    formData.append("phone", values.phoneNumber);
    formData.append("github", values.github);
    formData.append("background_education", values.background_education);
    formData.append("address", values.address);
    formData.append("description", values.about);
    formData.append("avatar", images);

    try {
      const response = await axios.patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + auth,
        },
      });
      setCookie("mentee", response.data);
      setUser(response.data);
      setOpen(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    }
  };

  return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1 className={classes.h1}>Edit Profile</h1>
          </Grid>
          <Grid item xs={6} className={classes.viewProfile}>
            <Link
                href={"/mentee/[id]/[profile]"}
                as={`/mentee/${user.id}/${user.username}`}
            >
              <Button
                  className={classes.buttonProfile}
                  variant="contained"
                  color="primary"
              >
                My Profile
              </Button>
            </Link>
          </Grid>
        </Grid>
        <div className={classes.avatar}>
          <Avatar
              alt="Mentee Picture"
              src={user.avatar}
              className={classes.large}
          />
        </div>
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
              Upload Photo
            </Button>
          </label>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={1} md={2}/>
          <Grid item xs={10} md={8} style={{textAlign: "center"}}>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                  className={classes.textField}
                  variant="outlined"
                  color="secondary"
                  label="Full Name"
                  size="medium"
                  name="fullName"
                  defaultValue={user.full_name}
                  onChange={handleChange("fullName")}
              />
              <TextField
                  className={classes.textField}
                  variant="outlined"
                  color="secondary"
                  label="Email"
                  size="medium"
                  name="email"
                  defaultValue={user.email}
                  onChange={handleChange("email")}
              />
              <TextField
                  className={classes.textField}
                  variant="outlined"
                  color="secondary"
                  label="Birth Place"
                  size="medium"
                  name="birthPlace"
                  defaultValue={user.place_birth}
                  onChange={handleChange("birthPlace")}
              />
              <TextField
                  className={classes.textField}
                  variant="outlined"
                  color="secondary"
                  label="Birth Date"
                  placeholder="01 Januari 2000"
                  size="medium"
                  type="date"
                  name="birthDate"
                  defaultValue={user.date_birth}
                  onChange={handleChange("birthDate")}
              />
              <TextField
                  className={classes.textField}
                  variant="outlined"
                  color="secondary"
                  label="Phone Number"
                  placeholder="08xxxxxxxxxx"
                  size="medium"
                  name="phoneNumber"
                  defaultValue={user.phone}
                  onChange={handleChange("phoneNumber")}
              />
              <TextField
                  className={classes.textField}
                  variant="outlined"
                  color="secondary"
                  label="Address"
                  placeholder="Jl. Tidar No. 123, Malang"
                  size="medium"
                  name="address"
                  defaultValue={user.address}
                  onChange={handleChange("address")}
              />
              <TextField
                  className={classes.textField}
                  variant="outlined"
                  color="secondary"
                  label="Education"
                  placeholder="S1 Teknik Informatika"
                  size="medium"
                  name="background_education"
                  defaultValue={user.background_education}
                  onChange={handleChange("background_education")}
              />
              <TextField
                  className={classes.textField}
                  variant="outlined"
                  color="secondary"
                  label="GitHub"
                  placeholder="github.com/johndoe"
                  size="medium"
                  name="github"
                  defaultValue={user.github}
                  onChange={handleChange("github")}
              />
              <TextField
                  className={classes.textField}
                  variant="outlined"
                  color="secondary"
                  label="About Me"
                  size="medium"
                  multiline
                  rows={3}
                  rowsMax={4}
                  name="about"
                  defaultValue={user.description}
                  onChange={handleChange("about")}
              />
            </form>
            <Button
                className={classes.buttonProfile}
                variant="contained"
                color="primary"
                onClick={postEditProfile}
            >
              Save Changes
            </Button>
          </Grid>
          <Grid item xs={1} md={2}/>
        </Grid>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
        >
          <Alert onClose={handleClose} severity="success">
            Your profile was successfully updated!
          </Alert>
        </Snackbar>
      </div>
  );
};

export default FormProfile;
