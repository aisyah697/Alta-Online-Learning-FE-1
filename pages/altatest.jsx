import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../components/NavigationBar";
import AltaTestQuestion from "../components/AltaTestQuestion";
import Footer from "../components/FooterBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "30px 24px",
  },
}));

export default function AltaTest() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>Exam | Alta Online Learning</title>
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <NavigationBar className={classes.appBar} />
        <AltaTestQuestion />
      </div>
      <Footer />
    </React.Fragment>
  );
}
