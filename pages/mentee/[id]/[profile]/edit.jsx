import React, { useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { makeStyles } from "@material-ui/core/styles";

// import style
const FooterBar = dynamic(() => import('../../../../components/FooterBar'));
const NavigationBar = dynamic(() => import('../../../../components/NavigationBar'));
const FormEditProfile = dynamic(() => import('../../../../components/mentee/EditProfile'));

import UserContext from "../../../../store/userContext";

const useStyles = makeStyles((theme) => ({
  main: {
      margin: theme.spacing(3, 8),
      [theme.breakpoints.down("xs")]: {
          margin: theme.spacing(2.5, 2),
          fontSize: "14px",
      },
      minHeight: `calc(100vh - 227px)`
  },
    footer: {
      marginTop: theme.spacing(20)
    }
}));

export default function EditProfileMentee() {
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
          <FormEditProfile />
        </main>
        <FooterBar/>
      </React.Fragment>
    );
  }
}
