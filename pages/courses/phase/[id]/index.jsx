import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "next/link";
import {useRouter} from "next/router";

// import style
const ModuleList = dynamic(() => import("../../../../components/module/ModuleList"));
const NavigationBar = dynamic(() => import("../../../../components/NavigationBar"));
const SubFooter = dynamic(() => import("../../../../components/SubFooter"));
const Footer = dynamic(() => import("../../../../components/FooterBar"));

const useStyles = makeStyles((theme) => ({
  bodyContent: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    backgroundColor: "#F4F7FC",
    [theme.breakpoints.up("md")]: {
      backgroundImage: "url(/images/ornament_batik.png), url(/images/ornament_batik.png)",
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundPosition: "left top, right bottom ",
      backgroundSize: "18vw, 18vw",
    },
    minHeight: `calc(40vh)`
  },
  titlePage: {
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
  breadcrumb: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginLeft: theme.spacing(8)
  },
  link: {
    textDecoration: 'none',
    "&:link": {
      textDecoration: 'none',
    },
    cursor: 'pointer'
  }
}));

const Module = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>Module | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <div className={classes.bodyContent}>
          <div className={classes.breadcrumb}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link color="inherit" href="/">
                <Typography className={classes.link}>Home</Typography>
              </Link>
              <Typography color="textPrimary">Phase {id}</Typography>
            </Breadcrumbs>
          </div>
          <Typography className={classes.titlePage}>
            Alta Learn Module
          </Typography>
          <ModuleList />
        </div>
        <div className={classes.margin}>
          <SubFooter />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Module;
