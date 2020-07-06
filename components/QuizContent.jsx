import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminContext from "../store/adminContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  content: {
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: theme.spacing(5),
    paddingTop: 0,
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
  media: {
    height: theme.spacing(30),
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function QuizContent({ quiz }) {
  const classes = useStyles();
  const { load_ } = useContext(AdminContext);
  const [load, setLoad] = load_;
  const [cookies, setCookie] = useCookies();

  const [answer, setAnswer] = React.useState();
  const handleChange = () => (event) => {
    setAnswer(event.target.value);
    // postAnswer(event.target.value);
  };

  const postAnswer = async (myAnswer) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/";
    const auth = cookies.token_mentee;
    const MyJOSN = JSON.stringify({
      history_altatest_id: props.id,
      answer_id: myAnswer,
      question_altatest_id: props.question.id,
    });

    try {
      const response = await axios.post(url, MyJOSN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (response.status === 200) {
        setLoad(true);
      }
    } catch (error) {
      console.error("Please Try Again!", error);
      throw new Error(error);
    } finally {
      setLoad(false);
    }
  };
  console.log(quiz);
  return (
    <main className={classes.content}>
      <Toolbar />
      <h1 className={classes.title}>Basic Programming Quiz</h1>
      {quiz.question.map((item, key) => (
        <div key={key}>
          <Grid container spacing={0}>
            <Grid item xs={1}>
              <Typography>{key + 1}.</Typography>
            </Grid>
            <Grid item xs={11}>
              <Typography>{item.question}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <FormControl component="fieldset">
                <RadioGroup
                  defaultValue="None"
                  aria-label="answer"
                  name="customized-radios"
                  onChange={handleChange()}
                >
                  {item.choice.map((item, key) => (
                    <FormControlLabel
                      key={key}
                      value={item.id.toString()}
                      control={<StyledRadio />}
                      label={item.choice}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      ))}
    </main>
  );
}
