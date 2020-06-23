import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  markList: {
    fontSize: "medium",
    color: theme.palette.secondary.main,
  },
}));

const ModuleDetail = () => {
  const classes = useStyles();
  return (
    <ListItem>
      <Grid container direction="row" justify="flex-start">
        <Grid xs={1} align="right">
          <FiberManualRecordIcon className={classes.markList} />
        </Grid>
        <Grid xs={11} align="justify">
          Welcome to the LearnPython.org interactive Python tutorial. Whether
          you are an experienced programmer or not, this website is intended for
          everyone who wishes to learn the Python programming language.You are
          welcome to join our group on Facebook for questions, discussions and
          updates. Just click on the chapter you wish to begin from, and follow
          the instructions. Good luck!
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default ModuleDetail;