import React, { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import LockIcon from "@material-ui/icons/Lock";
import Paper from "@material-ui/core/Paper";

import UserContext from "../../store/userContext";
import ProgressData from "../Progress";
import Loading from "../Loading";

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
    width: `calc(15vw)`,
    height: `calc(20vh)`,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
    },
  },
  modulePictureLock: {
    width: `calc(8vw + 8vw)`,
    height: `calc(8vh + 8vh)`,
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

  React.useEffect(() => {
    setLoading(true);
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + `/historymodule/subject/${id}`;
    const fetchData = async function () {
      try {
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
  }, [id]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        {module ? (
          module.map((value, index) => (
            <div key={index}>
              {value.lock_key ? (
                <div key={index} className={classes.root}>
                  <Grid container className={classes.betweenModule}>
                    <Grid
                      item
                      sm={4}
                      xs={12}
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Link
                        href={"/courses/phase/[id]/[id_module]/[module]"}
                        as={`/courses/phase/${id}/${
                          value.module_id
                        }/${value.module.name.split(" ").join("-")}`}
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
                    <Grid className={classes.textInPage} item sm={7} xs={12}>
                      <Link
                        href={"/courses/phase/[id]/[id_module]/[module]"}
                        as={`/courses/phase/${id}/${
                          value.module_id
                        }/${value.module.name.split(" ").join("-")}`}
                      >
                        <Typography className={classes.judulModule}>
                          <strong>Module 0{index + 1}: </strong>
                          {value.module.name}
                        </Typography>
                      </Link>
                      <Typography className={classes.intro}>
                        Introduction to {value.module.name}
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
                      sm={4}
                      xs={12}
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <LockIcon className={classes.modulePictureLock} />
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      className={classes.divider}
                    />
                    <Grid className={classes.textInPage} item sm={7} xs={12}>
                      <Typography className={classes.judulModuleLock}>
                        <strong>Module 0{index + 1}: </strong>
                        {value.module.name}
                      </Typography>
                      <Typography className={classes.intro}>
                        Introduction to {value.module.name}
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
        ) : (
          <ProgressData />
        )}
      </div>
    );
  }
};

export default ModuleList;
