import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
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

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "80%",
    marginTop: "50px",
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
      margin: theme.spacing(1),
      width: "80%",
      fontSize: "16px",
    },
  },
  textField: {
    width: "80%",
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
            <CardContent>
              <Typography
                style={{ marginBottom: "30px" }}
                align="center"
                variant="h6"
              >
                Sign Up
              </Typography>
              <div className={classes.textInput}>
                <Grid container>
                  <Grid
                    item
                    xs={6}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <TextField
                      variant="outlined"
                      color="secondary"
                      id="outlined-textarea"
                      label="Full Name"
                      placeholder="Ahmad Aji P"
                      multiline
                      size="medium"
                      variant="outlined"
                    />
                    <TextField
                      variant="outlined"
                      color="secondary"
                      id="outlined-textarea"
                      label="Email"
                      type="email"
                      placeholder="example@alterra.id"
                      multiline
                      size="medium"
                      variant="outlined"
                    />
                    <TextField
                      variant="outlined"
                      color="secondary"
                      id="outlined-textarea"
                      label="User Name"
                      type="username"
                      placeholder="Ahmad Aji P"
                      multiline
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
                  <Grid
                    item
                    xs={6}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <TextField
                      variant="outlined"
                      color="secondary"
                      id="outlined-textarea"
                      label="Full Name"
                      placeholder="Ahmad Aji P"
                      multiline
                      size="medium"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
      </main>
    </React.Fragment>
  );
}
