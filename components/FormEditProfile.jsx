import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto, sans-serif",
  },
  main: {
    margin: "30px 24px",
  },
  viewProfile: {
    margin: "auto",
    textAlign: "right",
  },
  buttonProfile: {
    backgroundColor: "#f4752e",
    color: "#ffffff",
    boxShadow: "none",
    cursor: "pointer",
    border: "1px solid #F47522",
    WebkitBorderRadius: "20px",
    padding: "10px 30px",
    transition: "all 0.5s ease",
    textTransform: "capitalize",
    letterSpacing: ".02em",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#ffffff",
      boxShadow: "none",
      border: "1px solid #F47522",
      color: "#F47522",
    },
  },
  h1: {
    color: "#19345E",
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  form: {
    marginTop: "30px",
  },
  textField: {
    width: "80ch",
    marginBottom: "18px",
    "&:hover": {
      borderColor: "#F47522 !important",
    },
  },
}));

export default function FormProfile(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <main className={classes.main}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1 className={classes.h1}>Edit Profile</h1>
          </Grid>
          <Grid item xs={6} className={classes.viewProfile}>
            <Button
              className={classes.buttonProfile}
              variant="contained"
              color="primary"
            >
              View Profile
            </Button>
          </Grid>
        </Grid>
        <div className={classes.avatar}>
          <Avatar
            alt="Profile Picture"
            src="/static/images/avatar/1.jpg"
            className={classes.large}
          />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={2} />
          <Grid item xs={8} style={{ textAlign: "center" }}>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                label="Full Name"
                size="medium"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                label="Email"
                size="medium"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                label="Birth Place"
                size="medium"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                label="Birth Date"
                placeholder="DD/MM/YYYY"
                size="medium"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                label="Phone Number"
                placeholder="08xxxxxxxxxx"
                size="medium"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                label="GitHub"
                placeholder="github.com/johndoe"
                size="medium"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                label="About Me"
                size="medium"
                variant="outlined"
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
          <Grid item xs={2} />
        </Grid>
      </main>
    </React.Fragment>
  );
}
