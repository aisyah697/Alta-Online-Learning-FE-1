import React, { useState, useContext } from "react";
import axios from "axios";
import Router from "next/router";
import dynamic from "next/dynamic";
import { useCookies } from "react-cookie";
import ErrorPage from "next/error";

// import style
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// import component
const Timer = dynamic(() => import("./Timer"));
const Loading = dynamic(() => import("../Loading"));
const Question = dynamic(() => import("../AtestQuestion"));
const EndAltatest = dynamic(() => import("../EndAltatest"));

// import context
import AdminContext from "../../store/adminContext";
import MateriContext from "../../store/materiContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  content: {
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: theme.spacing(5),
    paddingTop: 0,
    marginBottom: theme.spacing(20),
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    fontWeight: "bolder",
    color: theme.palette.secondary.secondary,
  },
  media: {
    height: theme.spacing(30),
  },
  spacing: {
    flexBasis: "5%",
  },
  perQuest: {
    marginBottom: theme.spacing(3),
  },
  allText: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
  button: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(4),
    fontSize: `calc(0.6em + 0.7vw)`,
    fontFamily: "Muli, sans-serif",
    color: theme.palette.common.white,
    margin: theme.spacing(2, 2, 2, 4),
    marginTop: "-80px",
    minWidth: theme.spacing(25),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  score: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontSize: "10vw",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonInPop: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    minWidth: theme.spacing(12),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  gambar: {
    width: `calc(18em + 17.8vw)`,
    marginTop: "-10px",
  },
  textReady: {
    textAlign: "center",
    fontSize: `calc(0.8em + 0.8vw)`,
    fontWeight: "bolder",
    margin: "-70px 0 100px",
    color: theme.palette.secondary.secondary,
  },
}));

export default function QuizContent() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;

  const { test_ } = useContext(MateriContext);
  const [test, setTest] = test_;

  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(true);

  const redirectToProgress = () => {
    setCookies("altatest", true);
    Router.push("/");
  };

  const changeStatusTest = async (status) => {
    // eslint-disable-next-line no-undef
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historyaltatest";
    const auth = cookies.mentee.token;
    const MyJOSN = JSON.stringify({
      time_start: Date.now(),
      is_complete: status,
    });

    try {
      const response = await axios.patch(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    } finally {
      setLoad(false);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    const urlTest = process.env.NEXT_PUBLIC_BASE_URL + "/historyaltatest";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(urlTest, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.mentee.token,
          },
        });
        if (response.status === 200) {
          if (response.data.is_complete === "end") {
            setOpen(true);
          }
          setTest(response.data);
        }
        // eslint-disable-next-line no-useless-catch
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [load]);

  if (!test) {
    return <ErrorPage statusCode={404} />;
  } else {
    return (
      <main className={classes.content}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Toolbar />
            <Typography variant="h4" className={classes.title}>
              Alta Test
            </Typography>
            {test.is_complete === null ? (
              <div>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <img
                    alt="test"
                    className={classes.gambar}
                    src={"/images/test.jpg"}
                  />
                  <Typography className={classes.textReady}>
                    Are you ready for the Alta Test?
                  </Typography>
                  <Button
                    onClick={() => changeStatusTest("start")}
                    variant="outlined"
                    className={classes.button}
                  >
                    Start
                  </Button>
                </Grid>
              </div>
            ) : (
              <div>
                <div className={classes.sticky}>
                  <EndAltatest
                    endTest={(status) => changeStatusTest(status)}
                    score={test.score}
                    statusTest={test.is_complete}
                  />
                </div>

                {test.is_complete === "end" ? null : (
                  <div>
                    {test.altatest ? (
                      <div>
                        {test.altatest.question.map((item, idx) => (
                          <Question
                            key={idx}
                            no={idx}
                            id={test.id}
                            question={item}
                          />
                        ))}
                      </div>
                    ) : (
                      <Loading />
                    )}
                  </div>
                )}
              </div>
            )}
            <Dialog
              fullWidth
              maxWidth={"xs"}
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" style={{ color: "#19355f" }}>
                Your Score
              </DialogTitle>
              <DialogContent>
                <Typography className={classes.score}>{test.score}</Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={redirectToProgress}
                  variant="outlined"
                  size="medium"
                  className={classes.buttonInPop}
                >
                  Next
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item xs={1}>
            {test.is_complete === null ? null : (
              <div>
                <Timer
                  endTest={(status) => changeStatusTest(status)}
                  statusTest={test.is_complete}
                  timeStart={test.time_start}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </main>
    );
  }
}
