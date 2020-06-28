import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/FooterBar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#F4F7FC",
    "& > *": {
      margin: theme.spacing(5),
      width: theme.spacing(120),
      height: theme.spacing(70),
      backgroundColor: theme.palette.primary.main,
    },
  },
  title: {
    color: theme.palette.secondary.secondary,
    textAlign: "center",
    marginBottom: theme.spacing(7),
  },
  container: {
    padding: theme.spacing(2, 10),
    color: theme.palette.secondary.secondary,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1, 2),
    },
  },
  textField: {
    width: "100%",
    marginBottom: "18px",
    "&:hover": {
      borderColor: "#F47522",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  paragraph: {
    fontWeight: "400",
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
    boxShadow: "none",
    cursor: "pointer",
    border: "1px solid #F47522",
    WebkitBorderRadius: "2em",
    padding: theme.spacing(1, 3),
    transition: "all 0.3s ease",
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
  ornament: {
    height: "35vh",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "25px",
    },
    position: "absolute",
  },
}));

export default function FeedbackModule() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>Module Feedback | Alta Online Learning</title>
      </Head>
      <NavigationBar />
      <div className={classes.root}>
        <Paper elevation={3}>
          <img
            className={classes.ornament}
            src="/images/ornament_batik.png"
            alt="Ornament"
          />
          <div className={classes.container}>
            <h1 className={classes.title}>Feedback Form</h1>
            <Typography variant="h6" paragraph className={classes.paragraph}>
              Module 01: Python
            </Typography>
            <Typography variant="h6" paragraph className={classes.paragraph}>
              How was your experience?
            </Typography>
            <Typography variant="h6" paragraph className={classes.paragraph}>
              Review:
            </Typography>
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              size="medium"
              multiline
              rows={8}
              rowsMax={8}
            />
            <div className={classes.buttonContainer}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </div>
        </Paper>
      </div>
      <Footer />
    </React.Fragment>
  );
}
