import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";

import CardActionArea from "@material-ui/core/CardActionArea";
import CssBaseline from "@material-ui/core/CssBaseline";
import CardActions from "@material-ui/core/CardActions";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

const NavigationAdminBar = dynamic(() =>
  import("../../../components/admin/NavigationBarAdmin")
);
const AddModule = dynamic(() => import("../../../components/admin/AddModule"));
const SideBarr = dynamic(() => import("../../../components/admin/SideBarr"));
const Footer = dynamic(() => import("../../../components/FooterBar"));

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
    minHeight: `calc(100vh - 155px)`,
    flexGrow: 1,
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
  },
  card: {
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(4),
    borderStyle: "solid",
    borderWidth: "5px",
    minWidth: 250,
    "&:hover": {
      borderColor: theme.palette.secondary.secondary,
    },
  },
  cardMenu: {
    paddingBottom: theme.spacing(5),
    marginTop: theme.spacing(2),
    background: "#F4F7FC",
  },
  media: {
    height: 340,
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    borderRadius: theme.spacing(10),
    minWidth: theme.spacing(12),
    textTransform: "none",
    background: "#3364ff",
    padding: "7px 20px",
    width: "180px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
  monitoring: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    paddingTop: theme.spacing(4),
    fontSize: `calc(2em + 0.5vw)`,
    fontWeight: 600,
    textAlign: "center",
  },
}));

export default function Academy() {
  const classes = useStyles();

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
            <div className={classes.cardMenu}>
              <Typography className={classes.monitoring}>Academy</Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/images/mentee_pict.jpg"
                      title="Phase 1"
                    />
                  </CardActionArea>
                  <CardActions>
                    <Grid container justify="center">
                      <Link
                        href={"/admin/academy/phase/[id]"}
                        as={"/admin/academy/phase/1"}
                      >
                        <Button
                          variant="outlined"
                          size="medium"
                          className={classes.button}
                          startIcon={<ScheduleIcon />}
                        >
                          Phase 1
                        </Button>
                      </Link>
                    </Grid>
                  </CardActions>
                </Card>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/images/module_ilustrations.jpg"
                      title="Phase 2"
                    />
                  </CardActionArea>
                  <CardActions>
                    <Grid container justify="center">
                      <Link
                        href={"/admin/academy/phase/[id]"}
                        as={"/admin/academy/phase/2"}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          size="medium"
                          className={classes.button}
                          startIcon={<ScheduleIcon />}
                        >
                          Phase 2
                        </Button>
                      </Link>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
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
