import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import HomeBanner from "../components/HomeBanner";
import HomePhaseMenu from "../components/HomePhaseMenu";
import SubFooter from "../components/SubFooter";

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
                    <HomePhaseMenu/>
                    <SubFooter/>
                    <Footer/>
                </main>
            </React.Fragment>
        )
    }
}

export default Home;
