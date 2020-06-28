import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import BookIcon from "@material-ui/icons/Book";
import { Divider } from "@material-ui/core";
import Link from "../../utils/link";

const useStyles = makeStyles((theme) => ({
  expandTitle: {
    width: "197px",
    height: "2",
    zIndex: "1",
  },
  expandTitle2: {
    width: "200px",
    height: "3",
  },
  expansummar: {
    margin: theme.spacing(0, 0, 0, -1),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0, 0, 0, -3),
    },
  },
  expansummar2: {
    margin: theme.spacing(-6, 0, 0, 3),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(-6, 0, 0, 1.5),
    },
  },
  expandMenu: {
    margin: theme.spacing(0, 0, 0, -1),
  },
  expandMenu1: {
    margin: theme.spacing(-2, 0, 0, -4),
  },
  expandMenu2: {
    margin: theme.spacing(-1, 0, 0, -1),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(-1, 0, 0, -1),
    },
  },
  textJudul: {
    marginLeft: theme.spacing(-2),
  },
  textJudulSubject: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.5em + 0.5vw)`,
  },
  noJudulSubject: {
    color: theme.palette.secondary.main,
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.1em + 0.5vw)`,
  },
  textJudulModule: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.5vw)`,
    fontWeight: "bold",
  },
  noJudulModule: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.1em + 0.5vw)`,
    fontWeight: "bold",
  },
  textJudulPhase: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.5vw)`,
    fontWeight: "bold",
  },
  noJudulPhase: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.1em + 0.5vw)`,
    fontWeight: "bold",
  },
  iconPhase: {
    color: theme.palette.secondary.secondary,
  },
  iconSubject: {
    color: theme.palette.secondary.main,
  },
  moduleName: {
    margin: theme.spacing(-5, 0, 0, 8.5),
    position: "absolute",
    color: theme.palette.secondary.secondary,
    ontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.5vw)`,
  },
}));

export default function ContentSide() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [expanded2, setExpanded2] = React.useState(true);

  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanelDetails className={classes.expandMenu}>
        <ExpansionPanel
          elevation={0}
          className={classes.expandTitle}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            className={classes.expansummar}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <ListItem button>
              <ListItemIcon className={classes.iconPhase}>
                <LibraryBooksIcon />
                <Typography className={classes.noJudulPhase}>1</Typography>
              </ListItemIcon>
              <Link href="/admin/academy/module">
                <Typography className={classes.textJudulPhase}>
                  PHASE 01
                </Typography>
              </Link>
            </ListItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expandMenu1}>
            <ExpansionPanel
              elevation={0}
              className={classes.expandTitle2}
              expanded={expanded2 === "panel1"}
              onChange={handleChange2("panel1")}
            >
              <ExpansionPanelSummary
                className={classes.expansummar2}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <CollectionsBookmarkIcon className={classes.iconPhase} />
                      <Typography className={classes.noJudulModule}>
                        1
                      </Typography>
                    </ListItemIcon>
                    <Typography className={classes.textJudulModule}>
                      Module 01
                    </Typography>
                  </ListItem>
                </List>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expandMenu2}>
                <List>
                  <ListItemIcon button="true" className={classes.moduleName}>
                    Python
                  </ListItemIcon>
                  <ListItem button>
                    <ListItemIcon>
                      <BookIcon className={classes.iconSubject} />
                      <Typography className={classes.noJudulSubject}>
                        1
                      </Typography>
                    </ListItemIcon>
                    <Typography className={classes.textJudulSubject}>
                      Subject 01
                    </Typography>
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <BookIcon className={classes.iconSubject} />
                      <Typography className={classes.noJudulSubject}>
                        1
                      </Typography>
                    </ListItemIcon>
                    <Typography className={classes.textJudulSubject}>
                      Subject 01
                    </Typography>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </ExpansionPanelDetails>
      <Divider />
    </div>
  );
}
