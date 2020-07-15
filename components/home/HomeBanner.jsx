import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Link from "next/link"

// import style
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// import context
import AdminContext from "../../store/adminContext";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    backgroundColor: "#F4F7FC",
  },
  leftBanner: {
    height: "100vh",
    alignItems: "center",
    display: "flex",
    position: "relative",
  },
  rightBanner: {
    height: "100vh",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  ornament: {
    height: "50vh",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "25px",
    },
    position: "absolute",
  },
  leftText: {
    padding: theme.spacing(5),
    fontFamily: "Muli, sans-serif",
    color: theme.palette.secondary.secondary,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(17),
      paddingRight: theme.spacing(5),
    },
    zIndex: 1,
  },
  bannerImage: {
    width: theme.spacing(50),
  },
  bannerTitle: {
    fontSize: `calc(2rem + 0.5vw)`,
    lineHeight: "1.2",
    [theme.breakpoints.down("sm")]: {
      fontSize: `calc(1rem + 1vw)`,
    },
    padding: 0
  },
  bannerImageSmall: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: theme.spacing(30),
      paddingLeft: theme.spacing(5),
      marginBottom: '20px'
    },
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "7px 20px",
    marginTop: theme.spacing(3),
    textTransform: "none",
    borderRadius: theme.spacing(10),
    minWidth: theme.spacing(12),
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
}));

// eslint-disable-next-line react/prop-types
const HomeBanner = ({ phase, register }) => {
  const classes = useStyles();
  const [cookies, setCookies, removeCookies] = useCookies();
  const [history, setHistory] = React.useState("");

  const { load_ } = React.useContext(AdminContext);
  const [load] = load_;

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historyaltatest";
    const auth = cookies.token_mentee;
    const fetchData = async function () {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        });
        if (response.status === 200) {
          setHistory(response.data);
          if (response.data.is_complete === "end") {
            removeCookies("altatest");
            setCookies("altatest", "true");
          }
        }
      } catch (error) {
        throw error;
      }
    };
    if (cookies.registered === "true") {
      fetchData();
    }
  }, [load]);

  return (
    <div>
      <Box width={"100%"} padding={0} className={classes.bannerBox}>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={6} className={classes.leftBanner}>
            <img
              className={classes.ornament}
              src={"/images/ornament_batik.png"}
              alt="Ornament"
            />
            <div className={classes.leftText}>
              <img
                className={classes.bannerImageSmall}
                src={"/images/banner_image_1.png"}
                alt="Banner"
              />
              <Typography
                className={classes.bannerTitle}
                style={{ fontWeight: "bold" }}
              >
                What is Alterra Academy Online Learning ?
              </Typography>
              <br/>
              <Typography>
                {" "}
                <b>Alterra Academy Online Learning</b> is an online tech-learning platform
                that gives everyone (even non-IT background) a chance
                to be a professional Tech Talent.{" "}
              </Typography>
              <React.Fragment>
                {/* eslint-disable-next-line react/prop-types */}
                {phase != "undefined" && phase != null && phase.length != null && phase.length > 0 ? (
                  history ? (
                    history.is_complete === "end" ? (
                      <Link
                        href={"/courses/phase/[id]"}
                        as={`/courses/phase/1`}
                      >
                        <Button variant={"outlined"} className={classes.button}>
                          View Course
                        </Button>
                      </Link>
                    ) : (
                      <Link href={"/altatest"}>
                        <Button variant={"outlined"} className={classes.button}>
                          Take Altatest
                        </Button>
                      </Link>
                    )
                  ) : (
                    <Link href={"/altatest"}>
                      <Button variant={"outlined"} className={classes.button}>
                        Take Altatest
                      </Button>
                    </Link>
                  )
                ) : (
                  <Button
                    onClick={() => register()}
                    variant={"outlined"}
                    className={classes.button}
                  >
                    Register
                  </Button>
                )}
              </React.Fragment>
            </div>
          </Grid>
          <Grid item xs={12} lg={6} className={classes.rightBanner}>
            <img
              className={classes.bannerImage}
              src={"/images/banner_image_1.png"}
              alt="Banner"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomeBanner;
