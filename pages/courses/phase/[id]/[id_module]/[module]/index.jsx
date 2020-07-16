import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import GitHubIcon from "@material-ui/icons/GitHub";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const ModuleDetailTable = dynamic(() =>
  import("../../../../../../components/module/ModuleDetailTable")
);
const Loading = dynamic(() => import("../../../../../../components/Loading"));
const NavigationBar = dynamic(() =>
  import("../../../../../../components/NavigationBar")
);
const SubFooter = dynamic(() =>
  import("../../../../../../components/SubFooter")
);
const FooterBar = dynamic(() =>
  import("../../../../../../components/FooterBar")
);

import UserContext from "../../../../../../store/userContext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
  main: {
    minHeight: `calc(80vh - 5px)`,
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
  moduleDescription: {
    fontFamily: "Muli, sans-serif",
    color: "gray",
    fontSize: `calc(0.7em + 0.4vw)`,
    marginBottom: theme.spacing(2),
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
  head: {
    borderTopLeftRadius: theme.spacing(1),
    borderTopRightRadius: theme.spacing(1),
  },
  bottom: {
    borderBottomLeftRadius: theme.spacing(1),
    borderBottomRighttRadius: theme.spacing(1),
  },
  tableBody: {
    borderRadius: theme.spacing(2),
  },
  listItem2: {
    marginLeft: theme.spacing(-3),
  },
  markList: {
    fontSize: "medium",
    color: theme.palette.secondary.main,
    marginRight: "20px",
  },
  breadcrumb: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginLeft: theme.spacing(8)
  },
  link: {
    textDecoration: 'none',
    "&:link": {
      textDecoration: 'none',
    },
    cursor: 'pointer'
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.secondary,
    color: theme.palette.common.white,
    fontSize: `calc(0.6em + 0.5vw)`,
    fontFamily: "Muli, sans-serif",
  },
  body: {
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

const ModuleDetailRequirement = ({ require }) => {
  const classes = useStyles();
  return (
    <ListItem>
      <Grid container direction="row" justify="flex-start">
        <Grid item xs={1} align="right">
          <FiberManualRecordIcon className={classes.markList} />
        </Grid>
        <br />
        {require ? (
          <Grid item xs={11} align="justify">
            {require.description}
          </Grid>
        ) : null}
      </Grid>
    </ListItem>
  );
};

const CourseRule = [
  {
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
];

export default function Detail() {
  const classes = useStyles();
  const router = useRouter();
  const { id, id_module, module } = router.query;

  const [cookies] = useCookies();
  const { mentee_, token_ } = useContext(UserContext);
  const [mentee, setMentee] = mentee_;
  const [tokenMentee, setTokenMentee] = token_;

  const [subject, setSubject] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + `/historymodule/subject/${id}`;
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
          setSubject(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <React.Fragment>
      <Head>
        <title>Detail Module | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        {loading ? (
          <Loading />
        ) : (
            <div>
              <div className={classes.main}>
                {subject
                  ? subject
                    .filter((mod) => mod.module_id == id_module)
                    .map((item, index) => (
                      <div key={index} className={classes.root}>
                        <div className={classes.textPengantar}>
                          <Typography className={classes.judulModule}>
                            Module : {item.module.name}
                          </Typography>
                          <Typography className={classes.keteranganModule}>
                            Introduction of {item.module.name}
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
                            <Link
                              href={
                                "/courses/phase/[id]/[id_module]/[module]/subject"
                              }
                              as={`/courses/phase/${id}/${id_module}/${module}/subject`}
                            >
                              <Button
                                variant="outlined"
                                size="medium"
                                className={classes.button}
                              >
                                Start Course
                              </Button>
                            </Link>
                            <img
                              alt="mentor-avatar"
                              className={classes.avatar}
                              src={item.module.admin.avatar}
                            />
                            <Typography className={classes.mentorName}>
                              Mentor: {item.module.admin.full_name}
                            </Typography>
                            <Typography className={classes.mentorDescribe}>
                              {item.module.admin.description}{" "}
                            </Typography>
                            <Grid
                              container
                              direction="row"
                              justify="flex-start"
                              alignItems="center"
                            >
                              <GitHubIcon className={classes.giticon} />
                              <Typography className={classes.github}>
                                {item.module.admin.github}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item md={9} xs={12}>
                            <div className={classes.divTableInPage}>
                              <TableContainer>
                                <Table className={classes.tables}>
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell
                                        align="left"
                                        className={classes.head}
                                      >
                                        What will you learn?
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <StyledTableCell
                                        className={classes.bottom}
                                      >
                                        {item.module.description}
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                                <Table className={classes.tables}>
                                  <TableHead style={{ borderRadius: "8px" }}>
                                    <TableRow>
                                      <StyledTableCell
                                        align="left"
                                        className={classes.head}
                                      >
                                        Course Rules
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <StyledTableCell
                                        className={classes.bottom}
                                      >
                                        <div className={classes.listItem2}>
                                          {CourseRule.map((content, idx) => (
                                            <ModuleDetailRequirement
                                              key={idx}
                                              require={content}
                                            />
                                          ))}
                                        </div>
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                                <Table className={classes.tables}>
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell
                                        align="left"
                                        className={classes.head}
                                      >
                                        Subject in Module
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <StyledTableCell
                                        className={classes.bottom}
                                      >
                                        {/* maping subjek nanti mulai dari sini */}
                                        {item.subject.map((value, index) => (
                                          <ModuleDetailTable
                                            key={index}
                                            subject={value}
                                          />
                                        ))}
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                                <Table className={classes.tables}>
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell
                                        align="left"
                                        className={classes.head}
                                      >
                                        System Requirements
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <StyledTableCell
                                        className={classes.bottom}
                                      >
                                        {/* maping requirement nanti mulai dari sini */}
                                        {item.requirement.map(
                                          (require, idx) => (
                                            <ModuleDetailRequirement
                                              key={idx}
                                              require={require}
                                            />
                                          )
                                        )}
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
                    ))
                  : null}
              </div>
              <FooterBar />
            </div>
          )}
      </main>
    </React.Fragment>
  );
}
