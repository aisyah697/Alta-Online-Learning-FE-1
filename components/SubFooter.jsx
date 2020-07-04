import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import dynamic from "next/dynamic";
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

const SubFooter = ({phase}) => {
    const classes = useStyles();

    return (
        <div>
            <Box width={'100%'} padding={0} className={classes.bannerBox}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className={classes.container}>
                        <Typography variant={'h5'} className={classes.title}>
                            You can now access the course!
                        </Typography>
                        {phase != "undefined" && phase != null && phase.length != null && phase.length > 0 ?
                            <Link href={'/courses/phase/[id]'} as={`/courses/phase/1`}>
                                <Button variant={'outlined'} className={classes.button}>
                                    View Course
                                </Button>
                            </Link> :
                            <Button variant={'outlined'} className={classes.button}>
                                Register
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default SubFooter;