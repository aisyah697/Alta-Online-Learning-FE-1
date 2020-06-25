import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

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
    color: theme.palette.secondary.secondary,
  },
  media: {
    height: theme.spacing(30),
  },
  link: {
    color: theme.palette.primary.secondary,
  },
  p: {
    color: theme.palette.secondary.secondary,
  },
}));

export default function SubjectContent(props) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Toolbar />
      <h1 className={classes.title}>Algorithm Live Code</h1>
      <Typography paragraph className={classes.p}>
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
      <Typography paragraph className={classes.p}>
        Go to HackerRank link below:{" "}
        <Typography className={classes.link}>
          https://hackerrank.com/algorithm/alta_livecode
        </Typography>
      </Typography>
    </main>
  );
}
