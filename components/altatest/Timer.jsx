import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  allText: {
    color: "#F4F7FC",
    fontFamily: "Muli, sans-serif",
    fontWeight: "bolder",
    fontSize: `calc(0.8em + 0.5vw)`,
    zIndex: "1",
    padding: "5px",
  },
  cardTime: {
    margin: theme.spacing(3, 0, 0, -2),
    position: "fixed",
    backgroundColor: theme.palette.secondary.secondary,
    borderRadius: "10px",
  },
}));

export default function Timers(props) {
  const classes = useStyles();
  const [second, setSecond] = React.useState(0);

  const countDownDate =
    new Date(props.timeStart).getTime() + new Date("9999 09:00:00").getTime();
  const now = Date.now();
  const distance = countDownDate - now;
  const hours = Math.floor((distance % (3600000 * 24)) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  const secondShow = ("00" + seconds).substr(-2);
  const minuteShow = ("00" + minutes).substr(-2);
  const hourShow = ("00" + hours).substr(-2);

  React.useEffect(() => {
    const timer = setInterval(() => setSecond(second - 1), 1000);
    return () => clearInterval(timer);
  }, [second]);

  if (hours === 0 && minutes === 0 && seconds === 0) {
    props.endTest("end");
  }

  return (
    <div>
      <Card className={classes.cardTime}>
        {props.statusTest === "start" ? (
          <Typography className={classes.allText}>
            {hourShow}:{minuteShow}:{secondShow}
          </Typography>
        ) : (
          <Typography className={classes.allText}>00:00:00</Typography>
        )}
      </Card>
    </div>
  );
}
