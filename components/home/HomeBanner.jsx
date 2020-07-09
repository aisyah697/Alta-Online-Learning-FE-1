import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import {useCookies} from "react-cookie";
import AdminContext from "../../store/adminContext";

const Link = dynamic(() => import('../../utils/link'))

const useStyles = makeStyles((theme) => ({
    bannerBox: {
        backgroundColor: '#F4F7FC',
    },
    leftBanner: {
        height: '100vh',
        alignItems: 'center',
        display: 'flex',
        position: 'relative',
    },
    rightBanner: {
        height: '100vh',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        },
    },
    ornament: {
        height: '50vh',
        [theme.breakpoints.down("sm")]: {
            paddingTop: '25px',
        },
        position: 'absolute'
    },
    leftText: {
        padding: theme.spacing(5),
        fontFamily: 'Muli, sans-serif',
        color: theme.palette.secondary.secondary,
        [theme.breakpoints.up("lg")]: {
            paddingLeft: theme.spacing(17),
            paddingRight: theme.spacing(15)
        },
        zIndex: 1
    },
    bannerImage: {
        width: theme.spacing(50)
    },
    bannerTitle: {
        fontSize: `calc(2rem + 0.5vw)`
    },
    bannerImageSmall: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            width: theme.spacing(30),
            paddingLeft: theme.spacing(5)
        }
    },
    button : {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        padding: '7px 20px',
        marginTop: theme.spacing(3),
        textTransform: 'none',
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

const HomeBanner = ({phase, register}) => {
    const classes = useStyles();
    const [cookies, setCookies] = useCookies();
    const [history, setHistory] = React.useState('');

    const {load_} = useContext(AdminContext);
    const [load, setLoad] = load_

    React.useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + "/historyaltatest";
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
                    setHistory(response.data);
                }
            } catch (error) {
                throw error;
            }
        };
        if (cookies.registered === true){
            fetchData();
        }
    }, [load]);

    return (
        <div>
            <Box width={'100%'} padding={0} className={classes.bannerBox}>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={6} className={classes.leftBanner}>
                        <img className={classes.ornament} src={"/images/ornament_batik.png"} alt="Ornament"/>
                        <div className={classes.leftText}>
                            <img className={classes.bannerImageSmall} src={"/images/banner_image_1.png"} alt="Banner"/>
                            <Typography className={classes.bannerTitle} style={{fontWeight: 'bold'}}> What is Alta </Typography>
                            <Typography className={classes.bannerTitle} style={{fontWeight: 'bold'}}> Online Learning? </Typography>
                            <Typography> Alterra Online Learning is a online tech talent learning that gives everyone (even non-IT background) a chance to be a professional Tech Talent. </Typography>
                            <React.Fragment>
                                {phase != "undefined" && phase != null && phase.length != null && phase.length > 0 ?
                                    (history ?
                                        (history.score !== 0? (
                                            <Link href={'/courses/phase/[id]'} as={`/courses/phase/1`}>
                                                <Button variant={'outlined'} className={classes.button}>
                                                    View Course
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Link href={'/altatest'}>
                                                <Button variant={'outlined'} className={classes.button}>
                                                    Take Altatest
                                                </Button>
                                            </Link>
                                        ))
                                        :
                                        (
                                            <Link href={'/altatest'}>
                                                <Button variant={'outlined'} className={classes.button}>
                                                    Take Altatest
                                                </Button>
                                            </Link>
                                        ))
                                    :
                                    <Button onClick={() => register()} variant={'outlined'} className={classes.button}>
                                        Register
                                    </Button>

                                }
                            </React.Fragment>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={6} className={classes.rightBanner}>
                        <img className={classes.bannerImage} src={"/images/banner_image_1.png"} alt="Banner"/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default HomeBanner;