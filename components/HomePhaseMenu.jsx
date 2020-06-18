import React from 'react';
import CardActions from "@material-ui/core/CardActions";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {Done} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import LockIcon from '@material-ui/icons/Lock';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        [theme.breakpoints.up("lg")]: {
            display: 'flex'
        },
        fontFamily: 'Muli, sans-serif'
    },
    card: {
        maxWidth: 300,
        minWidth: 300,
        margin: theme.spacing(3),
    },
    title: {
        textAlign: 'center',
        fontSize: `calc(1rem + 0.5vw)`,
        padding: theme.spacing(1),
        fontFamily: 'Muli, sans-serif',
        color: theme.palette.secondary.secondary
    },
    action: {
        justifyContent: 'center',
        alignItems: "center",
        padding: theme.spacing(1)
    },
    button: {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        padding: '5px 20px',
        textTransform: 'none',
        borderRadius: theme.spacing(1),
        minWidth: theme.spacing(12),
        '&:hover' : {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            borderColor: theme.palette.secondary.main,
        }
    },
    button2: {
        backgroundColor: theme.palette.secondary.secondary,
        borderColor: theme.palette.secondary.secondary,
        color: theme.palette.common.white,
        padding: '5px 20px',
        textTransform: 'none',
        borderRadius: theme.spacing(1),
        minWidth: theme.spacing(12),
        '&:hover' : {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.secondary,
            textDecoration: 'none',
            borderColor: theme.palette.secondary.secondary,
        }
    },
    content: {
        backgroundColor: '#c0e5e5',
        minHeight: 300,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    content2: {
        backgroundColor: '#DFE6ED',
        minHeight: 300,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }

}))

const CustomCard = ({ classes, title, status}) => {
    return (
        <Card className={classes.card}>
            <Typography className={classes.title}> {title} </Typography>
            <CardContent className={classes.content}>
                {status?
                    <AssignmentTurnedInIcon style={{fontSize: '40px'}}/>:
                    <PlayCircleFilledWhiteIcon style={{fontSize: '40px'}}/>
                }
            </CardContent>
            <CardActions className={classes.action}>
                {status ?
                    <Button size="small" variant={'outlined'} className={classes.button}
                            endIcon={<Done/>}
                            >
                        Done
                    </Button>
                    :
                    <Button size="small" variant={'outlined'} className={classes.button2}
                            startIcon={<PlayCircleOutlineIcon/>}>
                        Start
                    </Button>
                }
            </CardActions>
        </Card>
    );
};

export default function HomePhaseMenu () {
    const classes = useStyles();

    return(
        <React.Fragment>
            <Grid container className={classes.root}>
                {[1,2].map((item, index) => (
                    <Grid key={index} item xs={12} lg={3}>
                        <CustomCard
                            classes={classes}
                            title={'Phase ' + (index + 1)}
                            status={!index}
                        />
                    </Grid>
                ))}
                    <Grid item xs={12} lg={3}>
                        <Card className={classes.card}>
                            <Typography className={classes.title}> {'Phase 3'} </Typography>
                            <CardContent className={classes.content2}>
                                <LockIcon style={{fontSize: '40px'}}/>
                            </CardContent>
                            <CardActions className={classes.action}>
                                <Button size="small" className={classes.button}
                                        variant={'outlined'}
                                        disabled
                                        style={{backgroundColor: '#788896', color: '#fff'}}
                                        >
                                    Offline Class
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
            </Grid>
        </React.Fragment>
    )
}