import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import dynamic from "next/dynamic";
import AdminContext from "../../store/adminContext";
import axios from "axios";

const DeleteModule = dynamic(() => import("./DeleteModule"));
const EditModule = dynamic(() => import("./EditModule"));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
  heading: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.5vw)`,
    flexBasis: "100%",
    color: "white",
    fontWeight: "bolder",
  },
  headingField: {
    backgroundColor: theme.palette.secondary.secondary,
  },
  divider: {
    margin: theme.spacing(5, 0, 1, 0),
  },
  allText: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
  iconDown: {
    color: "white",
  },
}));

import useFetch from "../../utils/useFetch";

export default function ModuleAdmin() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { admin_, list_, load_, token_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [list, setList] = list_;
  const [load, setLoad] = load_;
  const [token, setToken] = token_;

  const [loading, setLoading] = useState(true);
  console.log("cek list", list);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/admin";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });
        if (response.status === 200) {
          setList(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
        setLoad(false);
      }
    };
    fetchData();
  }, [load]);

  return (
    <div className={classes.root}>
      {list.map((value, index) => (
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.iconDown} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={classes.headingField}
          >
            <Typography variant="body1" className={classes.heading}>
              Basic Programing Python
            </Typography>
            <EditModule />
            <DeleteModule />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List component="nav">
              <Typography className={classes.allText}>
                <strong>Mentor :</strong>{" "}
              </Typography>
              <Typography className={classes.allText}>
                KobarSeptianus
              </Typography>
              <Divider className={classes.divider} />
              <Typography className={classes.allText}>
                <strong>Description Module :</strong>{" "}
              </Typography>
              <Typography className={classes.allText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Divider className={classes.divider} />
              <Typography variant="body1" className={classes.allText}>
                <strong>System Requirements :</strong>{" "}
              </Typography>
              <List component="nav">
                <ListItem>
                  <ListItemIcon>
                    <RadioButtonCheckedIcon color="secondary" />
                  </ListItemIcon>
                  <Typography className={classes.allText}>
                    Lorem ipsum dolor sit amet, consectetur
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RadioButtonCheckedIcon color="secondary" />
                  </ListItemIcon>
                  <Typography className={classes.allText}>
                    Lorem ipsum dolor sit amet, consectetur
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RadioButtonCheckedIcon color="secondary" />
                  </ListItemIcon>
                  <Typography className={classes.allText}>
                    Lorem ipsum dolor sit amet, consectetur
                  </Typography>
                </ListItem>
              </List>
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

      {/* <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon className={classes.iconDown} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.headingField}
        >
          <Typography variant="body1" className={classes.heading}>
            Basic Programing Python
          </Typography>
          <EditModule />
          <DeleteModule />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List component="nav">
            <Typography className={classes.allText}>
              <strong>Mentor :</strong>{" "}
            </Typography>
            <Typography className={classes.allText}>KobarSeptianus</Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.allText}>
              <strong>Description Module :</strong>{" "}
            </Typography>
            <Typography className={classes.allText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="body1" className={classes.allText}>
              <strong>System Requirements :</strong>{" "}
            </Typography>
            <List component="nav">
              <ListItem>
                <ListItemIcon>
                  <RadioButtonCheckedIcon color="secondary" />
                </ListItemIcon>
                <Typography className={classes.allText}>
                  Lorem ipsum dolor sit amet, consectetur
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RadioButtonCheckedIcon color="secondary" />
                </ListItemIcon>
                <Typography className={classes.allText}>
                  Lorem ipsum dolor sit amet, consectetur
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RadioButtonCheckedIcon color="secondary" />
                </ListItemIcon>
                <Typography className={classes.allText}>
                  Lorem ipsum dolor sit amet, consectetur
                </Typography>
              </ListItem>
            </List>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
    </div>
  );
}
