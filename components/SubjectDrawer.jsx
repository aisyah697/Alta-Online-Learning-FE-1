import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SlideshowIcon from "@material-ui/icons/Slideshow";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0,
    top: theme.spacing(2),
  },
  drawerContainer: {
    overflow: "auto",
    paddingBottom: theme.spacing(15),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    paddingRight: theme.spacing(2),
    paddingLeft: "18px",
  },
  module: {
    textTransform: "uppercase",
    fontSize: `calc(1em + 0.5vw)`,
  },
  subject: {
    fontSize: `calc(0.8em + 0.5vw)`,
    fontWeight: "bold",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function getItems() {
  var json = {
    list: [
      {
        items: [
          {
            id: 1,
            name: "Subject 01: Algorithm",
            subitems: [
              {
                id: 1,
                name: "Video",
              },
              {
                id: 2,
                name: "Presentation",
              },
              {
                id: 3,
                name: "Exam (Quiz)",
              },
            ],
          },
        ],
      },
      {
        items: [
          {
            id: 2,
            name: "Subject 02: Basic Python",
            subitems: [
              {
                id: 1,
                name: "Video",
              },
              {
                id: 2,
                name: "Presentation",
              },
              {
                id: 3,
                name: "Exam (Contest)",
              },
            ],
          },
        ],
      },
    ],
  };
  return json;
}

export default function SubjectDrawer(props) {
  const classes = useStyles();
  const items = getItems();

  const [state, setState] = React.useState([]);
  const handleClick = (e) => {
    setState({ [e]: !state[e] });
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <div className={classes.title}>
          <h1 className={classes.module}>Basic Programming</h1>
        </div>
        <div>
          {items.list.map((list) => {
            return (
              <List
                className={classes.root}
                key={list.id}
                subheader={<ListSubheader>{list.title}</ListSubheader>}
              >
                {list.items.map((item) => {
                  return (
                    <div key={item.id}>
                      {item.subitems != null ? (
                        <div key={item.id}>
                          <ListItem
                            button
                            key={item.id}
                            onClick={handleClick.bind(item.name)}
                          >
                            <ListItemText primary={item.name} />
                            {state[item.name] ? <ExpandLess /> : <ExpandMore />}
                          </ListItem>
                          <Collapse
                            key={list.items.id}
                            component="li"
                            in={state[item.name]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List disablePadding>
                              {item.subitems.map((value) => {
                                return (
                                  <ListItem
                                    button
                                    key={value.id}
                                    className={classes.nested}
                                  >
                                    <ListItemText
                                      key={value.id}
                                      primary={value.name}
                                    />
                                  </ListItem>
                                );
                              })}
                            </List>
                          </Collapse>{" "}
                        </div>
                      ) : (
                        <ListItem
                          button
                          onClick={handleClick.bind(item.name)}
                          key={item.id}
                        >
                          <ListItemText primary={item.name} />
                        </ListItem>
                      )}
                    </div>
                  );
                })}
                <Divider key={list.id} absolute />
              </List>
            );
          })}
        </div>
      </div>
    </Drawer>
  );
}

SubjectDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};
