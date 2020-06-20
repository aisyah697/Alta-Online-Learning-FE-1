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

const styles = theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        // paddingLeft: theme.spacing.unit * 4
    },
    pastList: {
        marginTop: theme.spacing(3)
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
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText inset primary={label} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {items.map(({ key: childKey, label: childLabel, icon: ChildIcon }) => (
                                            <ListItem key={childKey} className={classes.nested}>
                                                <ListItemIcon>
                                                    <ChildIcon />
                                                </ListItemIcon>
                                                <ListItemText inset primary={childLabel} />
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