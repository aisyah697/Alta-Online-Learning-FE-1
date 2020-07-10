import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import dynamic from "next/dynamic";

const Link = dynamic(() => import("../utils/link"));

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
  paragraph: {
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
    cursor: "pointer",
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

const FooterBar = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container className={classes.mainContainer}>
          <Grid container spacing={3}>
            <Grid item xs={4} style={{ margin: "auto" }}>
              <Link href="/">
                <img
                  className={classes.logo}
                  src="/images/logo_footer.png"
                  alt="logo-alta"
                />
              </Link>
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
                <p className={classes.paragraph}>Social Media:</p>
                <Container className={classes.container}>
                  <img
                    className={classes.img}
                    src="/images/ic_fb.png"
                    alt="facebook"
                  />
                  <img
                    className={classes.img}
                    src="/images/ic_twitter.png"
                    alt="facebook"
                  />
                  <img
                    className={classes.img}
                    src="/images/ic_ig.png"
                    alt="facebook"
                  />
                  <img
                    className={classes.img}
                    src="/images/ic_linkedin.png"
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
};

export default FooterBar;
