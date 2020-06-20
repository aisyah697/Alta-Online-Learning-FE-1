import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import ModuleDetailIsiTabel from "../components/ModuleDetailIsiTabel";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GitHubIcon from "@material-ui/icons/GitHub";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SubFooter from "../components/SubFooter";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  textPengantar: {
    margin: theme.spacing(0, 5, 0, 8),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0, 2, 0, 3),
    },
  },
  judulModule: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(1.1em + 1.5vw)`,
    textAlign: "left",
    fontWeight: "bold",
    color: theme.palette.secondary.secondary,
  },
  mentorName: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.8em + 0.5vw)`,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: theme.spacing(1),
    color: theme.palette.secondary.secondary,
  },
  keteranganModule: {
    fontFamily: "Muli, sans-serif",
    color: "gray",
    fontSize: `calc(0.7em + 0.4vw)`,
    marginBottom: theme.spacing(5),
  },
  leftContent: {
    backgroundColor: "#F4F7FC",
    padding: theme.spacing(5, 4, 5, 8),
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#F4F7FC",
      padding: theme.spacing(5, 4, 5, 3),
    },
  },
  button: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "7px 12%",
    [theme.breakpoints.down("sm")]: {
      padding: "7px 19%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "4px 5%",
    },
    textTransform: "none",
    borderRadius: theme.spacing(10),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
  avatar: {
    width: "50%",
    borderRadius: "10px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
    },
  },
  mentorDescribe: {
    textAlign: "justify",
    fontFamily: "Muli, sans-serif",
    color: theme.palette.secondary.secondary,
    fontSize: `calc(0.6em + 0.4vw)`,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  github: {
    fontFamily: "Muli, sans-serif",
    color: theme.palette.secondary.secondary,
    fontSize: `calc(0.7em + 0.4vw)`,
    marginLeft: theme.spacing(1),
  },
  giticon: {
    color: theme.palette.secondary.secondary,
    fontSize: `calc(1.5em + 0.4vw)`,
  },
  divTableInPage: {
    margin: theme.spacing(0, 3, 0, 8),
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#F4F7FC",
      margin: theme.spacing(5, 0, 0, 0),
    },
  },
  tables: {
    marginBottom: theme.spacing(5),
  },

  listItem2: {
    marginLeft: theme.spacing(-3),
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.secondary,
    color: theme.palette.common.white,
    fontSize: `calc(0.6em + 0.5vw)`,
    fontFamily: "Muli, sans-serif",
  },
  body: {
    fontSize: 14,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.secondary,
    textAlign: "justify",
    fontSize: `calc(0.6em + 0.4vw)`,
    fontFamily: "Muli, sans-serif",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ModuleDetail() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>Detail Module | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <div className={classes.root}>
          <div className={classes.textPengantar}>
            <Typography className={classes.judulModule}>
              Module 01: Python
            </Typography>
            <Typography className={classes.keteranganModule}>
              Introduction of Python
            </Typography>
          </div>
          <Grid container className={classes.leftContent}>
            <Grid
              item
              md={3}
              xs={12}
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Button
                variant="outlined"
                size="medium"
                className={classes.button}
              >
                Register Now
              </Button>
              <img
                alt="mentor-avatar"
                className={classes.avatar}
                src="/images/dummy.jpg"
              />
              <Typography className={classes.mentorName}>
                Mentor: Kobar Septyanus
              </Typography>
              <Typography className={classes.mentorDescribe}>
                Kobar formerly was the VP of Education at python. In this
                capacity, he managed the python University and python
                Documentation teams.Shannon holds a Ph.D. in Computer Science
                from Northwestern University. Prior to joining python, Kobar was
                an Associate Professor of Computer Science at Drew University
                and a consultant to firms in the financial and media industries
                on a variety of information and data management projects.{" "}
              </Typography>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <GitHubIcon className={classes.giticon} />
                <Typography className={classes.github}>
                  github.com/kobars
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={9} xs={12}>
              <div className={classes.divTableInPage}>
                <TableContainer>
                  <Table className={classes.tables}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">
                          What will you learn?
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <StyledTableCell>
                          Welcome to the LearnPython.org interactive Python
                          tutorial. Whether you are an experienced programmer or
                          not, this website is intended for everyone who wishes
                          to learn the Python programming language.You are
                          welcome to join our group on Facebook for questions,
                          discussions and updates. Just click on the chapter you
                          wish to begin from, and follow the instructions. Good
                          luck!
                        </StyledTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table className={classes.tables}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">
                          Course Rules
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <StyledTableCell>
                          <div className={classes.listItem2}>
                            {/* maping rules nanti mulai dari sini */}
                            <ModuleDetailIsiTabel />
                          </div>
                        </StyledTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table className={classes.tables}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">
                          Subjek in Module
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          System Requirements
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <StyledTableCell>
                          {/* maping subjek nanti mulai dari sini */}
                          <ModuleDetailIsiTabel />
                        </StyledTableCell>
                        <StyledTableCell>
                          {/* maping requirement nanti mulai dari sini */}
                          <ModuleDetailIsiTabel />
                        </StyledTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          </Grid>
          <SubFooter />
        </div>

        <Footer />
      </main>
    </React.Fragment>
  );
}
