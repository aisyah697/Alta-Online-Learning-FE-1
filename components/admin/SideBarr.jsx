import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

const ContentSide = dynamic(() => import("./ContentSidebarr"));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(-1),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(0),
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    paddingTop: theme.spacing(11),
    width: drawerWidth,
    zIndex: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    zIndex: 0,
    paddingTop: theme.spacing(11),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
}));

export default function SideBarr() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [close, setClose] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    setClose(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setClose(true);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <Button
        className={clsx(classes.menuButton, {
          [classes.hide]: open,
        })}
        color="secondary"
        onClick={handleDrawerOpen}
      >
        <MenuIcon />
      </Button>
      <Button
        className={clsx(classes.menuButton, {
          [classes.hide]: close,
        })}
        color="secondary"
        variant="outlined"
        onClick={handleDrawerClose}
      >
        <MenuOpenIcon />
      </Button>
      <ContentSide />
      <ContentSide />
      <ContentSide />
      <ContentSide />
    </Drawer>
  );
}