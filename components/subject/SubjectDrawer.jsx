import React, { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import LockIcon from "@material-ui/icons/Lock";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UserContext from "../../store/userContext";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "../../utils/link";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0,
    top: theme.spacing(2),
  },
  drawerContainer: {
    overflow: "auto",
    paddingBottom: theme.spacing(15),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    paddingRight: theme.spacing(2),
    paddingLeft: "18px",
    color: theme.palette.secondary.secondary,
  },
  module: {
    textTransform: "uppercase",
    fontSize: `calc(1em + 0.5vw)`,
    color: theme.palette.secondary.secondary
  },
  subject: {
    fontSize: `calc(0.8em + 0.5vw)`,
    fontWeight: "bold",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  accordion: {
    WebkitBoxShadow: "none",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  heading: {
    color: theme.palette.secondary.secondary,
  },
  headingLock: {
    color: "#7E7E7E",
  },
  detail: {
    padding: theme.spacing(0, 3, 1, 3),
    color: theme.palette.secondary.secondary,
    cursor: 'pointer'
  },
  detailLock: {
    padding: theme.spacing(0, 3, 1, 3),
    color: "#7E7E7E",
  },
  lastDetail: {
    padding: theme.spacing(2, 3, 1, 3),
    color: theme.palette.secondary.secondary,
  },
  lastDetailLock: {
    padding: theme.spacing(2, 3, 1, 3),
    color: "#7E7E7E",
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
  allText: {
    color: theme.palette.secondary.secondary,
    fontSize: `calc(0.6em + 0.4vw)`,
    fontFamily: "Muli, sans-serif",
  },
}));

const SubjectDrawer = (props) => {
  const classes = useStyles();
  const [cookies] = useCookies();

  const router = useRouter();
  const { id, id_module, module, id_subject, subject_name } = router.query;

  const { mentee_, token_ } = useContext(UserContext);
  const [mentee, setMentee] = mentee_;
  const [tokenMentee, setTokenMentee] = token_;

  const [course, setCourse] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + `/historysubject/subject/${id_module}`;
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
    if (id_module) {
      fetchData();
    }
  }, [id_module]);
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <div className={classes.title}>
          <Link href={'/courses/phase/[id]/[id_module]/[module]/subject'}
                as={`/courses/phase/${id}/${id_module}/${module}/subject`}
          >
          <h1 className={classes.module}>
            {module ? module.split("-").join(" ") : null}
          </h1>
          </Link>
        </div>
        <div>
          {course
            ? course.map((value, index) => (
                <div key={index}>
                  {value.lock_key ? (
                    <div>
                      <Accordion className={classes.accordion}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className={classes.heading}>
                            {value.subject.name}
                          </Typography>
                        </AccordionSummary>
                        <Link href={'/courses/phase/[id]/[id_module]/[module]/[id_subject]/[subject_name]'}
                              as={`/courses/phase/${id}/${id_module}/${module}/${value.subject_id}/${value.subject.name.split(" ").join("-")}`}
                        >
                        <AccordionDetails className={classes.detail}>
                          <LibraryBooksIcon className={classes.icon} />
                          <Link
                            href={`/courses/phase/[id]/[id_module]/[module]/[id_subject]/[subject_name]`}
                            as={`/courses/phase/${id}/${id_module}/${module}/${id_subject}/${subject_name}`}
                          >
                            <Typography className={classes.allText}>
                              Subject Matter
                            </Typography>
                          </Link>
                        </AccordionDetails>
                        </Link>
                        <AccordionDetails className={classes.lastDetail}>
                          <LaptopMacIcon className={classes.icon} />
                          <Link
                            href={`/courses/phase/[id]/[id_module]/[module]/[id_subject]/[subject_name]/quiz`}
                            as={`/courses/phase/${id}/${id_module}/${module}/${id_subject}/${subject_name}/quiz`}
                          >
                            <Typography className={classes.allText}>
                              Exam
                            </Typography>
                          </Link>
                        </AccordionDetails>
                      </Accordion>
                      <Divider />
                    </div>
                  ) : (
                    <div key={index}>
                      <Accordion className={classes.accordion}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className={classes.headingLock}>
                            {value.subject.name}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.detailLock}>
                          <LockIcon className={classes.icon} />
                          <Typography>Materi</Typography>
                        </AccordionDetails>
                        <AccordionDetails className={classes.lastDetailLock}>
                          <LockIcon className={classes.icon} />
                          <Typography>Exam</Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Divider />
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </Drawer>
  );
};

export default SubjectDrawer;
