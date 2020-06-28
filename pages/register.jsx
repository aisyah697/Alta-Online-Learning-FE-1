import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import clsx from "clsx";

import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import axios from "axios";
import Router from "next/router";

const NavigationBar = dynamic(() => import('../components/NavigationBar'))
const Footer = dynamic(() => import('../components/FooterBar'))
const Link = dynamic(() => import('../utils/link'))

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "80%",
    marginBottom: "10px",
    background: "#F4F7FC",
    borderRadius: "0 0 0 0",
  },
  formAll: {
    "&:hover label.Mui-focused": {
      color: "darkBlue",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "darkBlue",
      },
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
  textInput: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "80%",
      fontSize: "16px",
      background: "white",
    },
  },
  textField: {
    width: "80%",
    margin: theme.spacing(3),
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
  titleregis: {
    width: "100%",
  },

  titleText: {
    fontFamily: "Muli, sans-serif",
    margin: "30px",
    color: "#19345E",
    fontWeight: "bold",
  },
  button: {
    marginBottom: "20px",
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
  page: {
    padding: "70px 0 50px 0",
  },
  textAlreadyHaveAccount: {
    fontFamily: "Muli, sans-serif",
    margin: "10px 0 40px",
    color: theme.palette.secondary.secondary,
  },
  input: {
    padding: "30px",
    marginLeft: "10px",
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
}));

const Register = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = () => (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [images, setImages] = React.useState('')

  const handleImage = e => {
    if (e.target.files.length) {
      setImages(e.target.files[0]);
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const postRegister = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/mentee'
    const formRegis = new FormData()
    formRegis.append('full_name', values.fullName)
    formRegis.append('username', values.username)
    formRegis.append('password', values.password)
    formRegis.append('email', values.email)
    formRegis.append('place_birth', values.birthPlace)
    formRegis.append('date_birth', values.birthDate)
    formRegis.append('phone', values.phoneNumber)
    formRegis.append('github', values.github)
    formRegis.append('description', values.about)
    formRegis.append('avatar', images)

    try {
      const response = await axios.post(url, formRegis,{
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        Router.replace('/login');
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
    }
  }

  return (
    <div>
      <Head>
        <title>Register | Alta Online Learning</title>
      </Head>
      <main>
        <NavigationBar />
        <Grid className={classes.page} container justify="center">
          <Grid container justify="center">
            <Card elevation={0} className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.titleText}
                  align="center"
                  variant="h5"
                >
                  Sign Up
                </Typography>
                <div className={classes.textInput}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <TextField
                        className={classes.formAll}
                        variant="outlined"
                        color="secondary"
                        label="Full Name"
                        placeholder="Ahmad Aji P"
                        size="small"
                        name="fullName"
                        onChange={handleChange("fullName")}
                      />
                      <TextField
                        className={classes.formAll}
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        type="email"
                        placeholder="example@alterra.id"
                        size="small"
                        name="email"
                        onChange={handleChange("email")}
                      />
                      <TextField
                        className={classes.formAll}
                        variant="outlined"
                        color="secondary"
                        label="User Name"
                        type="username"
                        placeholder="Ahmad Aji P"
                        size="small"
                        name="username"
                        onChange={handleChange("username")}
                      />
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        size="small"
                        color="secondary"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          color="secondary"
                          id="outlined-adornment-password"
                          type={values.showPassword ? "text" : "password"}
                          value={values.password}
                          name="password"
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
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid
                      item
                      xs={12}
                      sm={5}
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <TextField
                        variant="outlined"
                        color="secondary"
                        id="date"
                        label="Birthday"
                        type="text"
                        size="small"
                        name="birthDate"
                        onChange={handleChange("birthDate")}
                        placeholder="01 Januari 1995"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        className={classes.formAll}
                        variant="outlined"
                        color="secondary"
                        label="Birth Place"
                        placeholder="Malang"
                        size="small"
                        name="birthPlace"
                        onChange={handleChange("birthPlace")}
                      />
                      <TextField
                        variant="outlined"
                        color="secondary"
                        label="Phone Number"
                        placeholder="08XXXXXXXXXX"
                        size="small"
                        className={classes.formAll}
                        name="phoneNumber"
                        onChange={handleChange("phoneNumber")}
                      />
                      <TextField
                        variant="outlined"
                        color="secondary"
                        label="GitHub Link"
                        placeholder="github.com/....."
                        size="small"
                        className={classes.formAll}
                        name="github"
                        onChange={handleChange("github")}
                      />
                      <Grid container alignItems="flex-start">
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="icon-button-file"
                          type="file"
                          size="large"
                          name="imageUrl"
                          onChange={handleImage}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
              <CardActions>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Button
                    className={classes.button}
                    variant={"outlined"}
                    size="large"
                    onClick={postRegister}
                  >
                    Register
                  </Button>
                  <Link
                    className={classes.textAlreadyHaveAccount}
                    href={"/login"}
                  >
                    <Typography>Already have account? Login!</Typography>
                  </Link>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </main>
    </div>
  );
}

export default Register;
