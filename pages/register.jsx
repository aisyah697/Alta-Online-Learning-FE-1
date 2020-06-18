import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Divider from "@material-ui/core/Divider";
import Link from "../utils/Link";

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
  title: {
    fontSize: 14,
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
  button: {
    textTransform: "none",
    marginBottom: "20px",
  },
  titleText: {
    fontFamily: "Muli, sans-serif",
    margin: "30px",
    color: "#19345E",
    fontWeight: "bold",
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

export default function SimpleCard() {
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
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <React.Fragment>
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
                      />
                      <TextField
                        className={classes.formAll}
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        type="email"
                        placeholder="example@alterra.id"
                        size="small"
                      />
                      <TextField
                        className={classes.formAll}
                        variant="outlined"
                        color="secondary"
                        label="User Name"
                        type="username"
                        placeholder="Ahmad Aji P"
                        size="small"
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
                        type="date"
                        size="small"
                        defaultValue="2017-05-24"
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
                      />
                      <TextField
                        variant="outlined"
                        color="secondary"
                        label="Phone Number"
                        placeholder="08XXXXXXXXXX"
                        size="small"
                        className={classes.formAll}
                      />
                      <TextField
                        variant="outlined"
                        color="secondary"
                        label="GitHub Link"
                        placeholder="https://github.com/.........."
                        size="small"
                        className={classes.formAll}
                      />
                      <Grid container alignItems="left">
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="icon-button-file"
                          type="file"
                          size="large"
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
        <Footer />
      </main>
    </React.Fragment>
  );
}
