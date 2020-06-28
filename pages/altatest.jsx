import React, { useEffect, useState, useContext, useReducer } from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "../components/NavigationBar";
import AltaTestQuestion from "../components/AltaTestQuestion";
import Footer from "../components/FooterBar";
import MateriContext from "../store/materiContext";
import axios from "axios";
import UserContext from "../store/userContext";
import { CookiesProvider, useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "30px 24px",
  },
}));

export default function AltaTest() {
  const classes = useStyles();

  //Alta Tsst
  const { test_ } = useContext(MateriContext);
  const [test, setTest] = test_;
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("cek cookie", cookies.mentee.token);
    const urlTest = process.env.NEXT_PUBLIC_BASE_URL + "/altatest/11";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(urlTest, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.mentee.token,
          },
        });

        // console.log("cek alta test", response.data);
        if (response.status === 200) {
          setTest(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!test) {
    return <ErrorPage statusCode={404} />;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>Exam | Alta Online Learning</title>
        </Head>
        <div className={classes.root}>
          {console.log("quest11", test)}
          <CssBaseline />
          <NavigationBar className={classes.appBar} />
          <AltaTestQuestion list={test} />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
