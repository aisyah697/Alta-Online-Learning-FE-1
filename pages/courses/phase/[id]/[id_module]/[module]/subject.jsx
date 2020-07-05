import React, {useContext} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {useCookies} from "react-cookie";
import UserContext from "../../../../../../store/userContext";
import {useRouter} from "next/router";

const AvailableSubjects = dynamic(() => import('../../../../../../components/module/AvailableSubject'))
const ModuleOverview = dynamic(() => import('../../../../../../components/module/ModuleOverview'))
const NavigationBar = dynamic(() => import('../../../../../../components/NavigationBar'))
const FooterBar = dynamic(() => import('../../../../../../components/FooterBar'))

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(3, 8),
        marginBottom: theme.spacing(20),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2.5, 2),
            fontSize: "14px",
        },
    },
    h1: {
        color: theme.palette.secondary.secondary,
        marginTop: theme.spacing(4),
    },
}));

export default function ModuleDetailOverview() {
    const classes = useStyles();
    const router = useRouter();
    const { id, id_module, module } = router.query;
    const [cookies] = useCookies();

    const [subject, setSubject] = React.useState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + `/historymodule/subject/${id}`;
        const fetchData = async function () {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookies.token_mentee,
                    },
                });
                if (response.status === 200) {
                    setSubject(response.data);
                }
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    console.log(subject)

    return (
        <React.Fragment>
            <Head>
                <title>Module Overview | Alta Online Learning</title>
            </Head>
            <NavigationBar />
            <main className={classes.main}>
                <h1 className={classes.h1}>Course Overview</h1>
                <br/>
                {subject ?
                    subject.filter(mod => mod.module_id == id_module).map((value, index) => (
                <ModuleOverview key={index} module={value} />)) : <p>Loading...</p> }
                <br/>
                <h1 className={classes.h1}>Available Subjects</h1>
                <AvailableSubjects />
            </main>
            <FooterBar />
        </React.Fragment>
    );
}