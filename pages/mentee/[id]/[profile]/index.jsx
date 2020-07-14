import React from "react";
import Head from "next/head";
import { useContext } from "react";
import ErrorPage from "next/error";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";

// import component
const ProfileMentee = dynamic(() => import("../../../../components/mentee/ProfileMentee"));
const CourseHistory = dynamic(() => import("../../../../components/mentee/CourseHistory"));
const NavigationBar = dynamic(() => import("../../../../components/NavigationBar"));
const FooterBar = dynamic(() => import("../../../../components/FooterBar"));

import UserContext from "../../../../store/userContext";

const useStyles = makeStyles((theme) => ({
  main: {
      margin: theme.spacing(3, 8, 15, 8),
      [theme.breakpoints.down("xs")]: {
          margin: theme.spacing(2.5, 2),
          fontSize: "14px",
      },
      minHeight: `calc(100vh - 179px)`
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const { login_ } = useContext(UserContext);
  const [login] = login_;

  if (!login) {
    return <ErrorPage statusCode={404} />;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>Profile | Alta Online Learning</title>
        </Head>
        <NavigationBar />
        <main className={classes.main}>
          <ProfileMentee />
          <CourseHistory />
        </main>
        <FooterBar />
      </React.Fragment>
    );
  }
}
