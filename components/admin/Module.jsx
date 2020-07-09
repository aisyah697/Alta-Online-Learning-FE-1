import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";

import { AccordionSummary, Accordion, AccordionDetails } from '@material-ui/core';
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";

import AdminContext from "../../store/adminContext";

const DeleteModule = dynamic(() => import("./DeleteModule"));
const EditModule = dynamic(() => import("./EditModule"));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
  heading: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.7em + 0.5vw)`,
    flexBasis: "100%",
    color: "white",
    fontWeight: "bolder",
  },
  headingField: {
    backgroundColor: theme.palette.secondary.secondary,
    borderRadius: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(5, 0, 1, 0),
  },
  allText: {
    color: theme.palette.secondary.secondary,
    fontFamily: "Muli, sans-serif",
  },
  iconDown: {
    color: "white",
  },
  margins: {
    marginBottom: theme.spacing(2),
  },
  square: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(22),
      height: theme.spacing(22),
    },
  },
  list: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "left",
    objectFit: "contain",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
}));

export default function ModuleAdmin() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [cookies] = useCookies();

  const { admin_, load_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [load, setLoad] = load_;

  const [module, setModule] = React.useState();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/module/nested";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + cookies.admin.token,
          },
        });
        if (response.status === 200) {
          setModule(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
        setLoad(false);
      }
    };
    fetchData();
  }, [load]);

  return (
    <div className={classes.root}>
      {module
        ? module
            .filter((mod) => mod.phase_id == id)
            .map((value, index) => (
              <div className={classes.margins} key={index}>
                <Accordion
                  expanded={expanded === value.id.toString()}
                  onChange={handleChange(value.id.toString())}
                  onClick={(event) => event.stopPropagation()}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.iconDown} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.headingField}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Link
                      href={"/admin/academy/phase/[id]/[id_module]/[module]"}
                      as={`/admin/academy/phase/${id}/${
                        value.id
                      }/${value.name.split(" ").join("-")}`}
                    >
                      <Typography
                        onClick={(event) => event.stopPropagation()}
                        variant="body1"
                        className={classes.heading}
                      >
                        {value.name}
                      </Typography>
                    </Link>
                    <EditModule {...value} id_module={value.id} />
                    <DeleteModule id_module={value.id} />
                  </AccordionSummary>
                  <AccordionDetails>
                    <List component="nav" className={classes.list}>
                      <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={12} sm={4} md={3}>
                          <div className={classes.avatar}>
                            <Avatar
                              variant="square"
                              className={classes.square}
                              src={value.image}
                              alt={"Image"}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Typography className={classes.allText}>
                            <strong>Mentor :</strong>{" "}
                          </Typography>
                          <Typography className={classes.allText}>
                            {value.admin.full_name}
                          </Typography>
                          <Divider className={classes.divider} />
                          <Typography className={classes.allText}>
                            <strong>Description Module :</strong>{" "}
                          </Typography>
                          <Typography className={classes.allText}>
                            {value.description}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Divider className={classes.divider} />
                      <Typography variant="body1" className={classes.allText}>
                        <strong>System Requirements :</strong>{" "}
                      </Typography>
                      <List component="nav">
                        {value.requirement.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <RadioButtonCheckedIcon color="secondary" />
                            </ListItemIcon>
                            <Typography className={classes.allText}>
                              {item.description}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))
        : null}
    </div>
  );
}
