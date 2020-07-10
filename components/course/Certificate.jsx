import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../store/userContext";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.secondary,
    width: theme.spacing(100),
    marginTop: theme.spacing(3),
    backgroundImage: "url('/images/ornament_batik.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "270px 380px",
  },
  containerLogo: {
    display: "flex",
  },
  logo: {
    width: theme.spacing(18),
  },
  batik: {
    width: theme.spacing(18),
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
  subtext: {
    textAlign: "center",
    marginTop: theme.spacing(3),
  },
  name: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  issued: {
    textAlign: "left",
  },
  content: {
    margin: theme.spacing(3, 4),
    marginBottom: theme.spacing(10),
  },
}));

export default function Certificate(props) {
  const classes = useStyles();
  const [cookies] = useCookies();

  const id = cookies.mentee.id;

  const { mentee_, token_ } = useContext(UserContext);
  const [mentee, setMentee] = mentee_;
  const [tokenMentee, setTokenMentee] = token_;

  const [subject, setSubject] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/mentee/score/${id}`;
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token_mentee,
          },
        });
        if (response.status === 200) {
          setSubject(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <React.Fragment>
      {subject
        ? subject.phase.map((item, index) => (
            <div>
              {item.certificate ? (
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <img
                            src="/images/logo_header.png"
                            alt="logo"
                            className={classes.logo}
                            align="right"
                          />
                        </Grid>
                      </Grid>
                      <div className={classes.content}>
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="h2"
                          className={classes.title}
                        >
                          Certificate of Completion
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          component="p"
                          className={classes.subtext}
                        >
                          This is to certify that
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="h2"
                          className={classes.name}
                        >
                          {subject.full_name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          component="p"
                          className={classes.subtext}
                        >
                          has successfully completed all courses in{" "}
                          {item.name_phase.name} and received passing grades
                          from Alterra Academy Online Learning.
                        </Typography>
                      </div>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            component="p"
                            className={classes.issued}
                            align="left"
                          >
                            Issued on
                            {item.date_certificate}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            component="p"
                            align="right"
                          >
                            {item.certificate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ) : null}
            </div>
          ))
        : null}
    </React.Fragment>
  );
}
