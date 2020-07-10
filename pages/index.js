import React, {useContext} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminContext from "../store/adminContext";

const NavigationBar = dynamic(() => import("../components/NavigationBar"));
const HomePhaseMenu = dynamic(() => import("../components/home/HomePhaseMenu"));
const HomeTestimony = dynamic(() => import("../components/home/HomeTestimony"));
const HomeBanner = dynamic(() => import("../components/home/HomeBanner"));
const FrequentQuestion = dynamic(() => import("../components/home/HomeFAQ"));
const SubFooter = dynamic(() => import("../components/SubFooter"));
const Footer = dynamic(() => import("../components/FooterBar"));

const Home = () => {
    const [cookies, setCookies] = useCookies();
    
    const [phase, setPhase] = React.useState();

    const {load_} = useContext(AdminContext);
    const [load, setLoad] = load_
    
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
        if (cookies.token_mentee){
            fetchData();
        }
    }, [load]);

    const RegisterHistory = async () => {
        const token = cookies.token_mentee;

        const UrlPhase = process.env.NEXT_PUBLIC_BASE_URL + "/historyphase/mentee";
        const UrlModule = process.env.NEXT_PUBLIC_BASE_URL + "/historymodule/mentee";
        const UrlSubject = process.env.NEXT_PUBLIC_BASE_URL + "/historysubject/mentee";
        const UrlAltatest = process.env.NEXT_PUBLIC_BASE_URL + "/historyaltatest";

        try {
            const responsePhase = await axios.post(UrlPhase, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
            });

            if (responsePhase.status === 200) {
                try {
                    const responseModule = await axios.post(UrlModule, {}, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token,
                        },
                    });

                    if (responseModule.status === 200) {
                        try {
                            const responseSubject = await axios.post(UrlSubject, {}, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + token,
                                },
                            });

                            if (responseSubject.status === 200) {
                                try {
                                    const responseAltatest = await axios.post(UrlAltatest, {}, {
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": "Bearer " + token,
                                        },
                                    });

                                    if (responseAltatest) {
                                        setLoad(true);
                                    }

                                } catch (e) {
                                    console.log("Error Register Exam", e)
                                }
                            }

                        } catch (e) {
                            console.log("Error Register Subject", e)
                        }
                    }

                } catch (e) {
                    console.log("Error Register Module", e)
                }
            }

        } catch (e) {
            console.log("Error Register Phase", e)
        } finally {
            setLoad(false);
        }
    }

    return (
        <div>
            <Head>
                <title>Home | Alta Online Learning</title>
            </Head>

            <main>
                <NavigationBar/>
                <HomeBanner phase={phase} register={() => RegisterHistory()}/>
                { phase != "undefined" && phase != null && phase.length != null &&
                    phase.length > 0 ?
                    <HomePhaseMenu phase={phase}/> : <></>
                }
                <HomeTestimony/>
                <FrequentQuestion/>
                <SubFooter/>
                <Footer/>
            </main>
        </div>
    )
}

export default Home;
