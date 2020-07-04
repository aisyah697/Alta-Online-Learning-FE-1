import React, { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import ReactPlayer from "react-player";
import UserContext from "../../store/userContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    marginBottom: theme.spacing(5),
  },
  content: {
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: theme.spacing(5),
    paddingTop: 0,
  },
  title: {
    textAlign: "center",
    color: theme.palette.secondary.secondary,
  },
  media: {
    height: theme.spacing(30),
  },
  intro: {
    color: theme.palette.secondary.secondary,
  },
  description: {
    color: "#7E7E7E",
  },
  video: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(7),
  },
  frame: {
    border: "none",
    marginTop: theme.spacing(4),
  },
  vidCaption: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
}));

const SubjectContent = (props) => {
  const classes = useStyles();
  const [cookies] = useCookies();

  const { mentee_, token_ } = useContext(UserContext);
  const [mentee, setMentee] = mentee_;
  const [tokenMentee, setTokenMentee] = token_;

  const [course, setCourse] = React.useState();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/historysubject/subject/" + "3";
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
          setCourse(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={classes.content}>
      <Toolbar />
      <div>
        {course
          ? course.map((value, index) => (
              <div>
                {value.lock_key ? (
                  <div key={index}>
                    <h1 className={classes.title}>{value.subject.name}</h1>
                    <h2 className={classes.intro}>Introduction</h2>
                    <Typography paragraph className={classes.description}>
                      {value.subject.description}
                    </Typography>
                    <div>
                      {value.file_subject.map((item, index) => (
                        <div key={index}>
                          {item.category_file === "presentation" ? (
                            <div>
                              <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=${item.content_file}`}
                                width="100%"
                                height="520px"
                                frameBorder="0"
                                className={classes.frame}
                              ></iframe>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                className={classes.vidCaption}
                              >
                                PPT: {item.name}
                              </Typography>
                            </div>
                          ) : (
                            <div>
                              <div className={classes.video}>
                                <ReactPlayer
                                  playing={false}
                                  width={800}
                                  height={400}
                                  config={{
                                    file: {
                                      attributes: {
                                        onContextMenu: (e) =>
                                          e.preventDefault(),
                                      },
                                    },
                                  }}
                                  controls={true}
                                  url={item.content_file}
                                />
                              </div>
                              <div className={classes.vidCaption}>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  Video: {item.name}
                                </Typography>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </main>
  );
};

export default SubjectContent;
