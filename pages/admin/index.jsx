import React from "react";
import Head from "next/head";
import FooterBar from "../../components/FooterBar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import Grid from "@material-ui/core/Grid";
import PeopleAltSharpIcon from "@material-ui/icons/PeopleAltSharp";
import GroupWorkSharpIcon from "@material-ui/icons/GroupWorkSharp";
import NavigationBarAdmin from "../../components/admin/NavigationBarAdmin";
import Typography from "@material-ui/core/Typography";
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    margin: theme.spacing(4),
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
    height: 390,
  },
  button: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    padding: "7px 20px",
    textTransform: "none",
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

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBarAdmin />
        <div className={classes.cardMenu}>
          <Typography className={classes.monitoring}>Monitoring</Typography>
          <Grid container direction="row" justify="center" alignItems="center">
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/images/mentee_pict.jpg"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              <CardActions>
                <Grid container justify="center">
                  <Link href={"/admin/manage/mentee"}>
                    <Button
                      variant="outlined"
                      size="medium"
                      className={classes.button}
                      startIcon={<GroupWorkSharpIcon />}
                    >
                      Our Mentee
                    </Button>
                  </Link>
                </Grid>
              </CardActions>
            </Card>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/images/module_ilustrations.jpg"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              <CardActions>
                <Grid container justify="center">
                  <Link href={'/admin/academy'}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="medium"
                      className={classes.button}
                      startIcon={<ViewModuleIcon />}
                    >
                      Academic
                    </Button>
                  </Link>
                </Grid>
              </CardActions>
            </Card>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/images/profile_ilustration.png"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              <CardActions>
                <Grid container justify="center">
                  <Link href={"/admin/manage/admin"}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="medium"
                      className={classes.button}
                      startIcon={<PeopleAltSharpIcon />}
                    >
                      Our Admin
                    </Button>
                  </Link>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </div>
        <FooterBar />
      </main>
    </React.Fragment>
  );
}
