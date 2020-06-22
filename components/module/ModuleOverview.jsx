import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Roboto, sans-serif",
        display: "flex",
        maxWidth: "100%",
    },
    media: {
        height: "100%",
        objectFit: "cover",
    },
    module: {
        marginBottom: 0,
        marginTop: theme.spacing(2),
    },
    description: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        borderRadius: theme.spacing(3),
        WebkitBoxShadow: "none",
        color: theme.palette.primary.main,
        border: "1px solid #F47522",
        transition: "all 0.5s ease",
        "&:hover": {
            WebkitBoxShadow: "none",
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.main,
        },
    },
}));

export default function ModuleOverview(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Paper elevation={0}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            alt="module"
                            image="/images/dummy.png"
                            title="Contemplative Reptile"
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography
                            className={classes.module}
                            gutterBottom
                            variant="h5"
                            component="h2"
                        >
                            Basic Programming
                        </Typography>
                        <Typography
                            className={classes.description}
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Learn the fundamentals of python
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            Currently on:
                        </Typography>
                        <Typography variant="h6" color="textSecondary" component="p">
                            Subject 02: Basic Python
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            2 of 5 subjects completed
                        </Typography>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                        >
                            Go to class
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}