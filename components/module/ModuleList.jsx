import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Link = dynamic(() => import('../../utils/link'))

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  divider: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(-3),
    width: `calc(0.01em + 0.3vw)`,
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
  },
  modulePicture: {
    width: `calc(10vh + 10vw)`,
    height: `calc(10vh + 10vw)`,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
    },
  },
  textInPage: {
    marginTop: theme.spacing(-1),
    marginLeft: theme.spacing(2),
  },
  judulModule: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.8vw)`,
    color: theme.palette.secondary.secondary,
  },
  intro: {
    fontFamily: "Muli, sans-serif",
    color: "gray",
    fontStyle: "italic",
    fontSize: `calc(0.7em + 0.4vw)`,
    marginBottom: theme.spacing(1),
  },
  describe: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.4vw)`,
  },
  betweenModule: {
    marginBottom: theme.spacing(7),
  },
}));

const data = {name: '01-Module-Python'};

const ModuleList = () => {
  const classes = useStyle();
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <div className={classes.root}>
        <Grid container className={classes.betweenModule}>
          <Grid
            item
            sm={3}
            xs={12}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Link href={'/courses/phase/[id]/[module]'} as={`/courses/phase/${id}/${data.name}`}>
              <img
                className={classes.modulePicture}
                src="/images/dummy.png"
                alt="module-pict"
              />
            </Link>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <Grid className={classes.textInPage} item sm={8} xs={12}>
            <Link href={'/courses/phase/[id]/[module]'} as={`/courses/phase/${id}/${data.name}`}>
              <Typography className={classes.judulModule}>
                <strong>Module 01: </strong>Module 1
              </Typography>
            </Link>
            <Typography className={classes.intro}>Introduction</Typography>
            <Typography className={classes.describe}>
              Get started learning Python with DataCamp's free Intro to Python
              tutorial. Learn Data Science by completing interactive coding
              challenges and watching videos by expert instructors. Start Now!
              Get started learning Python with DataCamp's free Intro to Python
              tutorial. Learn Data Science by completing interactive coding
              challenges and watching videos by expert instructors. Start Now!
              Get started learning Python with DataCamp's free Intro to Python
              tutorial. Learn Data Science by completing interactive coding
              challenges and watching videos by expert instructors. Start Now!
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ModuleList;