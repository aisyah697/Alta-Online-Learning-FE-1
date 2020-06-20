import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    bodyContent: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        backgroundColor: "#F4F7FC",
    },
}))

export default function CoursePage() {
    const classes = useStyles();
    return(
        <React.Fragment>
            <Head>
                <title>Module | Alta Online Learning</title>
            </Head>
            <main>
                <NavigationBar/>
                <div className={classes.bodyContent}>
                    aaaa
                </div>
                <Footer />
            </main>
        </React.Fragment>
    )

}