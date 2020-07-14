import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// import style
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// import component
const NavigationBar = dynamic(() => import('../components/NavigationBar'));
const AltaTestQuestion = dynamic(() => import('../components/altatest/AltaTestQuestion'));
const Footer = dynamic(() => import('../components/FooterBar'));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "0 30px",
    minHeight: `calc(100vh - 179px)`,
      [theme.breakpoints.down("sm")]: {
          minHeight: `calc(100vh)`,
      },
  },
    footer: {
      marginTop: theme.spacing(20)
    }
}));

export default function AltaTest() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>Exam | Alta Online Learning</title>
      </Head>
      <CssBaseline />
      <NavigationBar className={classes.appBar} />
      <main className={classes.root}>
        <AltaTestQuestion />
      </main>
      <Footer className={classes.footer} />
    </React.Fragment>
  );
}
