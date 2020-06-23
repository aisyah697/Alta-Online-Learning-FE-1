import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";

const AvailableSubjects = dynamic(() => import('../../../../../components/module/AvailableSubject'))
const ModuleOverview = dynamic(() => import('../../../../../components/module/ModuleOverview'))
const NavigationBar = dynamic(() => import('../../../../../components/NavigationBar'))
const FooterBar = dynamic(() => import('../../../../../components/FooterBar'))


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
            <FooterBar />
        </React.Fragment>
    );
}