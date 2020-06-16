import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { orange } from "@material-ui/core/colors";
import GTranslateIcon from "@material-ui/icons/GTranslate";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginTop: 50,
    alignContent: "center",
    minHeight: 300,
  },
  margin: {
    margin: theme.spacing(1),
    width: "100%",
  },
  textLogin: {
    fontWeight: "bold",
    paddingBottom: "20px",
  },
  loginImage: {
    background: "#000065",
    padding: 20,
    minHeight: "100%",
  },
  button: {
    textTransform: "none",
    background: "mediumblue",
    color: "white",
  },
}));
const theme = createMuiTheme({
  palette: {
    secondary: orange,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>Home | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <Grid container justify="center">
          <Card className={classes.root} variant="outlined">
            <Grid container>
              <Grid item xs={5}>
                <Card className={classes.loginImage}>
                  <img
                    width="100px"
                    src="/images/logo-alterra-academy-white.png"
                    alt="login-picture"
                  />
                </Card>
              </Grid>
              <Grid item xs={7}>
                <CardContent>
                  <Typography
                    className={classes.textLogin}
                    align="center"
                    variant="h5"
                    gutterBottom
                  >
                    Log In
                  </Typography>
                  <ThemeProvider theme={theme}>
                    <TextField
                      className={classes.margin}
                      label="User Name"
                      size="small"
                      variant="outlined"
                      color="secondary"
                      id="mui-theme-provider-outlined-input"
                    />
                    <TextField
                      className={classes.margin}
                      label="Password"
                      size="small"
                      color="secondary"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input"
                    />
                  </ThemeProvider>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    justify="center"
                    style={{ paddingBottom: "30px" }}
                  >
                    <Button
                      className={classes.button}
                      variant="contained"
                      size="medium"
                    >
                      Log In
                    </Button>
                    <Typography
                      style={{ color: "blue", padding: "10px 0 30px 0" }}
                      align="center"
                      gutterBottom
                      variant="body2"
                    >
                      Don't have an account? Register!
                    </Typography>

                    <Button
                      className={classes.button}
                      variant="contained"
                      size="large"
                      className={classes.button}
                      startIcon={<GTranslateIcon />}
                    >
                      Log in using google account
                    </Button>
                  </Grid>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </main>
    </React.Fragment>
  );
}
