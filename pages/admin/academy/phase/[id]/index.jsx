import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

const NavigationAdminBar = dynamic(() =>
  import("../../../../../components/admin/NavigationBarAdmin")
);
const AddModule = dynamic(() =>
  import("../../../../../components/admin/AddModule")
);
const ModuleAdmin = dynamic(() =>
  import("../../../../../components/admin/Module")
);
const SideBarr = dynamic(() =>
  import("../../../../../components/admin/SideBarr")
);
const Footer = dynamic(() => import("../../../../../components/FooterBar"));

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
    padding: theme.spacing(3),
    backgroundColor: "#F4F7FC",
    minHeight: `calc(100vh - 147px)`,
    flexGrow: 1,
  },
  titleInPage: {
    color: theme.palette.secondary.secondary,
    margin: theme.spacing(2, 0, 2, 0),
    ontFamily: "Muli, sans-serif",
    fontSize: `calc(1em + 1.2vw)`,
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    position: "relative",
    marginTop: theme.spacing(20),
  },
}));

export default function Module() {
  const classes = useStyles();
  const router = useRouter();
  const { id, id_module, module, id_subject } = router.query;
  const [open] = React.useState(false);

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
              Module In Phase {id}
            </Typography>
            <AddModule />
            <div>
              <ModuleAdmin />
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
