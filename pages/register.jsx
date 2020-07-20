import React from "react";
import clsx from "clsx";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import dynamic from "next/dynamic";

// import style
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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// import component
const Link = dynamic(() => import("../utils/link"));

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
  inputUpload: {
    display: "none",
  },
  uploadButton: {
    marginLeft: "45px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "35px",
    },
  },
}));

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RegisterPage = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    username: "",
    email: "",
    fullName: "",
    phoneNumber: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [images, setImages] = React.useState("");

  const handleImage = (e) => {
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

  // eslint-disable-next-line consistent-return
  const Register = async () => {
    // eslint-disable-next-line no-undef
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/mentee`;
    const formRegis = new FormData();
    formRegis.append("full_name", values.fullName);
    formRegis.append("username", values.username);
    formRegis.append("password", values.password);
    formRegis.append("email", values.email);
    formRegis.append("place_birth", values.birthPlace);
    formRegis.append("date_birth", values.birthDate);
    formRegis.append("phone", values.phoneNumber);
    formRegis.append("github", values.github);
    formRegis.append("description", values.about);
    formRegis.append("avatar", images);
    formRegis.append("background_education", "-");
    formRegis.append("description", "-");
    formRegis.append("address", "-");

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(url, formRegis, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        Router.replace("/login");
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
      }
    } catch (error) {
      throw error;
    }
  };

  const postRegister = async () => {
    const { username } = values;
    const { password } = values;
    const { email } = values;
    const { fullName } = values;
    const { phoneNumber } = values;

    if (username !== "" && password !== "" && email !== "" && fullName !== "" && phoneNumber !== "") {
      Register();
    } else {
      if (fullName === "") {
        setMessage("Please enter your name");
        setOpen(true);
      }
      if (email === "") {
        setMessage("Please enter your email");
        setOpen(true);
      }
      if (username === "") {
        setMessage("Please enter your username");
        setOpen(true);
      }
      if (password === "") {
        setMessage("Please enter your password");
        setOpen(true);
      }
      if (phoneNumber === "") {
        setMessage("Please enter your phone number");
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Register | Alta Online Learning</title>
      </Head>
      <main>
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
                        size="small"
                        name="fullName"
                        placeholder="Full name"
                        required
                        onChange={handleChange("fullName")}
                      />
                      <TextField
                        className={classes.formAll}
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        type="email"
                        size="small"
                        name="email"
                        required
                        placeholder="example@alterra.id"
                        onChange={handleChange("email")}
                      />
                      <TextField
                        className={classes.formAll}
                        variant="outlined"
                        color="secondary"
                        label="Username"
                        type="username"
                        size="small"
                        name="username"
                        required
                        placeholder="johndoe"
                        onChange={handleChange("username")}
                      />
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        size="small"
                        color="secondary"
                      >
                        <InputLabel htmlFor="outlined-adornment-password" required>
                          Password
                        </InputLabel>
                        <OutlinedInput
                          color="secondary"
                          id="outlined-adornment-password"
                          type={values.showPassword ? "text" : "password"}
                          value={values.password}
                          name="password"
                          required
                          onChange={handleChange("password")}
                          endAdornment={(
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
                          )}
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
                        label="Phone Number"
                        placeholder="085xxxxxxxxx"
                        size="small"
                        className={classes.formAll}
                        name="phoneNumber"
                        required
                        onChange={handleChange("phoneNumber")}
                      />
                      <TextField
                        variant="outlined"
                        color="secondary"
                        id="date"
                        label="Birth Day"
                        type="date"
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
                        label="GitHub Link"
                        placeholder="github.com/johndoe"
                        size="small"
                        className={classes.formAll}
                        name="github"
                        onChange={handleChange("github")}
                      />
                      <Grid container alignItems="flex-start">
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          style={{ display: "none" }}
                          type="file"
                          size="large"
                          name="imageUrl"
                          onChange={handleImage}

                        />
                        <label htmlFor="contained-button-file">
                          <Button className={classes.uploadButton} variant="contained" color="primary" component="span">
                            Upload
                          </Button>
                          {" "}
                          {images.name}
                          {" "}
                        </label>
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
                    variant="outlined"
                    size="large"
                    onClick={postRegister}
                  >
                    Register
                  </Button>
                  <Link
                    className={classes.textAlreadyHaveAccount}
                    href="/login"
                  >
                    Already have account? Login!
                  </Link>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </main>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterPage;
