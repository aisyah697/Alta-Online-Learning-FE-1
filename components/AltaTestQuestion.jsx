import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MateriContext from "../store/materiContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "./Loading";
import dynamic from "next/dynamic";
import Timer from "./Timer";
import Button from "@material-ui/core/Button";
import AdminContext from "../store/adminContext";
import Router from "next/router";

// const Scores = dynamic(() => import("./Score"));
const EndAltatest = dynamic(() => import("./EndAltatest"));
const Question = dynamic(() => import("./AtestQuestion"));
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
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
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
    fontSize: `calc(1em + 1vw)`,
    fontFamily: "Muli, sans-serif",
    color: theme.palette.common.white,
    margin: theme.spacing(2, 2, 2, 0),
    minWidth: theme.spacing(35),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
}));

export default function QuizContent(props) {
  const classes = useStyles();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const { test_ } = useContext(MateriContext);
  const [test, setTest] = test_;
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(true);

  const changeStatusTest = async (status) => {
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

  useEffect(() => {
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
            Router.push("/");
          }
          setTest(response.data);
        }
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
        <Toolbar />
        <Typography variant="h4" className={classes.title}>
          Alta Test
        </Typography>
        {test.is_complete === null ? (
          <Button
            onClick={() => changeStatusTest("start")}
            variant="outlined"
            className={classes.button}
          >
            Start
          </Button>
        ) : (
          <div>
            <EndAltatest
              endTest={(status) => changeStatusTest(status)}
              score={test.score}
            />
            <Timer
              endTest={(status) => changeStatusTest(status)}
              statusTest={test.is_complete}
              timeStart={test.time_start}
            />
            {test.altatest ? (
              <div>
                {test.altatest.question.map((item, idx) => (
                  <Question key={idx} no={idx} id={test.id} question={item} />
                ))}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        )}
      </main>
    );
  }
}
