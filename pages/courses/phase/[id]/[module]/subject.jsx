import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../../../../../components/NavigationBar";
import Footer from "../../../../../components/FooterBar";
import ModuleOverview from "../../../../../components/module/ModuleOverview";
import AvailableSubjects from "../../../../../components/module/AvailableSubject";

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(3, 8),
        marginBottom: theme.spacing(20),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2.5, 2),
            fontSize: "14px",
        },
    },
    h1: {
        color: theme.palette.secondary.secondary,
        marginTop: theme.spacing(4),
    },
}));

export default function ModuleDetailOverview() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Head>
                <title>Module Overview | Alta Online Learning</title>
            </Head>
            <NavigationBar />
            <main className={classes.main}>
                <h1 className={classes.h1}>Course Overview</h1>
                <ModuleOverview />
                <h1 className={classes.h1}>Available Subjects</h1>
                <AvailableSubjects />
            </main>
            <Footer />
        </React.Fragment>
    );
}