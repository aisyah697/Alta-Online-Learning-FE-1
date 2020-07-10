import React from "react";
import Head from "next/head";
import { useContext } from "react";
import Router from "next/router";
import ErrorPage from "next/error";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";

const NavigationAdminBar = dynamic(() =>
  import("../../../../../../components/admin/NavigationBarAdmin")
);
const CourseHistory = dynamic(() =>
  import("../../../../../../components/mentee/CourseHistory")
);
const FooterBar = dynamic(() =>
  import("../../../../../../components/FooterBar")
);

import AdminContext from "../../../../../../store/adminContext";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(3, 8, 20, 8),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2.5, 2),
      fontSize: "14px",
    },
  },
}));

export default function IndexPage() {
  const classes = useStyles();
  const { login_ } = useContext(AdminContext);
  const [login, setLogin] = login_;

  if (!login) {
    return <ErrorPage statusCode={404} />;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>Mentee History | Alta Online Learning</title>
        </Head>
        <NavigationAdminBar />
        <main className={classes.main}>
          <CourseHistory />
        </main>
        <FooterBar />
      </React.Fragment>
    );
  }
}
