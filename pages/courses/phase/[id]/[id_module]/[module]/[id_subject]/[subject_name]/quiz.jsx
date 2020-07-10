import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../../../../../../../../components/NavigationBar";
import QuizContent from "../../../../../../../../components/QuizContent";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../../../../../../../../components/Loading";
import Typography from "@material-ui/core/Typography";
import SubjectDrawer from "../../../../../../../../components/subject/SubjectDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "30px 24px",
  },
  allText: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
    fontWeight: "bolder",
    fontSize: `calc(1em + 0.5vw)`,
    textAlign: "center",
  },
  score: {
    color: theme.palette.secondary.main,
    fontFamily: "Muli, sans-serif",
    fontWeight: "bolder",
    fontSize: `calc(2.5em + 2.5vw)`,
    textAlign: "center",
  },
  done: {
    marginLeft: theme.spacing(30),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
  },
  drawer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
export default function Quiz() {
  const classes = useStyles();
  const router = useRouter();
  const { id_subject } = router.query;
  const [loading, setLoading] = React.useState(true);
  const [exam, setExam] = React.useState();
  const [cookies] = useCookies();

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historysubject/mentee";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.mentee.token,
          },
        });
        if (response.status === 200) {
          setExam(
            response.data.filter(
              (item) => item.subject_id === parseInt(id_subject)
            )
          );
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    if (id_subject) {
      fetchData();
    }
  }, [id_subject]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>Exam | Alta Online Learning</title>
        </Head>
        <div className={classes.root}>
          <CssBaseline />
          <NavigationBar className={classes.appBar} />

          {exam[0].is_complete ? (
            <div>
              <div className={classes.done}>
                <Typography className={classes.allText}>
                  Your exam in this subject is already done!
                </Typography>
                <Typography className={classes.allText}>
                  Your score :
                </Typography>
                <Typography className={classes.score}>
                  {exam[0].score}
                </Typography>
              </div>
              <div className={classes.drawer}>
                <SubjectDrawer />
              </div>
            </div>
          ) : exam ? (
            exam[0].exam[0] ? (
              exam[0].exam[0].type_exam === "quiz" ? (
                <div>
                  <QuizContent
                    examID={exam[0].exam[0].id}
                    quiz={exam[0].exam[0].quiz[0]}
                  />
                </div>
              ) : null
            ) : null
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
