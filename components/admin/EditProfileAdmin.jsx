import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Link from "../../utils/link";

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

export default function FormProfileAdmin(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h1 className={classes.h1}>Edit Profile</h1>
        </Grid>
        <Grid item xs={6} className={classes.viewProfile}>
          <Link href={'/admin/profile'}>
            <Button
              className={classes.buttonProfile}
              variant="contained"
              color="primary"
            >
              View Profile
            </Button>
          </Link>
        </Grid>
      </Grid>
      <div className={classes.avatar}>
        <Avatar
          alt="Profile Picture"
          src="/static/images/avatar/1.jpg"
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
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8} style={{ textAlign: "center" }}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Full Name"
              size="medium"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Email"
              size="medium"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Birth Place"
              size="medium"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Birth Date"
              placeholder="DD/MM/YYYY"
              size="medium"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Phone Number"
              placeholder="08xxxxxxxxxx"
              size="medium"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="GitHub"
              placeholder="github.com/johndoe"
              size="medium"
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
            />
          </form>
          <Button
            className={classes.buttonProfile}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </React.Fragment>
  );
}
