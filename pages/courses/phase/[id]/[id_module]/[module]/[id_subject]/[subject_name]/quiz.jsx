import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../../../../../../../../components/NavigationBar";
import SubjectDrawer from "../../../../../../../../components/subject/SubjectDrawer";
import QuizContent from "../../../../../../../../components/QuizContent";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../../../../../../../../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "30px 24px",
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
            Authorization: "Bearer " + cookies.token_mentee,
          },
        });
        if (response.status === 200) {
          setExam(
            response.data.filter(
              (item) => item.subject_id === parseInt(id_subject)
            )
          );
          setLoading(true);
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
    const quiz = exam[0].exam[0].quiz[0];
    return (
      <React.Fragment>
        <Head>
          <title>Exam | Alta Online Learning</title>
        </Head>
        <div className={classes.root}>
          <CssBaseline />
          <NavigationBar className={classes.appBar} />
          {/* <SubjectDrawer /> */}
          {exam[0].exam[0].type_exam === "quiz" ? (
            <div>
              <QuizContent quiz={quiz} />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
