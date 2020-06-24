import React from "react";
import Head from "next/head";
import dynamic from 'next/dynamic'

const NavigationBar = dynamic(() => import('../components/NavigationBar'))
const HomePhaseMenu = dynamic(() => import('../components/home/HomePhaseMenu'))
const HomeTestimony = dynamic(() => import('../components/home/HomeTestimony'))
const HomeBanner = dynamic(() => import('../components/home/HomeBanner'))
const FrequentQuestion = dynamic(() => import('../components/home/HomeFAQ'))
const SubFooter = dynamic(() => import('../components/SubFooter'))
const Footer = dynamic(() => import('../components/FooterBar'))

const Home = () => {
    return (
        <div>
            <Head>
                <title>Home | Alta Online Learning</title>
            </Head>
            <main>
                <NavigationBar/>
                <HomeBanner/>
                <HomePhaseMenu/>
                <HomeTestimony/>
                <FrequentQuestion/>
                <SubFooter/>
                <Footer/>
            </main>
        </div>
    )
}

export default Home;
