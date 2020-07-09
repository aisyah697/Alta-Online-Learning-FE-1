import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/router";

import { AccordionSummary, Accordion, AccordionDetails } from '@material-ui/core';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";

import AdminContext from "../../store/adminContext";
import Link from "next/link";

const AddPresentation = dynamic(() => import("./AddPresentation"));
const AddSubject = dynamic(() => import("./AddSubject"));
const AddVideo = dynamic(() => import("./AddVideo"));
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
    borderRadius: theme.spacing(1),
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
  margins: {
    marginBottom: theme.spacing(2),
  },
  square: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(22),
      height: theme.spacing(22),
    },
  },
  list: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "left",
    objectFit: "contain",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  iconDone: {
    fontSize: `calc(2em + 4vw)`,
    color: theme.palette.secondary.main,
  },
  iconNoFile: {
    fontSize: `calc(2em + 4vw)`,
    color: theme.palette.secondary.secondary,
  },
}));

export default function AllSubject(props) {
  const classes = useStyles();
  const router = useRouter();
  const { id, id_module, module, id_subject } = router.query;

  const [expanded, setExpanded] = React.useState(false);
  const [cookies] = useCookies();

  const { admin_, load_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [load, setLoad] = load_;

  const [subject, setSubject] = React.useState();
  const [loading, setLoading] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/subject/nested";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + cookies.admin.token,
          },
        });
        if (response.status === 200) {
          setSubject(response.data);
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
      <AddSubject ID={id_module} />
      {subject
        ? subject
            .filter((mod) => mod.module_id == id_module)
            .map((value, index) => (
              <div key={index} className={classes.margins}>
                <Accordion
                  expanded={expanded === value.id.toString()}
                  onChange={handleChange(value.id.toString())}
                  onClick={(event) => event.stopPropagation()}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.iconDown} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.headingField}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Link
                      href={
                        "/admin/academy/phase/[id]/[id_module]/[module]/[id_subject]/[subject_name]"
                      }
                      as={`/admin/academy/phase/${id}/${id_module}/${module}/${
                        value.id
                      }/${value.name.split(" ").join("-")}`}
                    >
                      <Typography
                        onClick={(event) => event.stopPropagation()}
                        variant="body1"
                        className={classes.heading}
                      >
                        <strong>Subject {index + 1}: </strong>
                        {value.name}
                      </Typography>
                    </Link>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List component="nav" className={classes.list}>
                      <Typography className={classes.allText}>
                        <strong>Description subject :</strong>{" "}
                      </Typography>
                      <Typography className={classes.allText}>
                        {value.description}
                      </Typography>
                      <Divider className={classes.divider} />
                      <Typography variant="body1" className={classes.allText}>
                        <strong> Quisioner : </strong>
                        {value.quesioner}
                      </Typography>
                      <Divider className={classes.divider} />
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item md={4} sm={12}>
                          <Typography
                            variant="body1"
                            className={classes.allText}
                          >
                            <strong>Video :</strong>
                          </Typography>
                          {value.video[0] ? (
                            <div>
                              <Typography
                                variant="body1"
                                className={classes.allText}
                              >
                                {value.video[0].name}
                              </Typography>
                              <CheckCircleOutlineIcon
                                className={classes.iconDone}
                              />
                            </div>
                          ) : (
                            <div>
                              <Typography
                                variant="body1"
                                className={classes.allText}
                              >
                                No File Video
                              </Typography>
                              <AddVideo ID={value.id} />
                            </div>
                          )}
                        </Grid>
                        <Grid item md={4} sm={12}>
                          <Typography
                            variant="body1"
                            className={classes.allText}
                          >
                            <strong>Presentation :</strong>
                          </Typography>
                          {value.presentation[0] ? (
                            <div>
                              <Typography
                                variant="body1"
                                className={classes.allText}
                              >
                                {value.presentation[0].name}
                              </Typography>
                              <CheckCircleOutlineIcon
                                className={classes.iconDone}
                              />
                            </div>
                          ) : (
                            <div>
                              <Typography
                                variant="body1"
                                className={classes.allText}
                              >
                                No File Presentation
                              </Typography>
                              <AddPresentation ID={value.id} />
                            </div>
                          )}
                        </Grid>
                        <Grid item md={4} sm={12}>
                          <Typography
                            variant="body1"
                            className={classes.allText}
                          >
                            <strong>Exam :</strong>
                          </Typography>
                          {value.exam[0] ? (
                            <div>
                              <Typography
                                variant="body1"
                                className={classes.allText}
                              >
                                <strong>Type Exam :</strong>
                                {value.exam[0].type_exam}
                              </Typography>
                              <CheckCircleOutlineIcon
                                className={classes.iconDone}
                              />
                            </div>
                          ) : (
                            <div>
                              <Typography
                                variant="body1"
                                className={classes.allText}
                              >
                                No Exam Found
                              </Typography>
                              <HighlightOffIcon
                                className={classes.iconNoFile}
                              />
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))
        : null}
    </div>
  );
}
