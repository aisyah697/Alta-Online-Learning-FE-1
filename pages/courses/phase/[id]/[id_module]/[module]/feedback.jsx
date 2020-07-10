import React from "react";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";

import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const NavigationBar = dynamic(() => import('../../../../../../components/NavigationBar'));
const Footer = dynamic(() => import('../../../../../../components/FooterBar'));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#F4F7FC",
    "& > *": {
      margin: theme.spacing(5),
      width: theme.spacing(120),
      height: theme.spacing(70),
      backgroundColor: theme.palette.primary.main,
    },
  },
  title: {
    color: theme.palette.secondary.secondary,
    textAlign: "center",
    marginBottom: theme.spacing(7),
  },
  container: {
    padding: theme.spacing(2, 10),
    color: theme.palette.secondary.secondary,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1, 2),
    },
  },
  textField: {
    width: "100%",
    marginBottom: "18px",
    "&:hover": {
      borderColor: "#F47522",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  paragraph: {
    fontWeight: "400",
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
    zIndex: 10000
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
    boxShadow: "none",
    cursor: "pointer",
    border: "1px solid #F47522",
    WebkitBorderRadius: "2em",
    padding: theme.spacing(1, 3),
    transition: "all 0.3s ease",
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
  ornament: {
    height: "35vh",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "25px",
    },
    position: "absolute",
    zIndex: 0
  },
}));

const labels = {
  1: 'Bad',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

const useStyles2 = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function FeedbackModule() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [cookies, setCookie] = useCookies();

  const router = useRouter();
  const {id_module, module} = router.query;

  const [values, setValues] = React.useState({
    content: ""});

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const postReviewModule = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/reviewmodule";
    const auth = cookies.token_mentee;

    const MyJOSN = JSON.stringify({
      mentee_id: cookies.mentee.id,
      module_id: id_module,
      content: values.content,
      score: value
    });

    try {
      const response = await axios.post(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        alert('OK')
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Module Feedback | Alta Online Learning</title>
      </Head>
      <NavigationBar />
      <div className={classes.root}>
        <Paper elevation={3}>
          <img
            className={classes.ornament}
            src={"/images/ornament_batik.png"}
            alt="Ornament"
          />
          <div className={classes.container}>
            <h1 className={classes.title}>Feedback Form</h1>
            {module?
            <Typography variant="h6" paragraph className={classes.paragraph}>
              Module: {module.split("-").join(" ")}
            </Typography> : null }
            <Typography variant="h6" paragraph className={classes.paragraph}>
              How was your experience?
            </Typography>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div className={classes2.root}>
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={1}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
              </div>
            </div>
            <br/>
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              size="medium"
              multiline
              onChange={handleChange('content')}
              rows={8}
              rowsMax={8}
            />
            <div className={classes.buttonContainer}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={postReviewModule}
              >
                Submit
              </Button>
            </div>
          </div>
        </Paper>
      </div>
      <Footer />
    </React.Fragment>
  );
}

