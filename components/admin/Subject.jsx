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

const DeleteSubject = dynamic(() => import("./DeleteSubject"));
const EditSubject = dynamic(() => import("./EditSubject"));
const SubjectVideo = dynamic(() => import("./SubjectVideo"));
const SubjectPPT = dynamic(() => import("./SubjectPPT"));
const SubjectQuiz = dynamic(() => import("./SubjectQuiz"));
const EditQuiz = dynamic(() => import("./EditQuiz"));
const EditLiveCode = dynamic(() => import("./EditLiveCode"));

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

export default function SubjectAdmin() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [expandedVid, setExpandedVid] = React.useState(false);
  const handleChangeVid = (panel) => (event, isExpanded) => {
    setExpandedVid(isExpanded ? panel : false);
  };

  const [expandedPPT, setExpandedPPT] = React.useState(false);
  const handleChangePPT = (panel) => (event, isExpanded) => {
    setExpandedPPT(isExpanded ? panel : false);
  };

  const [expandedLC, setExpandedLC] = React.useState(false);
  const handleChangeLC = (panel) => (event, isExpanded) => {
    setExpandedLC(isExpanded ? panel : false);
  };

  const [expandedQuiz, setExpandedQuiz] = React.useState(false);
  const handleChangeQuiz = (panel) => (event, isExpanded) => {
    setExpandedQuiz(isExpanded ? panel : false);
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
          <Typography variant="body1" className={classes.heading}>
            Algorithm
          </Typography>
          <EditSubject />
          <DeleteSubject />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List component="nav">
            <Typography className={classes.allText}>
              <strong>Subject Description:</strong>{" "}
            </Typography>
            <Typography className={classes.allText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Divider className={classes.divider} />

            <ExpansionPanel
              expanded={expandedVid === "panelVid"}
              onChange={handleChangeVid("panelVid")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon className={classes.iconDown} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.headingField}
              >
                <Typography variant="body1" className={classes.heading}>
                  Video
                </Typography>
                <EditSubject />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SubjectVideo />
              </ExpansionPanelDetails>
              <List component="nav"></List>
            </ExpansionPanel>
            <br />
            <ExpansionPanel
              expanded={expandedPPT === "panelPPT"}
              onChange={handleChangePPT("panelPPT")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon className={classes.iconDown} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.headingField}
              >
                <Typography variant="body1" className={classes.heading}>
                  Presentation
                </Typography>
                <EditSubject />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SubjectPPT />
              </ExpansionPanelDetails>
              <List component="nav"></List>
            </ExpansionPanel>
            <br />
            <ExpansionPanel
              expanded={expandedLC === "panelLC"}
              onChange={handleChangeLC("panelLC")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon className={classes.iconDown} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.headingField}
              >
                <Typography variant="body1" className={classes.heading}>
                  Live Code
                </Typography>
                <EditLiveCode />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography className={classes.allText}>
                  Algorithm Live Code: https://hackerrank.com/alta/livecode
                </Typography>
              </ExpansionPanelDetails>
              <List component="nav"></List>
            </ExpansionPanel>
            <br />
            <ExpansionPanel
              expanded={expandedQuiz === "panelQuiz"}
              onChange={handleChangeQuiz("panelQuiz")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon className={classes.iconDown} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.headingField}
              >
                <Typography variant="body1" className={classes.heading}>
                  Quiz
                </Typography>
                <EditQuiz />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails></ExpansionPanelDetails>
              <List component="nav">
                <SubjectQuiz />
              </List>
            </ExpansionPanel>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
