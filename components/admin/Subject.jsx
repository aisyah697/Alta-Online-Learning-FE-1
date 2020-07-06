import React from "react";
import {
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import dynamic from "next/dynamic";

import EditQuizSubject from "./EditQuizSubject";
import axios from "axios";
import { useCookies } from "react-cookie";
import AdminContext from "../../store/adminContext";

const AddLiveCode = dynamic(() => import("./AddLivecode"));
const SubjectVideo = dynamic(() => import("./SubjectVideo"));
const SubjectPPT = dynamic(() => import("./SubjectPPT"));
const SubjectQuiz = dynamic(() => import("./SubjectQuiz"));
const EditLiveCode = dynamic(() => import("./EditLiveCode"));
const Loading = dynamic(() => import("./../Loading"));
const AddPostQuiz = dynamic(() => import("./AddPostQuiz"));
const DeleteQuiz = dynamic(() => import("./DeleteQuiz"));

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
  headingOfHeadField: {
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
  panelUtama: {
    display: "block",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
}));

export default function SubjectAdmin({ subject }) {
  const classes = useStyles();
  const { load_ } = React.useContext(AdminContext);
  const [cookies] = useCookies();
  const [load, setLoad] = load_;
  const [livecode, setLivecode] = React.useState();
  const [loading, setLoading] = React.useState();

  React.useEffect(() => {
    const urlLivecode = process.env.NEXT_PUBLIC_BASE_URL + "/livecode";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(urlLivecode, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin.token,
          },
        });
        if (response.status === 200) {
          if (response.data) {
            setLivecode(
              response.data.filter(
                (item) => item.exam_id === subject.exam[0].id
              )
            );
          }
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [load]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className={classes.root}>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header-4"
          className={classes.headingOfHeadField}
        >
          <Typography variant="body1" className={classes.heading}>
            Subject Description:
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.panelUtama}>
          <List component="nav">
            <Typography className={classes.allText}>
              {subject.description}
            </Typography>
          </List>
        </AccordionDetails>

        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header-3"
          className={classes.headingField}
        >
          <Typography variant="body1" className={classes.heading}>
            Video
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {subject.video ? (
            subject.video.map((element, num) => (
              <SubjectVideo
                key={num}
                name={element.name}
                video={element.content_file}
              />
            ))
          ) : (
            <Typography> No Data </Typography>
          )}
        </AccordionDetails>
        <List component="nav" />

        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header-2"
          className={classes.headingField}
        >
          <Typography variant="body1" className={classes.heading}>
            Presentation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {subject.presentation ? (
            subject.presentation.map((element, num) => (
              <SubjectPPT
                key={num}
                name={element.name}
                press={element.content_file}
              />
            ))
          ) : (
            <Typography>No Data</Typography>
          )}
        </AccordionDetails>

        {subject.exam[0] ? (
          <div>
            {subject.exam[0].type_exam === "quiz" ? (
              <div>
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header-1"
                  className={classes.headingField}
                >
                  <Typography variant="body1" className={classes.heading}>
                    Quiz: {subject.name}
                  </Typography>
                  {subject.exam[0].quiz[0] ? (
                    <>
                      <EditQuizSubject quiz={subject.exam[0].quiz[0]} />
                      <DeleteQuiz ID={subject.exam[0].quiz[0].id} />
                    </>
                  ) : (
                    <AddPostQuiz exam={subject.exam[0]} />
                  )}
                </AccordionSummary>
                {subject.exam[0].quiz[0] ? (
                  <>
                    <SubjectQuiz quiz={subject.exam[0].quiz[0]} />
                  </>
                ) : null}
              </div>
            ) : (
              <div>
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className={classes.headingField}
                >
                  <Typography variant="body1" className={classes.heading}>
                    Live Code
                  </Typography>
                  {livecode ? (
                    <div>
                      {livecode[0] ? (
                        <EditLiveCode livecode={livecode[0]} />
                      ) : null}
                    </div>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  {livecode ? (
                    <div>
                      {livecode[0] ? (
                        <div>
                          <Typography className={classes.allText}>
                            <strong>Name :</strong>
                          </Typography>
                          <Typography className={classes.allText}>
                            {livecode[0].name}
                          </Typography>
                          <br />
                          <Divider />
                          <br />
                          <Typography className={classes.allText}>
                            <strong>Description:</strong>
                          </Typography>
                          <Typography className={classes.allText}>
                            {livecode[0].description}
                          </Typography>
                          <br />
                          <Divider />
                          <br />
                          <Typography className={classes.allText}>
                            <strong>Link:</strong>
                          </Typography>
                          <a href={livecode[0].link}>
                            <Typography className={classes.allText}>
                              {livecode[0].link}
                            </Typography>
                          </a>
                        </div>
                      ) : (
                        <AddLiveCode examID={subject.exam[0].id} />
                      )}
                    </div>
                  ) : (
                    <AddLiveCode examID={subject.exam[0].id} />
                  )}
                </AccordionDetails>
              </div>
            )}
          </div>
        ) : null}
        <List component="nav" />
      </div>
    );
  }
}
