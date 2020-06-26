import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CookiesProvider, Cookies, useCookies } from 'react-cookie';
import Router from 'next/router'
import UserContext from '../store/userContext';
import theme from '../utils/theme';
import '../public/index.css'
const cookies = new Cookies();

export default function MyApp(props) {
    const { Component, pageProps } = props
    const url = process.env.NEXT_PUBLIC_BASE_URL

    //isLogin
    const[isLogin, setIsLogin] = React.useState(null)
    const[cookies, setCookies, removeCookie] = useCookies(['token'])
    const[user, setUser] = React.useState(cookies.user)

    React.useEffect(() => {
        const token = cookies.token
        setUser(cookies.user);
        if (token){
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    },[])

    const signIn = async (username, password) => {
        const signInUrl = url + '/auth/mentee'
        try {
            const response = await fetch(signInUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, password: password })
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setIsLogin(true);
                setCookies('token', data.token);
                setCookies('user', data)
                Router.replace('/')
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                return Promise.reject(error);
            }
        } catch (error) {
            console.error("Please Try Again!", error);
            throw new Error(error);
        }
    }

    const signOut = () => {
        setIsLogin(false);
        removeCookie('token');
        removeCookie('user');
        Router.push('/login');
    };

    //Material-UI
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Alta Online Learning</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <UserContext.Provider value={{user: user, login: isLogin, signIn: signIn, signOut: signOut}}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kick start an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <CookiesProvider>
                        <Component {...pageProps} />
                    </CookiesProvider>
                </ThemeProvider>
            </UserContext.Provider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};