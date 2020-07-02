import React from "react";
import Head from "next/head";
import dynamic from 'next/dynamic'
import axios from "axios";
import { useCookies } from "react-cookie";

const NavigationBar = dynamic(() => import('../components/NavigationBar'))
const HomePhaseMenu = dynamic(() => import('../components/home/HomePhaseMenu'))
const HomeTestimony = dynamic(() => import('../components/home/HomeTestimony'))
const HomeBanner = dynamic(() => import('../components/home/HomeBanner'))
const FrequentQuestion = dynamic(() => import('../components/home/HomeFAQ'))
const SubFooter = dynamic(() => import('../components/SubFooter'))
const Footer = dynamic(() => import('../components/FooterBar'))

const Home = () => {
    const [cookies] = useCookies()
    
    const [phase, setPhase] = React.useState()
    
    React.useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + "/historyphase/mentee";
        const auth = cookies.token_mentee
        const fetchData = async function () {
            try {
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + auth,
                    },
                });
                if (response.status === 200) {
                    setPhase(response.data);
                }
            } catch (error) {
                throw error;
            }
        };
        fetchData();
    }, []);
    
    console.log('CEK', phase)

    return (
        <div>
            <Head>
                <title>Home | Alta Online Learning</title>
            </Head>
            <main>
                <NavigationBar/>
                <HomeBanner/>
                <HomePhaseMenu phase={phase}/>
                <HomeTestimony/>
                <FrequentQuestion/>
                <SubFooter/>
                <Footer/>
            </main>
        </div>
    )
}

export default Home;
