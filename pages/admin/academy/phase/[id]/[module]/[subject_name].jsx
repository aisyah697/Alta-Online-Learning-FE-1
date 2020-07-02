import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { useCookies } from "react-cookie";
import Grid from "@material-ui/core/Grid";

const NavigationAdminBar = dynamic(() => import("../../../../../../components/admin/NavigationBarAdmin"));
const DeleteSubject = dynamic(() => import("../../../../../../components/admin/DeleteSubject"));
const EditSubject = dynamic(() => import("../../../../../../components/admin/EditSubject"));
const SubjectAdmin = dynamic(() => import("../../../../../../components/admin/Subject"));
const SideBarr = dynamic(() => import("../../../../../../components/admin/SideBarr"));
const Loading = dynamic(() => import("../../../../../../components/Loading"));
const Footer = dynamic(() => import("../../../../../../components/FooterBar"));

import AdminContext from "../../../../../../store/adminContext";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#F4F7FC",
  },
  titleInPage: {
    textAlign: "center",
    color: theme.palette.secondary.secondary,
    ontFamily: "Muli, sans-serif",
    fontSize: `calc(1em + 1.2vw)`,
    fontWeight: "bold",
    margin: theme.spacing(2, 0, 2, 0),
  },
  footer: {
    position: "relative",
  },
}));

export default function Subject() {
  const classes = useStyles();
  const [open] = React.useState(false);
  const [subject, setsubject] = React.useState();
  const [loading, setLoading] = React.useState();
  const [cookies] = useCookies();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;

  useEffect(() => {
    const urlsubject = process.env.NEXT_PUBLIC_BASE_URL + "/subject/nested/6";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(urlsubject, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin.token,
          },
        });
        if (response.status === 200) {
          setsubject(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [load]);

  if (!subject) {
    return <Loading />;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>Admin | Academy</title>
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
                {subject.name}
              </Typography>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <EditSubject subject={subject} />
                <DeleteSubject ID={subject.id} />
              </Grid>
              <div>
                <SubjectAdmin props={subject} />
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
}
