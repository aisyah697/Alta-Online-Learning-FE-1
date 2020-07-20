import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminContext from "../../store/adminContext";

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
      content: "\"\"",
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  spacing: {
    flexBasis: "5%",
  },
  perQuest: {
    marginBottom: theme.spacing(3),
  },
  answers: {
    marginTop: theme.spacing(-2),
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
  allText: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
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

export default function Question(props) {
  const classes = useStyles();
  const { load_ } = useContext(AdminContext);
  // eslint-disable-next-line no-unused-vars
  const [load, setLoad] = load_;
  const [cookies] = useCookies();

  const postAnswer = async (myAnswer) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/historyaltatest/question`;
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
          Authorization: `Bearer ${auth}`,
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

  const handleChange = () => (event) => {
    postAnswer(event.target.value);
  };

  return (
    <main className={classes.content}>
      <div>
        <div className={classes.perQuest}>
          <Grid container spacing={0}>
            <Grid item xs={1} className={classes.spacing}>
              <Typography className={classes.allText}>
                {props.no + 1}
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <Typography paragraph className={classes.allText}>
                {props.question.question}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={0}>
            <Grid item xs={1} className={classes.spacing} />
            <Grid item xs={11}>
              <FormControl component="fieldset">
                <RadioGroup
                  className={classes.answers}
                  defaultValue="None"
                  aria-label="answer"
                  name="customized-radios"
                  onChange={handleChange("jawaban")}
                >
                  {props.question.choice.map((element, num) => (
                    <FormControlLabel
                      key={num}
                      control={<StyledRadio />}
                      value={element.id.toString()}
                      label={element.choice}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    </main>
  );
}
