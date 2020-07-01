import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import dynamic from "next/dynamic";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Link from "next/link";

const NavigationAdminBar = dynamic(() =>  import("../../../components/admin/NavigationBarAdmin"));
const AddModule = dynamic(() => import("../../../components/admin/AddModule"));
const Footer = dynamic(() => import("../../../components/FooterBar"));
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
  footer: {
    position: "relative",
  },
  card: {
    minWidth: 250,
    margin: theme.spacing(4),
    borderRadius: theme.spacing(2),
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid",
    borderWidth: "5px",
    "&:hover": {
      borderColor: theme.palette.secondary.secondary,
    },
  },
  cardMenu: {
    background: "#F4F7FC",
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
  media: {
    height: 340,
  },
  button: {
    width: "180px",
    textTransform: "none",
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "7px 20px",
    borderRadius: theme.spacing(10),
    minWidth: theme.spacing(12),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  monitoring: {
    textAlign: "center",
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(2em + 0.5vw)`,
    color: theme.palette.secondary.secondary,
    fontWeight: 600,
    paddingTop: theme.spacing(4),
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
                      <Link href={'/admin/academy/phase/[id]'} as={'/admin/academy/phase/1'}>
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
                      <Link href={'/admin/academy/phase/[id]'} as={'/admin/academy/phase/2'}>
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
