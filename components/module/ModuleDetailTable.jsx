import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  markList: {
    fontSize: "medium",
    color: theme.palette.secondary.main,
    marginRight: '20px'
  },
}));

const ModuleDetail = ({subject}) => {
  const classes = useStyles();
  return (
    <ListItem>
      <Grid container direction="row" justify="flex-start">
        <Grid item xs={1} align="right">
          <FiberManualRecordIcon className={classes.markList} />
        </Grid>
        <br/>
        {subject ?
        <Grid item xs={11} align="justify">
          {subject.name}
        </Grid> : null }
      </Grid>
    </ListItem>
  );
};

export default ModuleDetail;
