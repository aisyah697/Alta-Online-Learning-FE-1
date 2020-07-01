import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Divider, ListItem } from "@material-ui/core";
import List from "@material-ui/core/List";
import dynamic from "next/dynamic";

const AddQuiz = dynamic(() => import("./AddQuiz"));
const DeleteSubject = dynamic(() => import("./DeleteSubject"));
const EditSubject = dynamic(() => import("./EditSubject"));
const SubjectVideo = dynamic(() => import("./SubjectVideo"));
const SubjectPPT = dynamic(() => import("./SubjectPPT"));
const SubjectQuiz = dynamic(() => import("./SubjectQuiz"));
const EditQuiz = dynamic(() => import("./EditQuiz"));
const EditLiveCode = dynamic(() => import("./EditLiveCode"));
const Loading = dynamic(() => import("./../Loading"));

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
  headingOfHeadField: {
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
  panelUtama: {
    display: "block",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
}));

export default function SubjectAdmin(props) {
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
      <ExpansionPanelSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        className={classes.headingOfHeadField}
      >
        <Typography variant="body1" className={classes.heading}>
          Subject Description:
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelUtama}>
        <List component="nav">
          <Typography className={classes.allText}>
            {props.props.description}
          </Typography>
        </List>
      </ExpansionPanelDetails>

      <ExpansionPanelSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        className={classes.headingField}
      >
        <Typography variant="body1" className={classes.heading}>
          Video
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {props.props.video.map((element, num) => (
          <SubjectVideo
            key={num}
            name={element.name}
            video={element.content_file}
          />
        ))}
      </ExpansionPanelDetails>
      <List component="nav"></List>

      <ExpansionPanelSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        className={classes.headingField}
      >
        <Typography variant="body1" className={classes.heading}>
          Presentation
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <SubjectPPT />
      </ExpansionPanelDetails>
      {props.props.exam[0] ? (
        <div>
          {props.props.exam[0].type_exam === "quiz" ? (
            <div>
              <ExpansionPanelSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.headingField}
              >
                <Typography variant="body1" className={classes.heading}>
                  Quiz: {props.props.name}
                </Typography>
              </ExpansionPanelSummary>
              <AddQuiz quizID={props.props.exam[0].quiz[0].id} />
              <SubjectQuiz quiz={props.props.exam[0].quiz[0]} />
            </div>
          ) : (
            <div>
              <ExpansionPanelSummary
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
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <List component="nav"></List>
    </div>
  );
}
