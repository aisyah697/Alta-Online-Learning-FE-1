import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "80%",
    marginTop: "50px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textInput: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "42%",
    },
  },
}));

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <React.Fragment>
      <Head>
        <title>Register | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <Grid container justify="center">
          <Card className={classes.root}>
            <CardContent>
              <Typography align="center" variant="h6">
                Sign Up
              </Typography>
              <div className={classes.textInput}>
                <Grid container>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      id="outlined-textarea"
                      label="Full Name"
                      placeholder="Ahmad Aji P"
                      multiline
                      size="small"
                      variant="outlined"
                    />
                    <TextField
                      variant="outlined"
                      color="secondary"
                      id="outlined-textarea"
                      label="Full Name"
                      placeholder="Ahmad Aji P"
                      multiline
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      id="outlined-textarea"
                      label="Full Name"
                      placeholder="Ahmad Aji P"
                      multiline
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
      </main>
    </React.Fragment>
  );
}
