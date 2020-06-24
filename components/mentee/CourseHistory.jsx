import React from "react";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto, sans-serif",
    width: "100%",
  },
  h1: {
    color: theme.palette.secondary.secondary,
    marginTop: theme.spacing(5),
  },
  h2: {
    marginBottom: "0px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  headerPanel: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: theme.spacing(1.5),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  panel: {
    color: theme.palette.primary.secondary,
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 3),
  },
  checklist: {
    display: "block",
    margin: "auto",
  },
  notyet: {
    backgroundColor: "#BDBDBD",
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: "#BDBDBD",
      WebkitBoxShadow: "none",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  failed: {
    backgroundColor: "red",
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: "red",
      WebkitBoxShadow: "none",
    },
  },
  passed: {
    backgroundColor: "green",
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    WebkitBoxShadow: "none",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "green",
      WebkitBoxShadow: "none",
    },
  },
  icon: {
    marginBottom: theme.spacing(1.5),
  },
}));

const CourseHistory = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <h1 className={classes.h1}>My Course History</h1>
      <h2 className={classes.h2}>Phase 1</h2>
      <h3>Basic Programming Python</h3>
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            className={classes.headerPanel}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Subject 1</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className={classes.checklist}>
                  <Typography>Video</Typography>
                  <br />
                  <Typography>Presentation</Typography>
                </div>
                <br />
                <Typography>Quiz</Typography>
              </Grid>
              <Grid item xs={6}>
                <CheckCircleOutlineIcon className={classes.icon} />
                <br />
                <CheckCircleOutlineIcon className={classes.icon} />
                <br />
                <div className={classes.icon}>
                  <Button
                    className={classes.failed}
                    variant="contained"
                    color="secondary"
                  >
                    50
                  </Button>
                  <Button
                    className={classes.failed}
                    variant="contained"
                    color="secondary"
                  >
                    40
                  </Button>
                  <Button
                    className={classes.passed}
                    variant="contained"
                    color="primary"
                  >
                    90
                  </Button>
                </div>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <ExpansionPanelSummary
            className={classes.headerPanel}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Subject 2</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className={classes.checklist}>
                  <Typography>Video</Typography>
                  <br />
                  <Typography>Presentation</Typography>
                </div>
                <br />
                <Typography>Quiz</Typography>
              </Grid>
              <Grid item xs={6}>
                <CheckCircleOutlineIcon className={classes.icon} />
                <br />
                <RadioButtonUncheckedIcon className={classes.icon} />
                <br />
                <div className={classes.icon}>
                  <Button
                    className={classes.notyet}
                    variant="contained"
                    color="primary"
                  >
                    locked
                  </Button>
                </div>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
}

export default CourseHistory;