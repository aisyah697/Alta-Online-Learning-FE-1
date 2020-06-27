import React from 'react';
import theme from '../utils/theme';
import PropTypes from 'prop-types';
import Router from 'next/router'
import Head from 'next/head';
import '../public/index.css'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { CookiesProvider, Cookies, useCookies } from 'react-cookie';
import UserContext from '../store/userContext';
import AdminContext from "../store/adminContext";
import AdminStoreContext from '../store/AdminContext'

const url = process.env.NEXT_PUBLIC_BASE_URL
const cookies = new Cookies();

export default function MyApp(props) {
    const { Component, pageProps } = props

    const[cookies, setCookies, removeCookie] = useCookies()
    const[isLogin, setIsLogin] = React.useState(null)
    const[user, setUser] = React.useState(cookies.user)

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        
        // IsLogin
        const token = cookies.token;
        if (token){
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    },[])

    const signIn = async (username, password) => {
        const signInUrl = url + '/auth/mentee';
        try {
            const response = await fetch(signInUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setCookies('user', data);
                setCookies('token', data.token);
                setIsLogin(true);
                Router.replace('/');
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                return Promise.reject(error);
            }
        } catch (error) {
            console.error("Something Wrong, Please Try Again!", error);
            throw new Error(error);
        }
    }

    const signOut = async () => {
        setIsLogin(false);
        Router.push('/login');
        removeCookie('token');
        removeCookie('user');
    };

    //Admin
    const[admin, setAdmin] = React.useState(cookies.admin)
    const[listAdmin, setListAdmin] = React.useState('')

    return (
        <React.Fragment>
            <Head>
                <title>Alta Online Learning</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kick start an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <AdminStoreContext>
                        <AdminContext.Provider value={{listAdmin: listAdmin, setListAdmin: setListAdmin, admin: admin, setAdmin: setAdmin, isLogin: isLogin, setIsLogin: setIsLogin}}>
                            <UserContext.Provider value={{user: user, setUser:setUser, login: isLogin, signIn: signIn, signOut: signOut}}>
                                <CookiesProvider>
                                    <Component {...pageProps} />
                                </CookiesProvider>
                            </UserContext.Provider>
                        </AdminContext.Provider>
                    </AdminStoreContext>
                </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};