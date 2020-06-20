import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto, sans-serif",
    display: "flex",
    maxWidth: "100%",
    marginBottom: theme.spacing(3),
  },
  button: {
    margin: "auto",
  },
  done: {
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 2),
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      WebkitBoxShadow: "none",
    },
  },
  unfinish: {
    backgroundColor: theme.palette.secondary.secondary,
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 2),
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.secondary,
      WebkitBoxShadow: "none",
    },
  },
  locked: {
    backgroundColor: "#BDBDBD",
    color: "black",
    textTransform: "capitalize",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 2),
    WebkitBoxShadow: "none",
    "&:hover": {
      WebkitBoxShadow: "none",
    },
  },
  moduleLocked: {
    color: "#BDBDBD",
  },
}));

export default function AvailableSubject(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <CardContent>
                <Typography
                  className={classes.module}
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  Subject 1: Algorithm
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Introduction to algorithm and solve problem in some cases
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CardContent>
                <Typography
                  className={classes.module}
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  5 of 5
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  subjects completed
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={2} className={classes.button}>
              <Button
                className={classes.done}
                variant="contained"
                color="secondary"
              >
                <DoneAllIcon />
                Done
              </Button>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
      {/* <Card className={classes.root}>
        <CardActionArea>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <CardContent>
                <Typography
                  className={classes.module}
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  Subject 2: Basic Python
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Introduction to python and solve problem in some cases
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CardContent>
                <Typography
                  className={classes.module}
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  2 of 5
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  subjects completed
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={2} className={classes.button}>
              <Button
                className={classes.unfinish}
                variant="contained"
                color="primary"
              >
                <OpenInNewIcon />
                Start
              </Button>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
      <Card className={classes.root}>
        <CardActionArea>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <CardContent className={classes.moduleLocked}>
                <Typography
                  className={classes.module}
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  Subject 3: Advanced Algorithm
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Advanced algorithm and solve problem in some cases
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CardContent className={classes.moduleLocked}>
                <Typography
                  className={classes.module}
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  0 of 5
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  subjects completed
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={2} className={classes.button}>
              <Button
                className={classes.locked}
                variant="contained"
                color="primary"
              >
                <LockIcon />
                Locked
              </Button>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card> */}
    </React.Fragment>
  );
}
