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
    paddingLeft: 0,
    paddingRight: theme.spacing(5),
    paddingTop: 0,
  },
  title: {
    textAlign: "center",
  },
  media: {
    height: theme.spacing(30),
  },
}));

const SubjectContent = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Toolbar />
      <h1 className={classes.title}>Algorithm</h1>
      <h2>Introduction</h2>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Video Part 1: Dasar-dasar algoritma
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              PPT Part 1: Algoritma dalam pemrograman
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </main>
  );
}

export default SubjectContent;