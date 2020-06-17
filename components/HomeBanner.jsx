import React from 'react';
import Link from '../utils/Link'
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    bannerBox: {
        backgroundColor: '#F4F7FC',
        // justifyContent: 'center',
        // display: 'flex',
        // alignItems: 'center',
        // height: '100vh',
        // position: 'relative'
    },
    leftBanner: {
        height: '100vh',
        alignItems: 'center',
        display: 'flex'
    },
    rightBanner: {
        height: '100vh',
        alignItems: 'center',
        display: 'flex'
    },
    ornament: {
        height: '50vh',
        // paddingTop: '20px',
        [theme.breakpoints.down("sm")]: {
            paddingTop: '25px',
        },
    },
    // bannerTitle: {
    //     position: 'absolute',
    //     color: theme.palette.secondary.secondary,
    //     fontSize: `calc(1rem + 1.5vw)`,
    //     padding: theme.spacing(3),
    //     fontFamily: 'Bellota, cursive',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // title: {
    //     fontFamily: 'Muli, sans-serif',
    //     fontWeight: 700,
    //     textAlign: 'center'
    // },
    // bannerButton: {
    //     marginTop: theme.spacing(2),
    //     width: '100%',
    //     height: theme.spacing(6),
    //     borderRadius: theme.spacing(10),
    //     borderColor: theme.palette.secondary.main,
    //     backgroundColor: theme.palette.secondary.main,
    //     color: theme.palette.common.white,
    //     [theme.breakpoints.up("lg")]: {
    //         width: '130%',
    //     },
    //     '&:hover': {
    //         backgroundColor: theme.palette.common.white,
    //         color: theme.palette.secondary.main,
    //         borderColor: theme.palette.secondary.main,
    //     }
    // },
    // bannerImage: {
    //     display: 'block',
    //     boxSizing: 'border-box',
    //     width: '100%',
    //     height: '500px',
    //     objectFit: 'cover',
    //     [theme.breakpoints.down("sm")]: {
    //         height: 'auto',
    //         minHeight: '63vh'
    //     },
    // },
    // link: {
    //     width: '20%',
    //     textDecoration: 'none',
    //     [theme.breakpoints.down("sm")]: {
    //         width: 'auto'
    //     },
    // },
}));

export default function HomeBanner () {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Box width={'100%'} padding={0} className={classes.bannerBox}>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={6} className={classes.leftBanner}>
                        <img className={classes.ornament} src="/images/ornament_batik.png" alt="Ornament"/>
                        <div>
                            <Typography> What is Alterra Academy? </Typography>
                            <Typography> Alterra Academy is a tech talent incubator that gives everyone (even non-IT background) a chance to be a professional Tech Talent. </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={6} className={classes.rightBanner}>
                        sdsdsd
                    </Grid>
                </Grid>
                {/*<img className={classes.ornament} src="/images/ornament_batik.png" alt="Ornament"/>*/}
                {/*<div className={classes.bannerTitle}>*/}
                {/*    <Typography variant={'h4'} className={classes.title}>Alta Online Learning</Typography>*/}
                {/*    /!*<Link href={"/about"} className={classes.link}>*!/*/}
                {/*    /!*    <Button className={classes.bannerButton}*!/*/}
                {/*    /!*            variant="outlined"*!/*/}
                {/*    /!*            startIcon={<SearchIcon/>}*!/*/}
                {/*    /!*    >*!/*/}
                {/*    /!*        BROWSE*!/*/}
                {/*    /!*    </Button>*!/*/}
                {/*    /!*</Link>*!/*/}
                {/*</div>*/}
            </Box>
        </React.Fragment>
    )
}