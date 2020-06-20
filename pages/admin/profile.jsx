import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../../components/Footer";
import ProfileAdmin from "../../components/ProfileAdmin";
import NavigationAdminBar from "../../components/admin/NavigationBarAdmin";

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(3, 8),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2.5, 2),
            fontSize: "14px",
        },
    },
}));

export default function ProfileAdminPage() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Head>
                <title>Admin | Profile</title>
            </Head>
            <NavigationAdminBar />
            <main className={classes.main}>
                <ProfileAdmin/>
            </main>
            <Footer />
        </React.Fragment>
    );
}
