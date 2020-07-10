import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import AdminContext from "../../store/adminContext";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Done } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import Link from 'next/link'

const Loading = dynamic(() => import("./../Loading"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#F4F7FC",
  },
  bodyContent: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    backgroundColor: "#F4F7FC",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: "15vw",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100vw",
    },
  },
  footer: {
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  tabPanel: {
    minWidth: "80vw",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  // current course
  text: {
    color: theme.palette.secondary.secondary,
    fontWeight: "bold",
  },
  currentContent: {
    color: theme.palette.secondary.secondary,
  },
  paper: {
    minHeight: "40vh",
  },
  paperContent: {
    padding: theme.spacing(2),
    color: theme.palette.secondary.secondary,
  },
  infos: {
    display: "flex",
  },
  box1: {
    minHeight: "100px",
    textAlign: "center",
    paddingTop: theme.spacing(2),
  },
  box2: {
    paddingTop: theme.spacing(2),
  },
  box3: {
    paddingTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rootList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "5px 20px",
    textTransform: "none",
    borderRadius: theme.spacing(1),
    minWidth: theme.spacing(12),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
  table: {
    minWidth: 700,
  },
  paperPast: {
    minHeight: "10vh",
    display: "flex",
    alignItems: "center",
  },
  paperPastContent: {
    padding: theme.spacing(2),
    color: theme.palette.secondary.secondary,
    display: "flex",
    alignItems: "center",
  },
}));

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        size={100}
        color={"secondary"}
        variant="static"
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const ListItemBase = ({ subject, done }) => {
  return (
    <React.Fragment>
      <ListItem>
        <ListItemText primary={subject} />
        {done ? <Done /> : null}
      </ListItem>
    </React.Fragment>
  );
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.secondary,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, quiz1, quiz2, quiz3) {
  return { name, quiz1, quiz2, quiz3 };
}

const rows = [
  createData("What is Python", "1", "2", "3"),
  createData("What is Python", "4", "5", "6"),
];

function CustomizedTables({ sub }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell align="center">Quiz 1</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sub.map((row, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell component="th" scope="row">
                {row.subject.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const CurrentCourse = ({ currentModule, no }) => {
  const classes = useStyles();

  const [cookies] = useCookies();
  const [loading, setLoading] = useState(true);
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [subject, setSubject] = useState();

  const [phase, setPhase] = React.useState();
  const [subjects, setSubjects] = React.useState();
  const [modules, setModule] = React.useState();

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/historysubject/mentee`;
    const fetchData = async function () {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.token_mentee,
          },
        });
        if (response.status === 200) {
          setSubjects(response.data);
        }
      } catch (error) {
        throw error;
      }
    };
    if (cookies.registered === "true") {
      fetchData();
    }
  }, []);

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/historymodule/mentee`;
    const fetchData = async function () {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.token_mentee,
          },
        });
        if (response.status === 200) {
          setModule(response.data);
        }
      } catch (error) {
        throw error;
      }
    };
    if (cookies.registered === "true") {
      fetchData();
    }
  }, []);

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historyphase/mentee";
    const fetchData = async function () {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.token_mentee,
          },
        });
        if (response.status === 200) {
          setPhase(response.data);
        }
      } catch (error) {
        throw error;
      }
    };
    if (cookies.registered === "true") {
      fetchData();
    }
  }, []);

  if (phase) {
    const lastArray = phase.filter(phase => phase.lock_key == true);
    var lastPhase = lastArray[lastArray.length - 1];
  }
  if (subjects) {
    const lastArr = subjects.filter(res => res.is_complete == false);
    var lastSubject = lastArr[0];
  }
  if (modules) {
    const lasyArs = modules.filter(mod => mod.lock_key == true);
    var lastModule = lasyArs[lasyArs.length - 1];
  }

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historysubject/subject/" + currentModule.module_id;
    const auth = cookies.mentee.token;
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + auth,
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

  if (loading) {
    return <Loading />;
  } else {
    const MAX = subject.length;
    const currentProgress = subject.filter((item) => item.is_complete === true).length;
    const normalise = (value) => ((value - 0) * 100) / MAX;
    return (
      <React.Fragment>
        <div className={classes.text}>
          <Typography>Active Course</Typography>
        </div>
        <br />
        <div className={classes.currentContent}>
          <Paper elevation={1} className={classes.paper}>
            <div className={classes.paperContent}>
              <div>
                <Typography> Modul {no} </Typography>
                <Typography variant={"h6"}>
                  {currentModule.module.name}
                </Typography>
              </div>
              <br />
              <div>
                <Grid container className={classes.infos}>
                  <Grid item xs={12} lg={3} className={classes.box1}>
                    <CircularProgressWithLabel
                      value={normalise(currentProgress)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3} className={classes.box2}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Subject Finished:
                    </Typography>
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      className={classes.rootList}
                    >
                      {subject.map((item, idx) => (
                        <ListItemBase
                          key={idx}
                          subject={item.subject.name}
                          done={item.is_complete}
                        />
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12} lg={6} className={classes.box3}>
                    <Link href={'/courses/phase/[id]/[id_module]/[module]/subject'}
                          as={`/courses/phase/${lastPhase? lastPhase.phase_id : null}/${lastSubject? lastSubject.subject.module_id : 'empty'}/${lastModule? lastModule.module.name.split(" ").join("-") : null}/subject`}>
                    <Button className={classes.button} variant={"outlined"}>
                      Go to course
                    </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Paper>
          <br />
          <Paper elevation={0} className={classes.paper}>
            <CustomizedTables sub={subject} />
          </Paper>
        </div>
      </React.Fragment>
    );
  }
};

export default CurrentCourse;
