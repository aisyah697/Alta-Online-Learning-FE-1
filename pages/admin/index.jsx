import React from "react";
import Head from "next/head";
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

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    margin: theme.spacing(4),
  },
  cardMenu: {
    background: "#F4F7FC",
  },
  media: {
    height: 390,
  },
  button: {
    width: "180px",
    textTransform: "none",
    background: "#3364ff",
    color: "white",
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
        <Grid
          className={classes.cardMenu}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
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
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  startIcon={<GroupWorkSharpIcon />}
                >
                  Our Mentee
                </Button>
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
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  startIcon={<ViewModuleIcon />}
                >
                  Our Module
                </Button>
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
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  startIcon={<PeopleAltSharpIcon />}
                >
                  See Your Profile
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </main>
    </React.Fragment>
  );
}
