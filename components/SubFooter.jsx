import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link"

// import style
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    fontFamily: "Muli, sans-serif",
  },
  container: {
    minHeight: "30vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: theme.palette.secondary.secondary,
    fontSize: `calc(1rem + 1vw)`,
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: "7px 20px",
    textTransform: "none",
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(10),
    minWidth: theme.spacing(12),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      textDecoration: "none",
      borderColor: theme.palette.secondary.main,
    },
  },
}));

const SubFooter = () => {
  const classes = useStyles();
  const [cookies] = useCookies("");

  return (
    <div>
      <Box width={"100%"} padding={0} className={classes.bannerBox}>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.container}>
            {cookies.registered === "true" ? (
              <>
                <Typography variant={"h5"} className={classes.title}>
                  You can now access the course!
                </Typography>
                <Link href={"/courses/phase/[id]"} as={`/courses/phase/1`}>
                  <Button variant={"outlined"} className={classes.button}>
                    View Course
                  </Button>
                </Link>{" "}
              </>
            ) : (
              <>
                <Typography variant={"h5"} className={classes.title}>
                  Register the course now!
                </Typography>
                <Link href={"/"}>
                  <Button variant={"outlined"} className={classes.button}>
                    Register
                  </Button>
                </Link>{" "}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SubFooter;
