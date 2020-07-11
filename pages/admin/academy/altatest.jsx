import React, { useContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import ErrorPage from "next/error";
import dynamic from "next/dynamic";
import Head from "next/head";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

const NavigationAdminBar = dynamic(() => import("../../../components/admin/NavigationBarAdmin"));
const AltaTestFilter = dynamic(() => import('../../../components/admin/AltaTestFilter'))
const AltaTest = dynamic(() => import("../../../components/admin/AltaTest"));
const SideBarr = dynamic(() => import("../../../components/admin/SideBarr"));
const Footer = dynamic(() => import("../../../components/FooterBar"));

import AdminContext from "../../../store/adminContext";

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: "#F4F7FC",
  },
  root: {
    display: "flex",
    margin: theme.spacing(2, 0, 2, 0),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
    ...theme.mixins.toolbar,
  },
  content: {
    minHeight: `calc(100vh - 147px)`,
    padding: theme.spacing(3),
    backgroundColor: "#F4F7FC",
    flexGrow: 1
  },
  titleInPage: {
    color: theme.palette.secondary.secondary,
    margin: theme.spacing(2, 0, 2, 0),
    ontFamily: "Muli, sans-serif",
    fontSize: `calc(1em + 1.2vw)`,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    position: "relative",
    marginTop: theme.spacing(20)
  },
}));

export default function Module() {
  const classes = useStyles();
  const [open] = React.useState(false);

  const [cookies, setCookie] = useCookies()
  const {admin_, load_, token_, trigger_} = useContext(AdminContext);
  const [admin, setAdmin] = admin_
  const [load, setLoad] = load_
  const [trigger] = trigger_
  const [token, setToken] = token_

  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('')

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/questionaltatest'
    const auth = cookies.token_admin
    const fetchData = async function() {
      try {
        setLoading(true);
        const response = await axios.get(url,{
          headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + auth
          },
        });
        if (response.status === 200) {
          setQuestion(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
        setLoad(false)
      }
    };
    fetchData();
  }, [load, trigger]);

  return (
      <React.Fragment>
        <Head>
          <title>Alta Test Academy | Admin</title>
        </Head>
        <div className={classes.page}>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar}>
              <NavigationAdminBar />
            </AppBar>
            <SideBarr />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Typography className={classes.titleInPage}>
                Alterra Academy Test
              </Typography>
              <div>
                <AltaTestFilter questions={question} />
                <AltaTest questions={question}/>
              </div>
            </main>
          </div>
          <div className={classes.footer}>
            <Footer />
          </div>
        </div>
      </React.Fragment>
  );
}
