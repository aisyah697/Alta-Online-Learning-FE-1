import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

// import style
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Loading from "../Loading";

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
    color: theme.palette.secondary.secondary,
  },
  h3: {
    color: theme.palette.secondary.secondary,
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    flexBasis: "33.33%",
    flexShrink: 0,
    color: theme.palette.primary.main,
  },
  accordion: {
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
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
  details: {
    borderBottomLeftRadius: theme.spacing(1),
    borderTopLeftRadius: theme.spacing(1),
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
    color: theme.palette.secondary.secondary,
  },
  notyet: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    textTransform: "none",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 2),
    WebkitBoxShadow: "none",
    marginTop: theme.spacing(2),
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      WebkitBoxShadow: "none",
    },
  },
  exam: {
    backgroundColor: theme.palette.primary.main,
    border: "1px solid #f4752e",
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    WebkitBoxShadow: "none",
    borderRadius: theme.spacing(3),
    cursor: "default",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      WebkitBoxShadow: "none",
    },
  },
  passed: {
    backgroundColor: theme.palette.primary.main,
    color: "green",
    border: "1px solid green",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    WebkitBoxShadow: "none",
    borderRadius: theme.spacing(3),
    cursor: "default",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      WebkitBoxShadow: "none",
    },
  },
  done: {
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 2.5),
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      WebkitBoxShadow: "none",
    },
  },
  unfinish: {
    backgroundColor: theme.palette.secondary.secondary,
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 1.5),
    WebkitBoxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.secondary,
      WebkitBoxShadow: "none",
    },
  },
  space: {
    margin: "auto",
    marginTop: theme.spacing(2),
  },
  icon: {
    marginTop: theme.spacing(2),
  },
  iconDown: {
    color: theme.palette.primary.main,
  },
}));

const CourseHistory = () => {
  const classes = useStyles();
  const [cookies] = useCookies();
  const router = useRouter();
  const { id } = router.query;

  const [subject, setSubject] = React.useState();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/mentee/score/${id}`;
    const fetchData = async function (token) {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (response.status === 200) {
          setSubject(response.data);
        }
        // eslint-disable-next-line no-useless-catch
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      if (cookies.token_admin) {
        fetchData(cookies.token_admin);
      } else {
        if (cookies.registered === "true") {
          fetchData(cookies.token_mentee);
        }
      }
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <h1 className={classes.h1}>Course History</h1>
        {subject ? (
          subject.phase.map((item, index) => (
            <div key={index}>
              {item.lock_key ? (
                <div>
                  <h2 className={classes.h2}>Phase {index + 1}</h2>
                  {item.module
                    ? item.module.map((item, index) => (
                        <div key={index}>
                          {item.lock_key ? (
                            <div>
                              <h3 className={classes.h3}>
                                Module {index + 1}: {item.name_module.name}
                              </h3>
                              {item.subject
                                ? item.subject.map((item, index) => (
                                    <div key={index}>
                                      {item.lock_key ? (
                                        <div className={classes.root}>
                                          <Accordion
                                            className={classes.accordion}
                                          >
                                            <AccordionSummary
                                              className={classes.headerPanel}
                                              expandIcon={
                                                <ExpandMoreIcon
                                                  className={classes.iconDown}
                                                />
                                              }
                                              aria-controls="panel1bh-content"
                                              id="panel1bh-header"
                                            >
                                              <Typography
                                                className={classes.heading}
                                              >
                                                {item.name_subject.name}
                                              </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails
                                              className={classes.details}
                                            >
                                              <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                  <div
                                                    className={
                                                      classes.checklist
                                                    }
                                                  >
                                                    <Typography>
                                                      Status
                                                    </Typography>
                                                    <br />
                                                    <Typography
                                                      className={classes.space}
                                                    >
                                                      Quiz
                                                    </Typography>
                                                  </div>
                                                </Grid>
                                                {item.is_complete ? (
                                                  <Grid item xs={6}>
                                                    <Button
                                                      className={classes.done}
                                                      variant="contained"
                                                      color="secondary"
                                                    >
                                                      <DoneAllIcon />
                                                      Completed
                                                    </Button>
                                                    <br />
                                                    {item.score_exam.map(
                                                      (score, index) => (
                                                        <div
                                                          key={index}
                                                          className={
                                                            classes.icon
                                                          }
                                                        >
                                                          <Button
                                                            className={
                                                              classes.exam
                                                            }
                                                            variant="contained"
                                                            color="secondary"
                                                          >
                                                            {score}
                                                          </Button>
                                                        </div>
                                                      )
                                                    )}
                                                  </Grid>
                                                ) : (
                                                  <Grid item xs={6}>
                                                    <Button
                                                      className={
                                                        classes.unfinish
                                                      }
                                                      variant="contained"
                                                      color="primary"
                                                    >
                                                      <HourglassEmptyIcon />
                                                      Running
                                                    </Button>
                                                    <br />
                                                    {item.score_exam.length !==
                                                    0 ? (
                                                      <div>
                                                        {item.score_exam.map(
                                                          (score, index) => (
                                                            <div
                                                              key={index}
                                                              className={
                                                                classes.icon
                                                              }
                                                            >
                                                              <Button
                                                                className={
                                                                  classes.exam
                                                                }
                                                                variant="contained"
                                                                color="secondary"
                                                              >
                                                                {score}
                                                              </Button>
                                                            </div>
                                                          )
                                                        )}
                                                      </div>
                                                    ) : (
                                                      <Button
                                                        className={
                                                          classes.notyet
                                                        }
                                                        variant="contained"
                                                        color="primary"
                                                      >
                                                        <ClearIcon />
                                                        Not yet
                                                      </Button>
                                                    )}
                                                  </Grid>
                                                )}
                                              </Grid>
                                            </AccordionDetails>
                                          </Accordion>
                                        </div>
                                      ) : null}
                                    </div>
                                  ))
                                : null}
                            </div>
                          ) : null}
                        </div>
                      ))
                    : null}
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>
    );
  }
};

export default CourseHistory;
