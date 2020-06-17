import React from 'react';
import CardActions from "@material-ui/core/CardActions";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {Done} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    card: {
        width: 250,
        height: 420,
        margin: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            width: 310,
            height: 510,
        }
    },
    root: {
        marginTop: theme.spacing(3),
        justifyContent: 'center',
        [theme.breakpoints.up("lg")]: {
            display: 'flex'
        }
    },
    action: {
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#6f84e0',
        '&:hover': {
            backgroundColor: '#8c9be0',
            color: '#fff'
        },
        textTransform: 'none',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    content: {
        backgroundColor: '#d7d5d5',
        height: 300
    },
    title: {
        textAlign: 'center',
        fontSize: `calc(0.5rem + 1vw)`
    },
}))

const CustomCard = ({ classes, title, status}) => {
    return (
        <Card className={classes.card}>
            <CardHeader
                title={title}
                className={classes.title}
            />
            <CardContent className={classes.content}>
            </CardContent>
            <CardActions className={classes.action}>
                {status ?
                    <Button size="small" color="primary" className={classes.button}
                            endIcon={<Done/>}
                            style={{backgroundColor: 'orange'}}>
                        Done
                    </Button>
                    :
                    <Button size="small" color="primary" className={classes.button}
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
                            status={true}
                        />
                    </Grid>
                ))}
                    <Grid item xs={12} lg={3}>
                        <CustomCard
                            classes={classes}
                            title={'Phase 3'}
                            status={false}
                        />
                    </Grid>
            </Grid>
        </React.Fragment>
    )
}