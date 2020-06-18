import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {ExpandLess} from "@material-ui/icons";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
    bannerBox: {
        backgroundColor: '#F4F7FC',
        fontFamily: 'Muli, sans-serif'
    },
    container: {
        minHeight: '50vh',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        color: theme.palette.secondary.secondary,
        fontWeight: 700,
        paddingBottom: theme.spacing(2),
    },
    list: {
        width: '100%',
        maxWidth: 500,
        fontFamily: 'Muli, sans-serif'
    },
    nested: {
        paddingLeft: theme.spacing(9),
    },
}));

const MyList = ({classes, open, title, content, handleClick}) => {
    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    {open ? <ExpandLess /> : <NavigateNextIcon />}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <Typography>
                            {content}
                        </Typography>
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default function FrequentQuestion () {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const handleClick3 = () => {
        setOpen3(!open3);
    };
    const handleClick4 = () => {
        setOpen4(!open4);
    };

    return (
        <React.Fragment>
            <Box width={'100%'} padding={0} className={classes.bannerBox}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className={classes.container}>
                        <Typography variant={'h5'} className={classes.title}> FAQ </Typography>
                        <>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                className={classes.list}
                            >
                                    <MyList classes={classes}
                                            open={open}
                                            handleClick={handleClick}
                                            title={"Why do I need to take the course?"}
                                            content={"You will need access to a computer with: Operating System: Mac OS X 10.7+ 64-bit,\n" +
                                            "                            Ubuntu 14.04+ 64-bit, or Windows 8+ (64-bit) Web Browser: Firefox 39.0+ or\n" +
                                            "                            Chrome 43+ (Internet Explorer is currently not supported)."}
                                    />
                                    <MyList classes={classes}
                                            open={open2}
                                            handleClick={handleClick2}
                                            title={"Why do I need to take the course?"}
                                            content={"You will need access to a computer with: Operating System: Mac OS X 10.7+ 64-bit,\n" +
                                            "                            Ubuntu 14.04+ 64-bit, or Windows 8+ (64-bit) Web Browser: Firefox 39.0+ or\n" +
                                            "                            Chrome 43+ (Internet Explorer is currently not supported)."}
                                    />
                                    <MyList classes={classes}
                                            open={open3}
                                            handleClick={handleClick3}
                                            title={"Why do I need to take the course?"}
                                            content={"You will need access to a computer with: Operating System: Mac OS X 10.7+ 64-bit,\n" +
                                            "                            Ubuntu 14.04+ 64-bit, or Windows 8+ (64-bit) Web Browser: Firefox 39.0+ or\n" +
                                            "                            Chrome 43+ (Internet Explorer is currently not supported)."}
                                    />
                                    <MyList classes={classes}
                                            open={open4}
                                            handleClick={handleClick4}
                                            title={"Why do I need to take the course?"}
                                            content={"You will need access to a computer with: Operating System: Mac OS X 10.7+ 64-bit,\n" +
                                            "                            Ubuntu 14.04+ 64-bit, or Windows 8+ (64-bit) Web Browser: Firefox 39.0+ or\n" +
                                            "                            Chrome 43+ (Internet Explorer is currently not supported)."}
                                    />

                            </List>
                        </>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}