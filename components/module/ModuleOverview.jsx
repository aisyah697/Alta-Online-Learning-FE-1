import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {useCookies} from "react-cookie";
import axios from "axios";

const Link = dynamic(() => import('../../utils/link'))

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

export default function ModuleOverview({modules}) {
    const classes = useStyles();
    const router = useRouter();
    const {id, id_module, module} = router.query;

    const [cookies] = useCookies();

    const [subject, setSubject] = React.useState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + `/historysubject/mentee`;
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
        fetchData();
    }, [id]);

    if (subject) {
        const lastArr = subject.filter(res => res.is_complete == false);
        var lastSubject = lastArr[0];
    }

    return (
        <React.Fragment>
            <Paper elevation={0}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            alt="module"
                            image={modules.module.image}
                            title="Contemplative Reptile"
                        />
                    </Grid>
                    <Grid item sm={1}/>
                    <Grid item xs={12} sm={8}>
                        <Typography
                            className={classes.module}
                            gutterBottom
                            variant="h5"
                            component="h2"
                        >
                            {modules.module.name}
                        </Typography>
                        <Typography
                            className={classes.description}
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Learn the fundamentals of {modules.module.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            {subject? subject.filter(mod => mod.is_complete === true && mod.subject.module_id == id_module).length : 0} of {modules.subject.length} subjects completed
                        </Typography>
                        <br/>
                        <Typography style={{fontWeight: 'bold'}} variant="body1" color="textSecondary" component="p">
                            {lastSubject?
                            ('Currently on:') : null }
                        </Typography>
                        <Typography variant="h6" color="textSecondary" component="p">
                            {/*Subject: {subject && subject.length > 1 ? subject.filter(mod => mod.is_complete === false)[0].subject.name : null}*/}
                            {lastSubject? lastSubject.subject.name : null}
                        </Typography>
                        {lastSubject ?
                        <Link href={'/courses/phase/[id]/[id_module]/[module]/[id_subject]/[subject_name]'}
                              as={`/courses/phase/${id}/${id_module}/${module}/${lastSubject.subject.id}/${lastSubject.subject.name.split(" ").join("-")}`}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                            >
                                Go to class
                            </Button>
                        </Link> : null}
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}