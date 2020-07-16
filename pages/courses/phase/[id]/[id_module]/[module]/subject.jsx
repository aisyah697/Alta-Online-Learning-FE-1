import React from "react";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "next/link";
import {Typography} from "@material-ui/core";

const AvailableSubjects = dynamic(() =>
  import("../../../../../../components/module/AvailableSubject")
);
const ModuleOverview = dynamic(() =>
  import("../../../../../../components/module/ModuleOverview")
);
const NavigationBar = dynamic(() =>
  import("../../../../../../components/NavigationBar")
);
const Loading = dynamic(() => import("../../../../../../components/Loading"));
const FooterBar = dynamic(() =>
  import("../../../../../../components/FooterBar")
);

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(3, 8),
        marginBottom: theme.spacing(20),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2.5, 2),
            fontSize: "14px",
        },
        minHeight: `calc(55vh)`,
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(5),
    },
    h1: {
        color: theme.palette.secondary.secondary,
        marginTop: theme.spacing(1),
    },
    breadcrumb: {
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
    link: {
        textDecoration: 'none',
        "&:link": {
            textDecoration: 'none',
        },
        cursor: 'pointer'
    }
}));

export default function ModuleDetailOverview() {
  const classes = useStyles();
  const router = useRouter();
  const { id, id_module, module } = router.query;
  const [cookies] = useCookies();

  const [subject, setSubject] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + `/historymodule/subject/${id}`;
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
            <Head>
                <title>Module Overview | Alta Online Learning</title>
            </Head>
            <NavigationBar />
        {loading ? (
          <Loading />
        ) : (
            <div>
            <main className={classes.main}>
                <div className={classes.breadcrumb}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link color="inherit" href="/">
                            <Typography className={classes.link}>Home</Typography>
                        </Link>
                        <Link color="inherit" href={"/courses/phase/[id]"} as={`/courses/phase/${id}`}>
                            <Typography className={classes.link}>Phase                                                                                                                                                                                            {id}</Typography>
                        </Link>
                        <Link color="inherit" href={"/courses/phase/[id]/[id_module]/[module]"} as={`/courses/phase/${id}/${id_module}/${module}`}>
                            <Typography className={classes.link}>{module? module.split('-').join(" "): null}</Typography>
                        </Link>
                        <Typography color="textPrimary">Subjects</Typography>
                    </Breadcrumbs>
                </div>
                <h1 className={classes.h1}>Course Overview</h1>
                <br/>
                {subject ?
                    subject.filter(mod => mod.module_id == id_module).map((value, index) => (
                <ModuleOverview key={index} modules={value} />)) : <p>Loading...</p> }
                <br/>
                <h1 className={classes.h1}>Available Subjects</h1>
                <AvailableSubjects />
            </main>
            </div> )}
            <FooterBar />
        </React.Fragment>
    );
}
