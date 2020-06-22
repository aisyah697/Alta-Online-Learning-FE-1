import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const NavigationBar = dynamic(() => import('../components/NavigationBar'))
const SubFooter = dynamic(() => import('../components/SubFooter'))
const ModuleList = dynamic(() => import('../components/module/ModuleList'))
const Footer = dynamic(() => import('../components/FooterBar'))

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
      backgroundSize: "18vw, 18vw",
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

const Module = () => {
  const classes = useStyles();
  return (
    <div>
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
          <ModuleList />
          <ModuleList />
        </div>
        <div className={classes.margin}>
          <SubFooter />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Module;
