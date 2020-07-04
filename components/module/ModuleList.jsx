import React, { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import dynamic from "next/dynamic";
import UserContext from "../../store/userContext";
import Loading from "../Loading";
import axios from "axios";

import LockIcon from "@material-ui/icons/Lock";

const Link = dynamic(() => import("../../utils/link"));

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  divider: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(-3),
    width: `calc(0.01em + 0.3vw)`,
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
  },
  modulePicture: {
    width: `calc(10vh + 10vw)`,
    height: `calc(10vh + 10vw)`,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
    },
  },
  modulePictureLock: {
    width: `calc(8vh + 8vw)`,
    height: `calc(8vh + 8vw)`,
    marginLeft: theme.spacing(2),
    color: "#BDBDBD",
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
    },
  },
  textInPage: {
    marginTop: theme.spacing(-1),
    marginLeft: theme.spacing(2),
  },
  judulModule: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.8vw)`,
    color: theme.palette.secondary.secondary,
  },
  judulModuleLock: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.8vw)`,
    color: "#7E7E7E",
  },
  intro: {
    fontFamily: "Muli, sans-serif",
    color: "gray",
    fontStyle: "italic",
    fontSize: `calc(0.7em + 0.4vw)`,
    marginBottom: theme.spacing(1),
  },
  describe: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.4vw)`,
    color: theme.palette.secondary.secondary,
  },
  describeLock: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.4vw)`,
    color: "rgba(0,0,0,0.54)",
  },
  betweenModule: {
    marginBottom: theme.spacing(7),
  },
}));

const data = { name: "01-Module-Python" };

const ModuleList = (props) => {
  const classes = useStyle();
  const router = useRouter();
  const { id } = router.query;

  const [cookies] = useCookies();
  const { mentee_, token_ } = useContext(UserContext);
  const [mentee, setMentee] = mentee_;
  const [tokenMentee, setTokenMentee] = token_;

  const [module, setModule] = React.useState();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/historymodule/subject/" + `${id}`;
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
          setModule(response.data);
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
  }, []);

  if (!id) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        {module
          ? module.map((value, index) => (
              <div>
                {value.lock_key ? (
                  <div key={index} className={classes.root}>
                    <Grid container className={classes.betweenModule}>
                      <Grid
                        item
                        sm={3}
                        xs={12}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                      >
                        <Link
                          href={"/courses/phase/[id]/[module]"}
                          as={`/courses/phase/${id}/${data.name}`}
                        >
                          <img
                            className={classes.modulePicture}
                            src={value.module.image}
                            alt="module-pict"
                          />
                        </Link>
                      </Grid>
                      <Divider
                        orientation="vertical"
                        flexItem
                        className={classes.divider}
                      />
                      <Grid className={classes.textInPage} item sm={8} xs={12}>
                        <Link
                          href={"/courses/phase/[id]/[module]"}
                          as={`/courses/phase/${id}/${data.name}`}
                        >
                          <Typography className={classes.judulModule}>
                            <strong>Module 0{index + 1}: </strong>
                            {value.module.name}
                          </Typography>
                        </Link>
                        <Typography className={classes.intro}>
                          Introduction
                        </Typography>
                        <Typography className={classes.describe}>
                          {value.module.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <div key={index} className={classes.root}>
                    <Grid container className={classes.betweenModule}>
                      <Grid
                        item
                        sm={3}
                        xs={12}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                      >
                        <Link
                          href={"/courses/phase/[id]/[module]"}
                          as={`/courses/phase/${id}/${data.name}`}
                        >
                          <LockIcon className={classes.modulePictureLock} />
                        </Link>
                      </Grid>
                      <Divider
                        orientation="vertical"
                        flexItem
                        className={classes.divider}
                      />
                      <Grid className={classes.textInPage} item sm={8} xs={12}>
                        <Link
                          href={"/courses/phase/[id]/[module]"}
                          as={`/courses/phase/${id}/${data.name}`}
                        >
                          <Typography className={classes.judulModuleLock}>
                            <strong>Module 0{index + 1}: </strong>
                            {value.module.name}
                          </Typography>
                        </Link>
                        <Typography className={classes.intro}>
                          Introduction
                        </Typography>
                        <Typography className={classes.describeLock}>
                          {value.module.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </div>
            ))
          : null}
      </div>
    );
  }
};

export default ModuleList;
