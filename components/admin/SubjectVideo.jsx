import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import dynamic from "next/dynamic";
import React, { Component } from "react";
import ReactPlayer from "react-player";
import Grid from "@material-ui/core/Grid";

const DeleteSubject = dynamic(() => import("./DeleteSubject"));
const EditSubject = dynamic(() => import("./EditSubject"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    marginBottom: theme.spacing(5),
    alignItems: "center",
  },
  videoPlace: {
    backgroundColor: "black",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2, 0),
  },
  title: {
    textAlign: "center",
  },
  media: {
    height: theme.spacing(30),
  },
  title: {
    fontSize: `calc(0.6em + 1.2vw)`,
    marginTop: theme.spacing(-4),
    color: theme.palette.secondary.secondary,
    fontWeight: "bold",
  },
}));

const SubjectVideo = (props) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Card className={classes.root}>
        <Grid
          className={classes.videoPlace}
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <ReactPlayer
            playing={false}
            width={800}
            height={400}
            config={{
              file: {
                attributes: {
                  onContextMenu: (e) => e.preventDefault(),
                },
              },
            }}
            controls={true}
            url={props.video}
          />
        </Grid>
      </Card>
      <Typography className={classes.title} variant="h6">
        Title: {props.name}
      </Typography>
    </main>
  );
};

export default SubjectVideo;
