import React from "react";
import Head from "next/head";
import ModuleList from "../components/ModuleList";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  bodyContent: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    backgroundColor: "#F4F7FC",
    [theme.breakpoints.up("md")]: {
      backgroundImage:
        "url(/images/ornament_batik.png), url(/images/ornament_batik.png)",
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundPosition: "left top, right bottom ",
      backgroundSize: "23vw, 18vw",
    },
  },
  judulPage: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(1.1em + 1.5vw)`,
    textAlign: "center",
    fontWeight: "bold",
    color: theme.palette.secondary.secondary,
    marginBottom: theme.spacing(7),
    [theme.breakpoints.up("lg")]: {
      marginBottom: theme.spacing(10),
    },
  },
  access: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(1em + 0.9vw)`,
    textAlign: "center",
    fontWeight: "bold",
    color: theme.palette.secondary.secondary,
    marginBottom: theme.spacing(4),
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "7px 30px",
    textTransform: "none",
    borderRadius: theme.spacing(10),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
  bottomBodyContent: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(9),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(-4),
      paddingTop: theme.spacing(3),
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>Module | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <div className={classes.bodyContent}>
          <Typography className={classes.judulPage}>
            Alta Learn Module
          </Typography>
          <ModuleList />
          <ModuleList />
        </div>
        <div className={classes.bottomBodyContent}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography className={classes.access}>
              You can now access the course!
            </Typography>
            <Button variant="outlined" size="medium" className={classes.button}>
              SignUp
            </Button>
          </Grid>
        </div>
        <Footer />
      </main>
    </React.Fragment>
  );
}
