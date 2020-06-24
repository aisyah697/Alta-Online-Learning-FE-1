import React from "react";
import Head from "next/head";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import dynamic from "next/dynamic";
const CurrentCourse = dynamic(() => import('../components/course/CurrentCourse'))
const PastCourses = dynamic(() => import('../components/course/PastCourse'))
const NavigationBar = dynamic(() => import('../components/NavigationBar'))
const Footer = dynamic(() => import('../components/Footer'))


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F4F7FC'
    },
    bodyContent: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        backgroundColor: "#F4F7FC",
        [theme.breakpoints.up('lg')]:{
            display: 'flex',
        }
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: '15vw',
        [theme.breakpoints.down('sm')]:{
            minWidth: '100vw'
        }
    },
    footer: {
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    tabPanel: {
        minWidth: '85vw',
        textAlign: 'justify',
        [theme.breakpoints.down('sm')]:{
            width: 'auto',
        }
    },
}))

// Tab
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles()
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} className={classes.tabPanel}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: theme.palette.secondary.secondary,
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: `calc(1rem+1vw)`,
        '&:focus': {
            opacity: 1,
        },
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: theme.spacing(1)
    }
}))((props) => <Tab disableRipple {...props} />);

const CoursePage = () => {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <React.Fragment>
            <Head>
                <title>Module | Alta Online Learning</title>
            </Head>
            <main className={classes.root}>
                <NavigationBar/>
                <div className={classes.bodyContent}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <StyledTab label="Current Course" {...a11yProps(0)} />
                        <StyledTab label="Past Courses" {...a11yProps(1)} />
                        <StyledTab label="Certificate" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <CurrentCourse/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PastCourses/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Certificate

                    </TabPanel>
                </div>
                <footer className={classes.footer}>
                    <Footer/>
                </footer>
            </main>
        </React.Fragment>
    )
}

export default CoursePage;

