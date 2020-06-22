import React from "react";
import Head from "next/head";
import clsx from "clsx";
import dynamic from "next/dynamic";

import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SvgIcon from "@material-ui/core/SvgIcon";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

const NavigationBar = dynamic(() => import('../components/NavigationBar'))
const Footer = dynamic(() => import('../components/FooterBar'))
const Link = dynamic(() => import('../utils/link'))

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    margin: theme.spacing(1),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    alignContent: "center",
    minHeight: 300,
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(4),
    },
  },
  margin: {
    margin: theme.spacing(1),
    width: "90%",
    background: "white",
    "&:hover label.Mui-focused": {
      color: "darkBlue",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "darkBlue",
      },
    },
  },
  textLogin: {
    fontWeight: "bold",
    paddingBottom: "20px",
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
  loginImage: {
    background: theme.palette.secondary.secondary,
    padding: 20,
    paddingTop: "30%",
    minHeight: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  button: {
    fontFamily: "SFCompactDisplay-Regular, sans-serif",
    backgroundColor: theme.palette.secondary.secondary,
    borderColor: theme.palette.secondary.secondary,
    color: theme.palette.common.white,
    padding: "5px 20px",
    textTransform: "none",
    borderRadius: theme.spacing(1),
    minWidth: theme.spacing(12),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  textField: {
    width: "90%",
    background: "white",
  },
  textMuli: {
    fontFamily: "Muli, sans-serif",
  },
  dontHaveAccount: {
    fontFamily: "Muli, sans-serif",
    margin: "10px 0 40px",
    color: theme.palette.secondary.secondary,
  },
}));

const wrapSvgPath = (path, viewBox = "0 0 50 50") => (props) => (
    <SvgIcon {...props} viewBox={viewBox}>{path}</SvgIcon>
);

const GoogleIcon = wrapSvgPath(
    <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
);

const Login = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Head>
        <title>Login | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <Grid container justify="center">
          <Card className={classes.root} variant="outlined">
            <Grid container>
              <Grid item lg={5} xs={12}>
                <Card className={classes.loginImage}>
                  <img
                    width="90%"
                    src="/images/logo-alterra-academy-white.png"
                    alt="login-picture"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} lg={7} style={{ background: "#F4F7FC" }}>
                <CardContent>
                  <Typography
                    className={classes.textLogin}
                    align="center"
                    variant="h5"
                    gutterBottom
                  >
                    Sign In
                  </Typography>
                  <TextField
                    className={classes.margin}
                    label="Username"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    id="mui-theme-provider-outlined-input"
                  />
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      color="secondary"
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    style={{ padding: "40px 0 40px 0" }}
                  >
                    <Button
                      className={classes.button}
                      variant={"outlined"}
                      size="large"
                    >
                      Login
                    </Button>

                    <Link className={classes.dontHaveAccount} href="/register">
                      Don't have an account? Register!
                    </Link>

                    <Button
                      className={classes.button}
                      variant={"outlined"}
                      size="large"
                      startIcon={<GoogleIcon />}
                    >
                      <Typography>Login using google account</Typography>

                    </Button>
                  </Grid>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Footer />
      </main>
    </div>
  );
}

export default Login;