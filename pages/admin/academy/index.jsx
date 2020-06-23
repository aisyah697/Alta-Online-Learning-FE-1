import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import dynamic from "next/dynamic";
import Typography from "@material-ui/core/Typography";

const Footer = dynamic(() => import("../../../components/Footer"));
const NavigationAdminBar = dynamic(() =>
  import("../../../components/admin/NavigationBarAdmin")
);
const ModuleAdmin = dynamic(() => import("../../../components/admin/Module"));
const SideBarr = dynamic(() => import("../../../components/admin/SideBarr"));

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
  sidebarr: {
    zIndex: -0,
  },
  footer: {
    // marginTop: "0",
    zIndex: 1,
  },
}));

export default function Academy() {
  const classes = useStyles();
  const [open] = React.useState(false);

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Academy</title>
      </Head>
      <body className={classes.page}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar className={classes.appBar}>
            <NavigationAdminBar />
          </AppBar>
          <div className={classes.sidebarr}>
            <SideBarr />
          </div>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography className={classes.titleInPage}>
              Module In Phase 1
            </Typography>
            <ModuleAdmin />
            <ModuleAdmin />
            <ModuleAdmin />
            <ModuleAdmin />
          </main>
        </div>
        <Footer />
      </body>
    </React.Fragment>
  );
}
