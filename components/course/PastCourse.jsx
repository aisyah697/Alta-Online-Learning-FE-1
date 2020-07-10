import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../store/userContext";
import axios from "axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  subjects: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    color: theme.palette.text.secondary,
  },
  feedbackForm: {
    color: theme.palette.secondary.secondary,
    marginRight: theme.spacing(7),
    marginBottom: theme.spacing(1),
  },
  accordion: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  headerPanel: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    backgroundColor: theme.palette.secondary.secondary,
    color: theme.palette.primary.main,
    borderTopLeftRadius: theme.spacing(1),
    borderTopRightRadius: theme.spacing(1),
    borderBottomLeftRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
  },
  content: {
    color: theme.palette.secondary.secondary,
    marginBottom: theme.spacing(1),
  },
  panel: {
    color: theme.palette.primary.main,
  },
}));

export default function PastCourses() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [cookies] = useCookies();

  const { mentee_, token_ } = useContext(UserContext);
  const [mentee, setMentee] = mentee_;
  const [tokenMentee, setTokenMentee] = token_;

  const [course, setCourse] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historymodule/mentee";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token_mentee,
          },
        });
        if (response.status === 200) {
          setCourse(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      {course
        ? course.map((item, index) => (
            <div key={index}>
              {item.is_complete ? (
                <Accordion className={classes.accordion}>
                  <AccordionSummary
                    className={classes.headerPanel}
                    expandIcon={<ExpandMoreIcon className={classes.panel} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid container spacing={0}>
                      <Grid item xs={5}>
                        <Typography className={classes.headingFirst}>
                          {item.module.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography className={classes.heading}>
                          {item.subject.length} Subjects
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className={classes.heading} align="center">
                          Feedback Form
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={0}>
                      <Grid item xs={5}>
                        {item.subject
                          ? item.subject.map((item, index) => (
                              <Typography className={classes.content}>
                                {item.name}
                              </Typography>
                            ))
                          : null}
                      </Grid>
                      <Grid item xs={3}>
                        {item.subject
                          ? item.subject.map((item, index) => (
                              <Typography className={classes.content}>
                                {index + 1}
                              </Typography>
                            ))
                          : null}
                      </Grid>
                      <Grid item xs={4}>
                        {item.subject
                          ? item.subject.map((item, index) => (
                              <Typography
                                className={classes.feedbackForm}
                                align="center"
                              >
                                {item.quesioner}
                              </Typography>
                            ))
                          : null}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
}
