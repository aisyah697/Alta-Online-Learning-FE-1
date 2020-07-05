import React from "react";
import { AccordionSummary, AccordionDetails, Accordion } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Divider, ListItem } from "@material-ui/core";
import List from "@material-ui/core/List";
import dynamic from "next/dynamic";

import EditQuizSubject from "./EditQuizSubject";

const AddQuiz = dynamic(() => import("./AddQuiz"));
const DeleteSubject = dynamic(() => import("./DeleteSubject"));
const EditSubject = dynamic(() => import("./EditSubject"));
const SubjectVideo = dynamic(() => import("./SubjectVideo"));
const SubjectPPT = dynamic(() => import("./SubjectPPT"));
const SubjectQuiz = dynamic(() => import("./SubjectQuiz"));
const EditQuiz = dynamic(() => import("./EditQuiz"));
const EditLiveCode = dynamic(() => import("./EditLiveCode"));
const Loading = dynamic(() => import("./../Loading"));
const AddPostQuiz = dynamic(() => import("./AddPostQuiz"));
const DeleteQuiz = dynamic(() => import("./DeleteQuiz"));

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

export default function SubjectAdmin({subject}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header-4"
        className={classes.headingOfHeadField}
      >
        <Typography variant="body1" className={classes.heading}>
          Subject Description:
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.panelUtama}>
        <List component="nav">
          <Typography className={classes.allText}>
            {subject.description}
          </Typography>
        </List>
      </AccordionDetails>

      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header-3"
        className={classes.headingField}
      >
        <Typography variant="body1" className={classes.heading}>
          Video
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {subject.video ?
          (subject.video.map((element, num) => (
          <SubjectVideo
            key={num}
            name={element.name}
            video={element.content_file}
          />
          ))) : <Typography> No Data </Typography> }
      </AccordionDetails>
        <List component="nav"/>

      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header-2"
        className={classes.headingField}
      >
        <Typography variant="body1" className={classes.heading}>
          Presentation
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {subject.presentation ?
          (subject.presentation.map((element, num) => (
              <SubjectPPT
                  key={num}
                  name={element.name}
                  press={element.content_file}
              />
          ))) : <Typography>No Data</Typography> }
      </AccordionDetails>

      {subject.exam[0] ? (
        <div>
          {subject.exam[0].type_exam === "quiz" ? (
            <div>
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header-1"
                className={classes.headingField}
              >
                <Typography variant="body1" className={classes.heading}>
                  Quiz: {subject.name}
                </Typography>
                 {subject.exam[0].quiz[0]?
                     <> <EditQuizSubject quiz={subject.exam[0].quiz[0]} />
                    <DeleteQuiz ID={subject.exam[0].quiz[0].id}/></> :
                     <AddPostQuiz exam={subject.exam[0]}/> }
              </AccordionSummary>
                {subject.exam[0].quiz[0]?
                    (<>
                        <SubjectQuiz quiz={subject.exam[0].quiz[0]} />
                    </>) : null }
            </div>
          ) : (
            <div>
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.headingField}
              >
                <Typography variant="body1" className={classes.heading}>
                  Live Code
                </Typography>
                <EditLiveCode />
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.allText}>
                  Algorithm Live Code: https://hackerrank.com/alta/livecode
                </Typography>
              </AccordionDetails>
            </div>
          )}
        </div>
      ) : null
      }
      <List component="nav"/>
    </div>
  );
}
