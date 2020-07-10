import React, { useContext } from 'react';
import dynamic from "next/dynamic";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../store/userContext";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {useCookies} from "react-cookie";
import axios from "axios";

const Link = dynamic(() => import('../utils/link'))

const useStyles = makeStyles((theme) => ({
    bannerBox: {
        fontFamily: 'Muli, sans-serif'
    },
    container: {
        minHeight: '30vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: theme.palette.secondary.secondary,
        fontSize: `calc(1rem + 1vw)`
    },
    button : {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        padding: '7px 20px',
        textTransform: 'none',
        marginTop: theme.spacing(2),
        borderRadius: theme.spacing(10),
        minWidth: theme.spacing(12),
        '&:hover' : {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            borderColor: theme.palette.secondary.main,
        }
    },
}));

const SubFooter = () => {
    const classes = useStyles();
    const [cookies] = useCookies("");

    const {register_, phase_, module_, subject_} = useContext(UserContext);
    const [regist, setRegist] = register_

    const [phase, setPhase] = React.useState();
    const [subject, setSubject] = React.useState();
    const [modules, setModule] = React.useState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + `/historysubject/mentee`;
        const fetchData = async function () {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + cookies.token_mentee,
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
        if (cookies.registered === "true") {
            fetchData();
        }
    }, []);

    React.useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + `/historymodule/mentee`;
        const fetchData = async function () {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + cookies.token_mentee,
                    },
                });
                if (response.status === 200) {
                    setModule(response.data);
                }
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        };
        if (cookies.registered === "true") {
            fetchData();
        }
    }, []);

    React.useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + "/historyphase/mentee";
        const fetchData = async function () {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + cookies.token_mentee,
                    },
                });
                if (response.status === 200) {
                    setPhase(response.data);
                }
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        };
        if (cookies.registered === "true") {
            fetchData();
        }
    }, []);

    if (phase) {
        const lastArray = phase.filter(phase => phase.lock_key == true);
        var lastPhase = lastArray[lastArray.length - 1];
    }
    if (subject) {
        const lastArr = subject.filter(res => res.is_complete == false);
        var lastSubject = lastArr[0];
    }
    if (modules) {
        const lasyArs = modules.filter(mod => mod.lock_key == true);
        var lastModule = lasyArs[lasyArs.length - 1];
    }

    return (
        <div>
            <Box width={'100%'} padding={0} className={classes.bannerBox}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className={classes.container}>
                        {cookies.registered === "true" ? (
                            cookies.altatest === "true" ? (
                                <>
                                    <Typography variant={'h5'} className={classes.title}>
                                        You can now access the course!
                                    </Typography>
                                    <Link href={'/courses/phase/[id]/[id_module]/[module]/subject'}
                                          as={`/courses/phase/${lastPhase? lastPhase.phase_id : null}/${lastSubject? lastSubject.subject.module_id : 'empty'}/${lastModule? lastModule.module.name.split(" ").join("-") : null}/subject`}>
                                        <Button variant={'outlined'} className={classes.button}>
                                            View Course
                                        </Button>
                                    </Link> </>
                            ):(
                                <>
                                    <Typography variant={'h5'} className={classes.title}>
                                        Take Altatest to enter the course!
                                    </Typography>
                                    <Link href={'/altatest'}>
                                        <Button variant={'outlined'} className={classes.button}>
                                            Take Altatest
                                        </Button>
                                    </Link> </>
                            )
                        ) : <>
                            <Typography variant={'h5'} className={classes.title}>
                                Register the course now!
                            </Typography>
                            <Link href={'/'}>
                                <Button variant={'outlined'} className={classes.button}>
                                    Register
                                </Button>
                            </Link> </>
                        }
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default SubFooter;