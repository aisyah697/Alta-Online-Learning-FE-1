import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  judulModule: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(1.1em + 1.5vw)`,
    textAlign: "left",
    fontWeight: "bold",
    color: theme.palette.secondary.secondary,
  },
  mentorName: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.8em + 0.5vw)`,
    textAlign: "left",
    fontWeight: "bold",
    color: theme.palette.secondary.secondary,
  },
  keteranganModule: {
    fontFamily: "Muli, sans-serif",
    color: "gray",
    fontSize: `calc(0.7em + 0.4vw)`,
    marginBottom: theme.spacing(5),
  },
  leftContent: {
    backgroundColor: "#F4F7FC",
    padding: theme.spacing(5, 2),
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#F4F7FC",
    },
  },
  button: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "7px 15%",
    [theme.breakpoints.down("sm")]: {
      padding: "7px 19%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "4px 10%",
    },
    textTransform: "none",
    borderRadius: theme.spacing(10),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
  avatar: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
    },
  },
  mentorDescribe: {
    textAlign: "justify",
    fontFamily: "Muli, sans-serif",
    color: theme.palette.secondary.secondary,
    fontSize: `calc(0.6em + 0.4vw)`,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  github: {
    fontFamily: "Muli, sans-serif",
    color: theme.palette.secondary.secondary,
    fontSize: `calc(0.7em + 0.4vw)`,
    marginLeft: theme.spacing(1),
  },
  giticon: {
    color: theme.palette.secondary.secondary,
    fontSize: `calc(1.5em + 0.4vw)`,
  },
}));
export default function ModuleDetail() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>Detail Module | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <div className={classes.root}>
          <Grid container>
            <Grid
              item
              md={4}
              className={classes.leftContent}
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Typography className={classes.judulModule}>
                Module 01: Python
              </Typography>
              <Typography className={classes.keteranganModule}>
                Learn fundamental of Python
              </Typography>
              <Button
                variant="outlined"
                size="medium"
                className={classes.button}
              >
                Register Now
              </Button>
              <img
                alt="mentor-avatar"
                className={classes.avatar}
                src="/images/dummy.jpg"
              />
              <Typography className={classes.mentorName}>
                Mentor: Kobar Septyanus
              </Typography>
              <Typography className={classes.mentorDescribe}>
                Kobar formerly was the VP of Education at python. In this
                capacity, he managed the python University and python
                Documentation teams.Shannon holds a Ph.D. in Computer Science
                from Northwestern University. Prior to joining python, Kobar was
                an Associate Professor of Computer Science at Drew University
                and a consultant to firms in the financial and media industries
                on a variety of information and data management projects.{" "}
              </Typography>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <GitHubIcon className={classes.giticon} />
                <Typography className={classes.github}>
                  github.com/kobars
                </Typography>
              </Grid>
            </Grid>
            <Grid></Grid>
          </Grid>
        </div>

        <Footer />
      </main>
    </React.Fragment>
  );
}
