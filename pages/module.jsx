import React from "react";
import Head from "next/head";
import ModuleList from "../components/ModuleList";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import SubFooter from "../components/SubFooter";

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
  margin: {
    margin: theme.spacing(4, 0),
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
        <div className={classes.margin}>
          <SubFooter />
        </div>
        <Footer />
      </main>
    </React.Fragment>
  );
}
