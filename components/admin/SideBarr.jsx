import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import Typography from "@material-ui/core/Typography";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Link from "../../utils/link";
import { Divider } from "@material-ui/core";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../Loading";

const ContentSide = dynamic(() => import("./ContentSidebarr"));

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(-1),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(0),
    },
  },
  sideBarr: {
    paddingBottom: theme.spacing(10),
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
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
  textAltaTest: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.5vw)`,
    fontWeight: "bold",
  },
  iconAltaTest: {
    color: theme.palette.secondary.secondary,
    margin: theme.spacing(0, 0, 0, -0.5),
  },
}));

export default function SideBarr() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [close, setClose] = React.useState(true);
  const [cookies] = useCookies();
  const [phase, setPhase] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
    setClose(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setClose(true);
  };

  useEffect(() => {
    const urlPhase = process.env.NEXT_PUBLIC_BASE_URL + "/phase/nested";
    const fetchData = async function () {
      try {
        const response = await axios.get(urlPhase, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin.token,
          },
        });
        if (response.status === 200) {
          setPhase(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
      }
    };
    fetchData();
  }, []);

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
      <div className={classes.sideBarr}>
        <Link href={"/admin/academy/altatest"}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon className={classes.iconAltaTest} />
            </ListItemIcon>
            <Typography className={classes.textAltaTest}>Alta Test</Typography>
          </ListItem>
        </Link>
        <Divider />
        {phase ? (
          <div>
            {phase.map((item, idx) => (
              <ContentSide
                key={idx}
                name={item.name}
                module={item.module}
                idPhase={item.id}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </Drawer>
  );
}
