import React, {useContext} from "react";
import Head from "next/head";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useCookies } from 'react-cookie';
import Router from 'next/router'

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
import UserContext from "../store/userContext";
import AdminContext from "../store/adminContext";

const NavigationBar = dynamic(() => import('../components/NavigationBar'))
const Footer = dynamic(() => import('../components/FooterBar'))
const Link = dynamic(() => import('../utils/link'))
const GoogleIcon = dynamic(() => import('../utils/customIcon'))

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
  dontHaveAccount: {
    fontFamily: "Muli, sans-serif",
    margin: "10px 0 40px",
    color: theme.palette.secondary.secondary,
  },
}));

const Login = (data) => {
  const classes = useStyles();
  const { signIn } = useContext(UserContext);
  const [cookie, setCookie] = useCookies()
  const [message, setMessage] = React.useState('')
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
    token: ""
  });

  const {login_, mentee_} = useContext(UserContext);
  const [mentee, setMentee] = mentee_
  const [login, setLogin] = login_

  const onLoginClick = async () => {
    const username = values.username
    const password = values.password

    if (username != '' || password != '') {
      Login(username, password);
    } else {
      setMessage('Please enter your username and password');
    }
  }

  const Login = async (username, password) => {
    const signInUrl = process.env.NEXT_PUBLIC_BASE_URL + '/auth/mentee';
    try {
      const response = await fetch(signInUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      if (response.ok) {
        const data = await response.json();
        setMentee(data);
        setCookie('mentee', data);
        setCookie('token_mentee', data.token);
        setLogin(true);
        Router.replace('/');
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
      }
    } catch (error) {
      console.error("Something Wrong, Please Try Again!", error);
      throw new Error(error);
    }
  }

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
                    src={"/images/logo-alterra-academy-white.png"}
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
                    onChange={handleChange('username')}
                    name="username"
                    value={values.username}
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
                      name="password"
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
                      onClick={onLoginClick}
                    >
                      Login
                    </Button>

                    <Link href={"/register"} className={classes.dontHaveAccount} >
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