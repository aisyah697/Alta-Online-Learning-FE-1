import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    minHeight: "100vh",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 0.5),
    backgroundColor: theme.palette.secondary.secondary,
  },
  p: {
    fontSize: "16px",
    margin: "10px",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  img: {
    margin: "8px",
    width: "28px",
    [theme.breakpoints.down("xs")]: {
      width: "18px",
      margin: "4px",
    },
  },
  mainContainer: {
    marginLeft: "0",
    marginRight: "0",
    maxWidth: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
  typography: {
    color: "white",
    fontSize: "100%",
    [theme.breakpoints.down("xs")]: {
      fontSize: "50%",
      marginLeft: "8px",
      paddingBottom: "5px",
    },
  },
  logo: {
    width: "40%",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container className={classes.mainContainer}>
          <Grid container spacing={3}>
            <Grid item xs={4} style={{ margin: "auto" }}>
              <img
                className={classes.logo}
                src="/logo_footer.png"
                alt="logo-alta"
              />
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                margin: "auto",
                textAlign: "center",
              }}
            >
              <Container>
                <p className={classes.p}>Social Media:</p>
                <Container className={classes.container}>
                  <img
                    className={classes.img}
                    src="/ic_fb.png"
                    alt="facebook"
                  />
                  <img
                    className={classes.img}
                    src="/ic_twitter.png"
                    alt="facebook"
                  />
                  <img
                    className={classes.img}
                    src="/ic_ig.png"
                    alt="facebook"
                  />
                  <img
                    className={classes.img}
                    src="/ic_linkedin.png"
                    alt="facebook"
                  />
                </Container>
              </Container>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                textAlign: "right",
                margin: "auto",
                marginRight: "0",
                marginBottom: "0",
              }}
            >
              <Typography className={classes.typography} variant="body2">
                {"Copyright © "}
                {new Date().getFullYear()}
                {" Alterra Academy"}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </React.Fragment>
  );
}
