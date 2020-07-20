import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { CookiesProvider, useCookies } from "react-cookie";

// import style
import "../public/index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";

// import context
import UserContext from "../store/userContext";
import AdminContext from "../store/adminContext";
import MateriContext from "../store/materiContext";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [cookies] = useCookies();

  // Mentee
  const [loginMentee, setLoginMentee] = React.useState([]);
  const [tokenMentee, setTokenMentee] = React.useState([]);
  const [mentee, setMentee] = React.useState([]);
  const [regist, setRegist] = React.useState(false);

  // create mentees store
  const storeMentee = {
    login_: [loginMentee, setLoginMentee],
    token_: [tokenMentee, setTokenMentee],
    mentee_: [mentee, setMentee],
    register_: [regist, setRegist],
  };

  React.useEffect(() => {
    const { tokenMentees } = cookies;
    if (tokenMentees) {
      setLoginMentee(true);
      setTokenMentee(tokenMentees);
    } else {
      setLoginMentee(false);
    }

    // set mentees data
    const dataMentee = cookies.mentee;
    if (dataMentee) {
      setMentee(dataMentee);
    } else {
      setMentee(dataMentee);
    }

    const reg = cookies.registered;
    if (reg) {
      setRegist(true);
    } else {
      setRegist(false);
    }
  }, []);

  // Admin
  const [login, setLogin] = React.useState([]);
  const [token, setToken] = React.useState([]);
  const [admin, setAdmin] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [listMentee, setListMentee] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);

  // create admin store
  const storeAdmin = {
    login_: [login, setLogin],
    token_: [token, setToken],
    admin_: [admin, setAdmin],
    list_: [list, setList],
    listMentee_: [listMentee, setListMentee],
    load_: [load, setLoad],
    trigger_: [trigger, setTrigger],
  };

  React.useEffect(() => {
    const { tokenAdmin } = cookies;
    if (tokenAdmin) {
      setLogin(true);
      setToken(tokenAdmin);
    } else {
      setLogin(false);
    }

    // set admin data
    const dataAdmin = cookies.admin;
    if (dataAdmin) {
      setAdmin(dataAdmin);
    } else {
      setAdmin(dataAdmin);
    }
  }, []);

  // Materi
  const [test, setTest] = React.useState([]);

  // create materi store
  const storeMateri = {
    test_: [test, setTest],
  };

  // Material UI
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Head>
        <title> Alta Online Learning </title>
        {" "}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {" "}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AdminContext.Provider value={storeAdmin}>
          <UserContext.Provider value={storeMentee}>
            <MateriContext.Provider value={storeMateri}>
              <CookiesProvider>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
                {" "}
              </CookiesProvider>
              {" "}
            </MateriContext.Provider>
            {" "}
          </UserContext.Provider>
          {" "}
        </AdminContext.Provider>
        {" "}
      </ThemeProvider>
      {" "}
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};
