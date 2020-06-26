import React from "react";
import Head from "next/head";
import NavigationBar from "../../../components/NavigationBar";
import FooterBar from "../../../components/FooterBar";
import FormEditProfile from "../../../components/mentee/EditProfile";
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

export default function EditProfileMentee() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Head>
                <title>Profile | Alta Online Learning</title>
            </Head>
            <NavigationBar />
            <main className={classes.main}>
                <FormEditProfile />
            </main>
            <FooterBar />
        </React.Fragment>
    );
}
