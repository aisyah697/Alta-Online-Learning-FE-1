import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Avatar from "@material-ui/core/Avatar";
import AdminContext from "../../store/adminContext";
import { useCookies } from "react-cookie";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Loading from "./../Loading";
import axios from "axios";
import dynamic from "next/dynamic";

const AddPresentation = dynamic(() => import("./AddPresentation"));
const AddVideo = dynamic(() => import("./AddVideo"));
const AddSubject = dynamic(() => import("./AddSubject"));
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
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [cookies] = useCookies();

  const { admin_, load_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [load, setLoad] = load_;

  const [subject, setSubject] = React.useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={classes.root}>
        <AddSubject ID={subject} />
        {subject
          ? subject.map((value, index) => (
              <div key={index} className={classes.margins}>
                <ExpansionPanel
                  expanded={expanded === value.id.toString()}
                  onChange={handleChange(value.id.toString())}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon className={classes.iconDown} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.headingField}
                  >
                    <Typography variant="body1" className={classes.heading}>
                      <strong>Subject {index + 1}: </strong>
                      {value.name}
                    </Typography>
                    {/* <EditSubject {...value} id_subject={value.id} /> */}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <List component="nav" className={classes.list}>
                      <Typography className={classes.allText}>
                        <strong>Description subject :</strong>{" "}
                      </Typography>
                      <Typography className={classes.allText}>
                        {value.description}
                      </Typography>
                      <Divider className={classes.divider} />
                      <Typography variant="body1" className={classes.allText}>
                        <strong>Quisioner : </strong>
                        <Typography variant="body1" className={classes.allText}>
                          {value.quesioner}
                        </Typography>
                      </Typography>
                      <Divider className={classes.divider} />
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid md={4} sm={12}>
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
                        <Grid
                          md={4}
                          sm={12}
                          direction="row"
                          justify="center"
                          alignItems="flex-start"
                        >
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
                        <Grid
                          md={4}
                          sm={12}
                          direction="row"
                          justify="center"
                          alignItems="flex-start"
                        >
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
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            ))
          : null}
      </div>
    );
  }
}
