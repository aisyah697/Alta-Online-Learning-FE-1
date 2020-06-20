import React from "react";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Done} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

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
    // current course
    text: {
        color: theme.palette.secondary.secondary,
        fontWeight: 'bold'
    },
    currentContent: {
        color: theme.palette.secondary.secondary,
    },
    paper:{
        minHeight: '40vh'
    },
    paperContent: {
        padding: theme.spacing(2),
        color: theme.palette.secondary.secondary,
    },
    infos: {
        display: 'flex'
    },
    box1: {
        minHeight: '100px',
        textAlign: 'center',
        paddingTop: theme.spacing(2)
    },
    box2: {
        paddingTop: theme.spacing(2)
    },
    box3: {
        paddingTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rootList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        padding: '5px 20px',
        textTransform: 'none',
        borderRadius: theme.spacing(1),
        minWidth: theme.spacing(12),
        '&:hover' : {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            borderColor: theme.palette.secondary.main,
        },
    },
    table: {
        minWidth: 700,
    },
    paperPast:{
        minHeight: '10vh',
        display: 'flex',
        alignItems: 'center'
    },
    paperPastContent: {
        padding: theme.spacing(2),
        color: theme.palette.secondary.secondary,
        display: 'flex',
        alignItems: 'center'
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

// Current Course
const CurrentCourse = () => {
    const classes = useStyles();
    
    const MAX = 5;
    const currentProgress = 3
    const normalise = value => (value - 0) * 100 / (MAX);

    return (
        <React.Fragment>
            <div className={classes.text}>
                <Typography>
                    Active Course
                </Typography>
            </div>
            <br/>
            <div className={classes.currentContent}>
                <Paper elevation={0} className={classes.paper}>
                    <div className={classes.paperContent}>
                        <div>
                            <Typography> Modul 1 </Typography>
                            <Typography variant={'h6'}> Python </Typography>
                        </div>
                        <br/>
                        <div>
                            <Grid container className={classes.infos}>
                                <Grid item xs={12} lg={3} className={classes.box1}>
                                    <CircularProgressWithLabel value={normalise(currentProgress)}/>
                                </Grid>
                                <Grid item xs={12} lg={3} className={classes.box2}>
                                    <Typography style={{fontWeight: 'bold'}}> Subject Finished: </Typography>
                                    <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        className={classes.rootList}
                                    >
                                        <ListItemBase subject={'What is Python'} done={true}/>
                                        <ListItemBase subject={'Algorithm in Python'} done={true}/>
                                        <ListItemBase subject={'Basic of Python 1'} done={true}/>
                                        <ListItemBase subject={'Basic of Python 2'}/>
                                        <ListItemBase subject={'Basic of Python 3'}/>
                                    </List>
                                </Grid>
                                <Grid item xs={12} lg={6} className={classes.box3}>
                                    <Button className={classes.button} variant={'outlined'}>
                                        Go to course
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Paper>
                <br/>
                <Paper elevation={0} className={classes.paper}>
                    <CustomizedTables/>
                </Paper>
            </div>
        </React.Fragment>
    )
}

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress size={100} color={'secondary'} variant="static" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

const ListItemBase = ({subject, done}) => {
    return (
        <React.Fragment>
            <ListItem>
                <ListItemText primary={subject} />
                {done ? <Done /> : null}
            </ListItem>
        </React.Fragment>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.secondary.secondary,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, quiz1, quiz2, quiz3) {
    return { name, quiz1, quiz2, quiz3 };
}

const rows = [
    createData('What is Python', 'Bad', 'Bad', 'Good'),
    createData('Algorithm in Python', 'Good', 'Good', 'Good',),
    createData('Basic of Python 1', 'Excellent', 'Excellent', 'Excellent'),
    createData('Basic of Python 2', 'Excellent', 'Excellent', 'Excellent'),
    createData('Basic of Python 3', 'Excellent', 'Excellent', 'Excellent'),
];

function CustomizedTables() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} elevation={1}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Subject</StyledTableCell>
                        <StyledTableCell align="center">Quiz 1</StyledTableCell>
                        <StyledTableCell align="center">Quiz 2</StyledTableCell>
                        <StyledTableCell align="center">Quiz 3</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.quiz1}</StyledTableCell>
                            <StyledTableCell align="center">{row.quiz2}</StyledTableCell>
                            <StyledTableCell align="center">{row.quiz3}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Past Course
const PastCourses = () =>{
    const classes = useStyles();
    return(
        <React.Fragment>
            <div className={classes.text}>
                <Typography>
                    Past Courses
                </Typography>
            </div>
            <br/>
            <div className={classes.currentContent}>
                <Paper elevation={0} className={classes.paperPast}>
                    <div className={classes.paperPastContent}>
                        <div>
                            <Typography> Modul 1: Python Basic </Typography>
                        </div>
                        <br/>
                    </div>
                </Paper>
            </div>
        </React.Fragment>
    )
}
// Certificate

export default function CoursePage() {
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
                        <CurrentCourse/>
                    </TabPanel>
                </div>
                <footer className={classes.footer}>
                    <Footer/>
                </footer>
            </main>
        </React.Fragment>
    )

}