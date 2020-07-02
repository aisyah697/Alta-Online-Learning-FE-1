import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

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
  spacing: {
    flexBasis: "5%",
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

export default function QuizContent(props) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <h1 className={classes.title}>Basic Programming Quiz</h1>
        <Grid item>
          <Grid item xs={1} className={classes.spacing}>
            1.
          </Grid>
          <Grid item xs={11}>
            numbers = [1, 1, 2, 3, 5, 8, 13]
            <br />
            print(list[3])
            <br />
            What is the output of the code above?
            <br />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={1} className={classes.spacing}>
            {"   "}
          </Grid>
          <Grid item xs={11}>
            <FormControl component="fieldset">
              <RadioGroup
                defaultValue="None"
                aria-label="answer"
                name="customized-radios"
              >
                <FormControlLabel
                  value="2"
                  control={<StyledRadio />}
                  label="2"
                />
                <FormControlLabel
                  value="3"
                  control={<StyledRadio />}
                  label="3"
                />
                <FormControlLabel
                  value="8"
                  control={<StyledRadio />}
                  label="8"
                />
                <FormControlLabel
                  value="13"
                  control={<StyledRadio />}
                  label="13"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
    </main>
  );
}
