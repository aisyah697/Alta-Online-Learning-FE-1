import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import FooterBar from "../../../../components/FooterBar";
import ProfileAdmin from "../../../../components/admin/ProfileAdmin";
import NavigationAdminBar from "../../../../components/admin/NavigationBarAdmin";

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(3, 8),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2.5, 2),
            fontSize: "14px",
        },
    },
}));

const ProfileAdminPage = () => {
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
            <FooterBar />
        </React.Fragment>
    );
}

export default ProfileAdminPage;