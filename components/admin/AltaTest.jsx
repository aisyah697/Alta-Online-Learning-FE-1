import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import dynamic from "next/dynamic";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Loading from "../../components/Loading";

const AddAltaTest = dynamic(() => import("./AddAltatest"));
const EditAltaTest = dynamic(() => import("./EditAltatest"));
const DeleteAltaTest = dynamic(() => import("./DeleteAltatest"));

const useStyles = makeStyles((theme) => ({
    number: {
        marginRight: theme.spacing(2),
    },
    question: {
        textAlign: "justify",
        color: theme.palette.secondary.secondary,
        fontFamily: "Muli, sans-serif",
        fontSize: `calc(0.7em + 0.5vw)`,
    },
    delete: {
        display: "flex",
        justifyContent: "center",
    },
    choices: {
        padding: theme.spacing(2)
    }
}));

export default function AltaTest(props) {
    const classes = useStyles();

    return (
        <> {props.questions ?
            (props.questions.map((item, index) => (
                <Grid key={index} container spacing={0} style={{padding: '20px',}}>
                    <Grid item className={classes.number}>
                        <Typography className={classes.question}>{index+1}.</Typography>
                    </Grid>
                    <Grid item lg={10} sm={10}>
                        <Grid>
                            <Typography className={classes.question}>
                                {item.question}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item lg={1} sm={1} className={classes.delete}>
                        <EditAltaTest
                            ID={item.id}
                            question={item.question}
                        />
                        <DeleteAltaTest
                            ID={item.id}
                        />
                    </Grid>
                </Grid>
            ))) : <Loading/> }
        </>
    );

}
