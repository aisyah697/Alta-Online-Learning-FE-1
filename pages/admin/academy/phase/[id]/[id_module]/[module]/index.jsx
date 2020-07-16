import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import dynamic from "next/dynamic";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

const Footer = dynamic(() =>
  import("../../../../../../../components/FooterBar")
);
const NavigationAdminBar = dynamic(() =>
  import("../../../../../../../components/admin/NavigationBarAdmin")
);
const AllSubject = dynamic(() =>
  import("../../../../../../../components/admin/AllSubject")
);
const SideBarr = dynamic(() =>
  import("../../../../../../../components/admin/SideBarr")
);

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
    minHeight: `calc(100vh - 145px)`,
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
    marginTop: theme.spacing(20),
  },
}));

export default function Index() {
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
              {module ? `Subject In ${module.split("-").join(" ")}` : null}
            </Typography>
            <div>
              <AllSubject />
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
