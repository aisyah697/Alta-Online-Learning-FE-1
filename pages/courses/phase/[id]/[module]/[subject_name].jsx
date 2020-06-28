import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../../../../../components/NavigationBar";
import {makeStyles} from "@material-ui/core/styles";
const SubjectDrawer = dynamic(() => import('../../../../../components/subject/SubjectDrawer'))
const SubjectContent = dynamic(() => import('../../../../../components/subject/SubjectContent'))

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        margin: "30px 24px",
    },
}));

const Subject = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Head>
                <title>Subject | Alta Online Learning</title>
            </Head>
            <div className={classes.root}>
                <CssBaseline />
                <NavigationBar className={classes.appBar} />
                <SubjectDrawer />
                <SubjectContent />
            </div>
        </React.Fragment>
    );
}

export default Subject;