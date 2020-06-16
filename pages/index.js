import React from "react";
import Head from 'next/head'
import NavigationBar from "../components/NavigationBar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import HomeBanner from "../components/HomeBanner";

class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Home | Alta Online Learning</title>
                </Head>

                <main>
                    <NavigationBar/>

                    <HomeBanner/>

                </main>
            </React.Fragment>
        )
    }
}


export default Home;
