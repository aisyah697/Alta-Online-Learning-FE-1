import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../../../../../../../../components/NavigationBar";
import SubjectDrawer from "../../../../../../../../components/subject/SubjectDrawer";
import QuizContent from "../../../../../../../../components/QuizContent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "30px 24px",
  },
}));

export default function Quiz() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>Exam | Alta Online Learning</title>
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <NavigationBar className={classes.appBar} />
        <SubjectDrawer />
        <QuizContent />
      </div>
    </React.Fragment>
  );
}
