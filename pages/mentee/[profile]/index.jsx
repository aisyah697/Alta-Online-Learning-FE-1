import React from "react";
import Head from "next/head";
import { useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "../../../components/NavigationBar";
import FooterBar from "../../../components/FooterBar";
import ProfileMentee from "../../../components/mentee/ProfileMentee";
import CourseHistory from "../../../components/mentee/CourseHistory";
import UserContext from '../../../store/userContext';
import Router from "next/router";
import ErrorPage from 'next/error'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(3, 8),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2.5, 2),
      fontSize: "14px",
    },
  },
}));

export default function Index() {
    const classes = useStyles();
    const {login_} = useContext(UserContext);
    const [login, setLogin] = login_

    if (!login) {
        return <ErrorPage statusCode={404}/>
    } else {
        return (
            <React.Fragment>
                <Head>
                    <title>Profile | Alta Online Learning</title>
                </Head>
                <NavigationBar/>
                <main className={classes.main}>
                    <ProfileMentee/>
                    <CourseHistory/>
                </main>
                <FooterBar/>
            </React.Fragment>
        );
    }
}