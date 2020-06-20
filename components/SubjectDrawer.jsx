import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NavigationBar from "./NavigationBar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SlideshowIcon from "@material-ui/icons/Slideshow";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SubjectContent from "./SubjectContent";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "30px 24px",
  },
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

export default function SubjectTest(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavigationBar className={classes.appBar} />
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
          <ListItem button onClick={handleClick}>
            <ListItemText
              primary="Subject 01: Algorithm"
              className={classes.subject}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {["Video", "Presentation", "Quiz"].map((text, index) => (
                <ListItem button key={text} className={classes.nested}>
                  <ListItemIcon>
                    {index === 0 ? (
                      <PlayCircleOutlineIcon />
                    ) : index === 1 ? (
                      <SlideshowIcon />
                    ) : (
                      <AssignmentIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={handleClick}>
            <ListItemText
              primary="Subject 02: Basic Python"
              className={classes.subject}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <div className={classes.title}></div>
              {["Video", "Presentation", "Quiz"].map((text, index) => (
                <ListItem button key={text} className={classes.nested}>
                  <ListItemIcon>
                    {index === 0 ? (
                      <PlayCircleOutlineIcon />
                    ) : index === 1 ? (
                      <SlideshowIcon />
                    ) : (
                      <AssignmentIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
        </div>
      </Drawer>
      <SubjectContent />
    </div>
  );
}
