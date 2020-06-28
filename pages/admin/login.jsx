import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Head from "next/head";
import clsx from "clsx";

import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import { useCookies } from 'react-cookie'
import AdminContext from "../../store/adminContext";

const GoogleIcon = dynamic(() => import('../../utils/customIcon'))

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
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  button: {
    fontFamily: "SFCompactDisplay-Regular, sans-serif",
    backgroundColor: theme.palette.secondary.secondary,
    borderColor: theme.palette.secondary.secondary,
    color: theme.palette.common.white,
    margin: "20px",
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
  container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    height: "100vh"
  }
}));

export default function LoginPage() {
  const classes = useStyles();
  const[message, setMessage] = React.useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const {admin_, login_} = useContext(AdminContext);
  const [admin, setAdmin] = admin_
  const [login, setLogin] = login_

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const postLoginAdmin = async () => {
    const username = values.username
    const password = values.password

    if (username != '' || password != '') {
      Login(username, password);
    } else {
      setMessage('Please enter your username and password');
    }
  }

  const Login = async (username, password) => {
    const signInUrl = process.env.NEXT_PUBLIC_BASE_URL + '/auth/admin';
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
        setAdmin(data);
        setCookie('admin', data);
        setCookie('token_admin', data.token);
        setLogin(true);
        Router.replace('/admin');
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

  return (
    <React.Fragment>
      <Head>
        <title>Login | Alta Online Learning</title>
      </Head>
      <main>
        <div className={classes.container}>
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

              <Grid item xs={12} md={12} lg={7} style={{ background: "#F4F7FC" }}>
                <CardContent>
                  <Typography
                    className={classes.textLogin}
                    align="center"
                    variant="h5"
                    gutterBottom
                  >
                    Sign In Admin
                  </Typography>

                  <TextField
                    className={classes.margin}
                    label="Username"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    id="mui-theme-provider-outlined-input"
                    onChange={handleChange('username')}
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
                      onClick={postLoginAdmin}
                    >
                      Login
                    </Button>
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
        </div>
      </main>
    </React.Fragment>
  );
}
