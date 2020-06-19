import React from "react";
import Head from "next/head";
import NavigationBar from "../../components/NavigationBar";
import HomeBanner from "../../components/HomeBanner";
import HomePhaseMenu from "../../components/HomePhaseMenu";
import HomeTestimony from "../../components/HomeTestimony";
import FrequentQuestion from "../../components/FAQs";
import SubFooter from "../../components/SubFooter";
import Footer from "../../components/Footer";
import NavigationAdminBar from "../../components/admin/NavigationBarAdmin";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(5),
        paddingTop: theme.spacing(8)
    },
    grow: {
        flexGrow: 1
    },
    header: {
        display: "flex",
        alignItems: "center",
    },
    title: {
        fontFamily: 'Muli, sans-serif',
        fontWeight: 600,
        fontSize: `calc(1rem + 1vw)`,
        color: theme.palette.secondary.secondary
    },
    buttonEdit : {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        padding: '7px 20px',
        textTransform: 'none',
        borderRadius: theme.spacing(10),
        minWidth: theme.spacing(10),
        '&:hover' : {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            borderColor: theme.palette.secondary.main,
        }
    },
    bio: {
        paddingTop: theme.spacing(5)
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        [theme.breakpoints.down('sm')]:{
            width: theme.spacing(15),
            height: theme.spacing(15),
        }
    },
    paper: {
        minHeight: '80vh'
    },
    main: {
        display: "flex"
    },
    text: {
        padding: theme.spacing(5),
        paddingTop: theme.spacing(2)
    },
    divAvatar: {
        width: '100%',
        display: "flex",
        justifyContent: 'center'
    }
}));

export default function ProfileAdmin (){
    const classes = useStyles();
    return(
        <React.Fragment>
            <Head>
                <title>Admin | Profile</title>
            </Head>
            <main>
                <NavigationAdminBar/>
                <Container maxWidth={'lg'} className={classes.container}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} className={classes.header}>
                            <Typography variant={'h6'} className={classes.title}> My Profile</Typography>
                            <div className={classes.grow} />
                            <Button variant={'outlined'} className={classes.buttonEdit}>
                                Edit My Profile
                            </Button>
                        </Grid>
                        <Grid item xs={12} className={classes.bio}>
                            <Paper elevation={1} className={classes.paper}>
                                <div className={classes.divAvatar}>
                                    <Avatar className={classes.avatar}>
                                        A
                                    </Avatar>
                                </div>
                                <div className={classes.main}>
                                    <div className={classes.text}>
                                        <Typography variant={'h4'}>Ahmad Aji</Typography>
                                        <Typography variant={'h6'}> aji_ajay@yahoo.com</Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </main>
        </React.Fragment>
    )
}