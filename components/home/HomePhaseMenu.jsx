import React from "react";
import Link from "next/link";

// import style
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
    fontFamily: "Muli, sans-serif",
  },
  phaseTitle: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: theme.spacing(5),
    fontFamily: "Muli, sans-serif",
  },
  card: {
    maxWidth: 320,
    margin: theme.spacing(3),
  },
  title: {
    textAlign: "center",
    fontSize: "calc(1rem + 0.5vw)",
    padding: theme.spacing(1),
    fontFamily: "Muli, sans-serif",
    fontWeight: "bold",
    color: theme.palette.secondary.secondary,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "5px 20px",
    textTransform: "none",
    borderRadius: theme.spacing(1),
    minWidth: theme.spacing(12),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
  button2: {
    backgroundColor: theme.palette.secondary.secondary,
    borderColor: theme.palette.secondary.secondary,
    color: theme.palette.common.white,
    padding: "5px 20px",
    textTransform: "none",
    borderRadius: theme.spacing(1),
    minWidth: theme.spacing(12),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  content: {
    // backgroundColor: '#b5d5d5',
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      minHeight: 400,
    },
    backgroundImage: "url(/images/ornament_batik.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "80%",
  },
  content2: {
    backgroundColor: "#DFE6ED",
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      minHeight: 400,
    },
  },
  phaseFont: {
    fontSize: "calc(2em + 0.5vw)",
    color: theme.palette.secondary.secondary,
    fontWeight: 600,
  },

}));

// eslint-disable-next-line react/prop-types
const CustomCard = ({ phase, lock, style }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography className={classes.title}>
        {" "}
        Phase
        {phase}
      </Typography>
      <CardContent className={classes.content}>
        {lock
          ? <PlayCircleFilledWhiteIcon style={{ fontSize: "40px" }} />
          : <LockIcon />}
      </CardContent>
      <CardActions className={classes.action}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {phase === 3
          ? (
            <Button
              disabled={!lock}
              size="small"
              variant="outlined"
              className={style}
              startIcon={<LockIcon />}
              style={{ backgroundColor: "#788896", color: "#fff", borderColor: "#788896" }}
            >
              Offline Class
            </Button>
          )
          : (lock
            ? (
              <Link href="/courses/phase/[id]" as={`/courses/phase/${phase}`}>
                <Button
                  disabled={!lock}
                  size="small"
                  variant="outlined"
                  className={style}
                  startIcon={<PlayCircleOutlineIcon />}
                >
                  Start
                </Button>
              </Link>
            )
            : (
              <Button
                disabled={!lock}
                size="small"
                variant="outlined"
                className={style}
                startIcon={<LockIcon />}
                style={{ backgroundColor: "#788896", color: "#fff" }}
              >
                Start
              </Button>
            )
          )}
      </CardActions>
    </Card>
  );
};

// eslint-disable-next-line react/prop-types
const HomePhaseMenu = ({ phase }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.phaseTitle}>
        <Typography className={classes.phaseFont}> Track Your Progress </Typography>
      </div>
      <Grid container className={classes.root}>
        {phase
        // eslint-disable-next-line react/prop-types
          ? (phase.map((items, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={index} item xs={12} lg={3}>
              <CustomCard
                classes={classes}
                phase={index + 1}
                lock={items.lock_key}
                disabled={false}
                style={classes.button}
              />
            </Grid>
          ))) : <Typography> Loading... </Typography>}
      </Grid>
    </div>
  );
};

export default HomePhaseMenu;
