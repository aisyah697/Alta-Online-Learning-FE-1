import React from "react";

// import style
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    fontFamily: "Muli, sans-serif",
    padding: theme.spacing(10),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  container: {
    minHeight: "30vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  phaseTitle: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: theme.spacing(5),
    fontFamily: "Muli, sans-serif",
  },
  phaseFont: {
    fontSize: `calc(2em + 0.5vw)`,
    color: theme.palette.secondary.secondary,
    fontWeight: 600,
  },
  root: {
    width: "100%",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "5px",
      padding: theme.spacing(1),
    },
  },
  avatar: {
    width: "100px",
    height: "100px",
    border: '3px solid #f4752e',
    [theme.breakpoints.down("sm")]: {
      width: "60px",
      height: "60px",
    },
  },
  content: {
    textAlign: "justify",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      padding: theme.spacing(1),
      paddingBottom: 0,
    },
  },
  text: {
    marginLeft: theme.spacing(5),
    paddingTop: theme.spacing(1),
    fontFamily: "SFCompactDisplay-Regular, sans-serif",
    color: theme.palette.secondary.secondary,
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
  },
  ornament: {
    height: "50vh",
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      paddingTop: "25px",
    },
    position: "absolute",
    zIndex: 0,
  },
}));

const Testimony = {
  list: [
    {
      mentor: "Iswanul Umam",
      role: "Academy Lead",
      avatar: "/images/umam.jpeg",
      caption:
        "Alterra Academy Online Learning transforming novice talent to professional talent with various roles such as Fullstack Engineer, Backend Engineer, Frontend Engineer, Data Engineer, DevOps Engineer, Quality Engineer. ALTA graduates 100% successful work in the Start-up Industry.",
    },
    {
      mentor: "Kobar Septyanus",
      role: "Academy Instructor",
      avatar: "/images/kobar.jpeg",
      caption:
        "Alterra Academy Online Learning is the best online platform for those who want to be a professional tech talent without IT background.",
    },
    {
      mentor: "Dzinsyah",
      role: "Front-End Instructor",
      avatar: "/images/dzinsyah.png",
      caption:
        "I joined Alterra Academy course in the early 2020 and now become a FrontEnd Engineer and also a FrontEnd instructor. ",
    },
    {
      mentor: "Maestro Trastanechora",
      role: "JavaScript Instructor",
      avatar: "/images/maestro.jpeg",
      caption:
        "Alterra Academy Online Learning the solution for you who want a tech fast-learning. Come join ALTA if you want to learn about many technology stacks.",
    },
  ],
};

// eslint-disable-next-line react/prop-types
const CustomPaper = () => {
  const classes = useStyles();
  return (
    <div>
      {Testimony
        ? Testimony.list.map((item, index) => (
            <Card key={index} elevation={0} className={classes.root}>
              <CardContent className={classes.content}>
                <Avatar src={item.avatar} className={classes.avatar} />
                <div className={classes.text}>
                  <Typography style={{ fontWeight: 700 }}>
                    {item.mentor}
                  </Typography>
                  <Typography style={{ fontSize: "14px", fontStyle: "italic" }}>
                    {item.role}
                  </Typography>
                  <hr />
                  <Typography>{item.caption}</Typography>
                </div>
              </CardContent>
            </Card>
          ))
        : null}
    </div>
  );
};

const HomeTestimony = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.phaseTitle}>
        <Typography className={classes.phaseFont}>
          {" "}
          Meet The Mentors{" "}
        </Typography>
      </div>
      <img
        className={classes.ornament}
        src={"/images/ornament_batik.png"}
        alt="Ornament"
      />
      <Box width={"100%"} padding={0} className={classes.bannerBox}>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.container}>
            <CustomPaper/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomeTestimony;
