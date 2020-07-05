import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    // paddingLeft: theme.spacing.unit * 4
  },
  pastList: {},
  grow: {
    flexGrow: 1,
  },
});

class NestedList extends React.Component {
  state = { open: {} };

  handleClick = (key) => () => {
    console.log(key);
    this.setState({ [key]: !this.state[key] });
  };

  render() {
    const { lists, module, classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {module.map(({ key, module, subject }) => {
            {
              console.log("subjeccttt", subject);
            }
            const open = this.state[key] || false;
            return (
              <div className={classes.pastList} key={key}>
                <hr />
                <List onClick={this.handleClick(key)}>
                  <Grid container onClick={this.handleClick(key)}>
                    <Grid container xs={5}>
                      <Grid xs={1}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </Grid>
                      <Typography>{module.name}</Typography>
                    </Grid>
                    <Grid xs={2}>
                      <Typography>{subject.length} Subject</Typography>
                    </Grid>
                    <Grid xs={5}>
                      <Typography>Feedback Form</Typography>
                    </Grid>
                  </Grid>
                </List>
                <hr />
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subject.map(
                      (
                        { name: name, label: childLabel, quesioner: quesioner },
                        idx
                      ) => (
                        <ListItem key={name} className={classes.nested}>
                          <Grid container>
                            <Grid xs={4}>
                              <Typography>{name}</Typography>
                            </Grid>
                            <Grid xs={1}>
                              <Typography align="right">{idx + 1}</Typography>
                            </Grid>
                            <Grid xs={1}></Grid>
                            <Grid xs={5}>
                              <a href={quesioner}>
                                <ListItemText inset primary={quesioner} />
                              </a>
                            </Grid>
                          </Grid>
                        </ListItem>
                      )
                    )}
                  </List>
                </Collapse>
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
