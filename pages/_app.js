import React, { useState } from "react";
import theme from "../utils/theme";
import PropTypes from "prop-types";
import Router from "next/router";
import Head from "next/head";
import "../public/index.css";
import { CookiesProvider, useCookies } from "react-cookie";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import UserContext from "../store/userContext";
import AdminContext from "../store/adminContext";
import MateriContext from "../store/materiContext";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [cookies, setCookies, removeCookie] = useCookies();

  //Mentee
  const [loginMentee, setLoginMentee] = useState([]);
  const [tokenMentee, setTokenMentee] = useState([]);
  const [mentee, setMentee] = useState([]);

  const store_mentee = {
    login_: [loginMentee, setLoginMentee],
    token_: [tokenMentee, setTokenMentee],
    mentee_: [mentee, setMentee],
  };

  React.useEffect(() => {
    const token_mentee = cookies.token_mentee;
    if (token_mentee) {
      setLoginMentee(true);
      setTokenMentee(token_mentee);
    } else {
      setLoginMentee(false);
    }

    const data_mentee = cookies.mentee;
    if (data_mentee) {
      setMentee(data_mentee);
    } else {
      setMentee(data_mentee);
    }
  }, []);

  //Admin
  const [login, setLogin] = useState([]);
  const [token, setToken] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [list, setList] = useState([]);
  const [listMentee, setListMentee] = useState([]);
  const [load, setLoad] = useState(false);

  const store_admin = {
    login_: [login, setLogin],
    token_: [token, setToken],
    admin_: [admin, setAdmin],
    list_: [list, setList],
    listMentee_: [listMentee, setListMentee],
    load_: [load, setLoad],
  };

  React.useEffect(() => {
    const token_admin = cookies.token_admin;
    if (token_admin) {
      setLogin(true);
      setToken(token_admin);
    } else {
      setLogin(false);
    }

    const data_admin = cookies.admin;
    if (data_admin) {
      setAdmin(data_admin);
    } else {
      setAdmin(data_admin);
    }
  }, []);

  //Materi
  const [test, setTest] = useState([]);

  const store_materi = {
    test_: [test, setTest],
  };

  //Material UI
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Alta Online Learning</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AdminContext.Provider value={store_admin}>
          <UserContext.Provider value={store_mentee}>
            <MateriContext.Provider value={store_materi}>
              <CookiesProvider>
                <Component {...pageProps} />
              </CookiesProvider>
            </MateriContext.Provider>
          </UserContext.Provider>
        </AdminContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
