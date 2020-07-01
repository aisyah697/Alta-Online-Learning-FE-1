import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    marginBottom: theme.spacing(5),
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
}));

const SubjectPPT = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Card className={classes.root} elevation={0}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              PPT Part 1: Dasar-dasar algoritma
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </main>
  );
};

export default SubjectPPT;
