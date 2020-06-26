import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import dynamic from "next/dynamic";
import Router, {useRouter} from "next/router";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Link = dynamic(() => import('../../utils/link'))

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "2rem",
  },
  main: {
    margin: "30px 24px",
  },
  viewProfile: {
    margin: "auto",
    textAlign: "right",
  },
  buttonProfile: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
    boxShadow: "none",
    cursor: "pointer",
    border: "1px solid #F47522",
    WebkitBorderRadius: "2em",
    padding: theme.spacing(1, 2),
    transition: "all 0.5s ease",
    textTransform: "capitalize",
    letterSpacing: ".02em",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#ffffff",
      boxShadow: "none",
      border: "1px solid #F47522",
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  h1: {
    color: "#19345E",
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
    },
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
  },
  form: {
    marginTop: "30px",
  },
  textField: {
    width: "80ch",
    marginBottom: "18px",
    "&:hover": {
      borderColor: "#F47522",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  input: {
    display: "none",
  },
  uploadPhoto: {
    backgroundColor: "#ffffff",
    color: "#f4752e",
    boxShadow: "none",
    border: "1px solid #F47522",
    WebkitBorderRadius: "20px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#f4752e",
      boxShadow: "none",
      border: "1px solid #F47522",
      color: "#ffffff",
    },
  },
  divButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
}));

const FormProfile = () => {
  const classes = useStyles();
  const router = useRouter();
  const { profile } = router.query;
  const [cookies, setCookie] = useCookies(['user']);
  const user = cookies.user

  const [values, setValues] = React.useState({
    fullName: "",
    email: "",
    birthPlace: "",
    birthDate: "",
    phoneNumber: "",
    github: "",
    about: ""
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const postEditProfile = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/mentee/' + user.id
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: values.fullName,
          email: values.email,
          birth_place: values.birthPlace,
          birth_date: values.birthDate,
          phone_number: values.phoneNumber,
          github: values.github,
          description: values.about
        }
        )
      });
      if (response.ok) {
        const data = await response.json();
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    }
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h1 className={classes.h1}>Edit Profile</h1>
        </Grid>
        <Grid item xs={6} className={classes.viewProfile}>
          <Link href={'/mentee/[profile]'} as={`/mentee/${profile}`}>
            <Button
              className={classes.buttonProfile}
              variant="contained"
              color="primary"
            >
              My Profile
            </Button>
          </Link>
        </Grid>
      </Grid>
      <div className={classes.avatar}>
        <Avatar
          alt="Mentee Picture"
          src={'/images/avatar_example.jpg'}
          className={classes.large}
        />
      </div>
      <div className={classes.divButton}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button
            className={classes.uploadPhoto}
            variant="contained"
            color="primary"
            component="span"
          >
            Upload Photo
          </Button>
        </label>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8} style={{ textAlign: "center" }}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Full Name"
              size="medium"
              name="fullName"
              onChange={handleChange('fullName')}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Email"
              size="medium"
              name="email"
              onChange={handleChange('email')}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Birth Place"
              size="medium"
              name="birthPlace"
              onChange={handleChange('birthPlace')}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Birth Date"
              placeholder="DD/MM/YYYY"
              size="medium"
              name="birthDate"
              onChange={handleChange('birthDate')}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="Phone Number"
              placeholder="08xxxxxxxxxx"
              size="medium"
              name="phoneNumber"
              onChange={handleChange('phoneNumber')}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="GitHub"
              placeholder="github.com/johndoe"
              size="medium"
              name="github"
              onChange={handleChange('github')}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="About Me"
              size="medium"
              multiline
              rows={3}
              rowsMax={4}
              name="about"
              onChange={handleChange('about')}
            />
          </form>
          <Button
            className={classes.buttonProfile}
            variant="contained"
            color="primary"
            onClick={() => postEditProfile()}
          >
            Save Changes
          </Button>
        </Grid>
        <Grid item xs={1} md={2} />
      </Grid>
    </div>
  );
}

export default FormProfile;
