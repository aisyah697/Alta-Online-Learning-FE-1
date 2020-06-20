import React from "react";
import Head from "next/head";
import Footer from "../../../components/Footer";
import NavigationAdminBar from "../../../components/admin/NavigationBarAdmin";
import FormEditProfileAdmin from "../../../components/FormEditProfileAdmin";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(3, 8),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2.5, 2),
            fontSize: "14px",
        },
    },
}));

export default function EditProfileAdmin() {
    const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>Admin | Edit Profile</title>
      </Head>
      <NavigationAdminBar />
      <main className={classes.main}>
        <FormEditProfileAdmin />
      </main>
      <Footer />
    </React.Fragment>
  );
}
