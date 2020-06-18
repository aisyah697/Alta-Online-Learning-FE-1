import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import CardActions from "@material-ui/core/CardActions";
import {Done} from "@material-ui/icons";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    bannerBox: {
        fontFamily: 'Muli, sans-serif',
        padding: theme.spacing(10),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        }
    },
    container: {
        minHeight: '30vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    phaseTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginTop: theme.spacing(5),
        fontFamily: 'Muli, sans-serif',
    },
    phaseFont: {
        fontSize: `calc(2em + 0.5vw)`,
        color: theme.palette.secondary.secondary,
        fontWeight: 600
    },
    root: {
        width: '90%',
        padding: theme.spacing(2)
    },
    avatar: {
        width: '100px',
        height: '100px',
        [theme.breakpoints.down('sm')]: {
            width: '60px',
            height: '60px',
        }

    },
    content: {
        display: 'flex'
    },
    text: {
        marginLeft: theme.spacing(5)
    },
    ornament: {
        height: '50vh',
        [theme.breakpoints.down("sm")]: {
            paddingTop: '25px',
        },
        position: 'absolute',
    },
}));

const CustomPaper = ({ classes}) => {
    return (
        <Card elevation={0} className={classes.root}>
            <CardContent className={classes.content}>
                <Avatar className={classes.avatar}> A </Avatar>
                <div className={classes.text}>
                    <Typography>
                        The Kobars
                    </Typography>
                    <Typography>
                        Back-End, Front-End, Deployment
                    </Typography>
                    <hr/>
                    <Typography>
                        Lorem ipsum dolor sit ametime minus nihil nisi perferendis similique? A, assumenda autem culpa cum cumque ex iste mollitia pariatur quae quibusdam quisquam, quod, sequi temporibus veritatis voluptas? Aliquid autem dolores eaque impedit officia reiciendis. Consectetur iusto omnis veritatis. Dolores ex iste placeat vero!
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default function HomeTestimony () {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.phaseTitle}>
                <Typography className={classes.phaseFont}> Meet The Mentors </Typography>
            </div>
            <img className={classes.ornament} src="/images/ornament_batik.png" alt="Ornament"/>
            <Box width={'100%'} padding={0} className={classes.bannerBox}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className={classes.container}>
                        <CustomPaper classes={classes}/>
                        <CustomPaper classes={classes}/>
                        <CustomPaper classes={classes}/>
                        <CustomPaper classes={classes}/>
                        <CustomPaper classes={classes}/>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}