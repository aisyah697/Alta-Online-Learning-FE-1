import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        // paddingLeft: theme.spacing.unit * 4
    },
    pastList: {
    },
    grow: {
        flexGrow: 1
    }
});

class NestedList extends React.Component {
    state = { open: {} };

    handleClick = key => () => {
        console.log(key);
        this.setState({ [key]: !this.state[key] });
    };

    render() {
        const { lists, classes } = this.props;

        return (
            <div className={classes.root}>
                <List
                    component="nav"
                >
                    {lists.map(({ key, label, icon: Icon, items }) => {
                        const open = this.state[key] || false;
                        return (
                            <div className={classes.pastList} key={key}>
                                <ListItem onClick={this.handleClick(key)}>
                                    <Typography>{label}</Typography>
                                    <div className={classes.grow}/>
                                    <Typography>5 of 5 completed</Typography>
                                    <div className={classes.grow}/>
                                    <Button variant={'outlined'}>Feedback Form</Button>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <hr/>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {items.map(({ key: childKey, label: childLabel, icon: ChildIcon }) => (
                                            <ListItem key={childKey} className={classes.nested}>
                                                <Typography>{childKey}</Typography>
                                                <div className={classes.grow}/>
                                                <Typography>{childLabel}</Typography>
                                                <div className={classes.grow}/>
                                                <ListItemText inset primary={ChildIcon} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        );
                    })}
                </List>
            </div>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NestedList);