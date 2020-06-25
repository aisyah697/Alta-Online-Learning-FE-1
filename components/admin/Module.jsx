import React from "react";
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

const DeleteModule = dynamic(() => import("./DeleteModule"));
const EditeModule = dynamic(() => import("./EditeModule"));

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
  },
  iconDown: {
    color: "white",
  },
}));

export default function ModuleAdmin() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
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
          <Typography className={classes.heading}>
            Basic Programing Python
          </Typography>
          <EditeModule />
          <DeleteModule />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <Typography className={classes.allText}>
              <strong>Mentor :</strong>
              <Typography className={classes.allText}>
                KobarSeptianus
              </Typography>
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.allText}>
              <strong>Description Module :</strong>
              <Typography className={classes.allText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.allText}>
              <strong>System Requirements :</strong>
              <List>
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
            </Typography>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
