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
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "80%",
    marginTop: "25px",
    background: "#19345E",
    borderRadius: "0 0 0 0",
  },
  secondRoot: {
    minWidth: "99%",
    marginBottom: "10px",
    background: "#F4F7FC",
    borderRadius: "0 0 0 0",
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
  },
  titleregis: {
    width: "100%",
  },
  button: {
    textTransform: "none",
    marginBottom: "20px",
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
        <Grid container justify="center">
          <Card className={classes.root}>
            <Grid container justify="center">
              <Typography
                style={{ margin: "30px", color: "white" }}
                align="center"
                variant="h5"
              >
                Sign Up
              </Typography>
              <Card className={classes.secondRoot}>
                <CardContent>
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
                          variant="outlined"
                          color="secondary"
                          label="Full Name"
                          placeholder="Ahmad Aji P"
                          size="medium"
                          variant="outlined"
                        />
                        <TextField
                          variant="outlined"
                          color="secondary"
                          label="Email"
                          type="email"
                          placeholder="example@alterra.id"
                          size="medium"
                          variant="outlined"
                        />
                        <TextField
                          variant="outlined"
                          color="secondary"
                          label="User Name"
                          type="username"
                          placeholder="Ahmad Aji P"
                          size="medium"
                          variant="outlined"
                        />
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          variant="outlined"
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
                          defaultValue="2017-05-24"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          variant="outlined"
                          color="secondary"
                          label="Birth Place"
                          placeholder="Malang"
                          size="medium"
                          variant="outlined"
                        />
                        <TextField
                          variant="outlined"
                          color="secondary"
                          label="Phone Number"
                          placeholder="08XXXXXXXXXX"
                          size="medium"
                          variant="outlined"
                        />
                        <TextField
                          variant="outlined"
                          color="secondary"
                          label="GitHub Link"
                          placeholder="https://github.com/.........."
                          size="medium"
                          variant="outlined"
                        />
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="icon-button-file"
                          type="file"
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                          >
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
                <Typography
                  style={{ color: "blue", padding: "10px 10px 0 0" }}
                  align="right"
                  gutterBottom
                  variant="body2"
                >
                  <Link href="/login">Already have account?</Link>
                </Typography>
              </Card>
              <CardActions>
                <Button
                  className={classes.button}
                  variant="contained"
                  size="medium"
                >
                  Register
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
        <Footer />
      </main>
    </React.Fragment>
  );
}
