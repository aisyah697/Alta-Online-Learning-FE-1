import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from "../../utils/ScrollTop";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from '@material-ui/icons/Menu';
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link from "../../utils/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    },
    toolbar : {
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8),
        },
    },
    navLogo: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    menu: {
        color: theme.palette.secondary.secondary,
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(3),
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    button : {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        padding: '7px 20px',
        textTransform: 'none',
        borderRadius: theme.spacing(10),
        minWidth: theme.spacing(12),
        '&:hover' : {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            borderColor: theme.palette.secondary.main,
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menuLogo: {
        backgroundColor: theme.palette.secondary.secondary,
        padding: theme.spacing(3),
        paddingTop: theme.spacing(3),
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    paper: {
        minWidth: '20vw',
    },
    infoUser: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(2),
        display: 'flex'
    },
    infoName: {
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(1)
    },
    avatarPop: {
        paddingTop: theme.spacing(0)
    },
    popMenu: {
        paddingTop: 0,
        paddingBottom: 0,
        color: theme.palette.common.black
    },
    scrollTop: {
        backgroundColor: 'rgba(244,117,46,0.6)',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    }
}));

export default function NavigationAdminBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const NavBarLogo = (
        <>
            <Card elevation={0} className={classes.navLogo}>
                <Link href="/admin">
                    <img height="60" src="/images/logo_navbar.png" alt="Logo Navbar"/>
                </Link>
            </Card>
        </>
    )

    const MenuBar = (
        <>
            <Typography className={classes.menu} variant="h6" noWrap>
                Academic
            </Typography>
            <Typography className={classes.menu} variant="h6" noWrap>
                Mentees
            </Typography>
            <Typography className={classes.menu} variant="h6" noWrap>
                Admin
            </Typography>
            <Typography className={classes.menu} variant="h6" noWrap>
                Help
            </Typography>
        </>
    )

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Popper open={isMenuOpen}
                anchorEl={anchorEl}
                role={undefined}
                transition
                disablePortal
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'center bottom' }}
                >
                    <Paper elevation={1} className={classes.paper}>
                        <div className={classes.menuLogo}>
                            <img height="60" src="/images/logo_popper.png" alt="Logo Navbar"/>
                        </div>
                        <div className={classes.infoUser}>
                            <div className={classes.avatarPop}>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="primary"
                                >
                                    <Avatar> A </Avatar>
                                </IconButton>
                            </div>
                            <div className={classes.infoName}>
                                <Typography style={{fontSize: '18px'}}> Agus Dwi Sasongko</Typography>
                                <Typography style={{fontSize: '14px'}}> agusdwi@alterra.id </Typography>
                            </div>
                        </div>
                        <ClickAwayListener onClickAway={handleMenuClose}>
                            <MenuList autoFocusItem={isMenuOpen} id="menu-list-grow" >
                                <Link href="/admin/profile">
                                    <MenuItem onClick={handleMenuClose} className={classes.popMenu}>
                                        <IconButton aria-label="show 4 new mails" color="inherit">
                                            <SettingsIcon/>
                                        </IconButton>
                                        <p>Manage Your Account</p>
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={handleMenuClose} className={classes.popMenu}>
                                    <IconButton aria-label="show 4 new mails" color="inherit">
                                        <ExitToAppIcon/>
                                    </IconButton>
                                    <p>Logout</p>
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Avatar />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar>
                <Toolbar classes={{gutters:classes.toolbar}}>
                    {NavBarLogo}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {MenuBar}
                        <div className={'menuButton'}>
                            <Link href="/admin/login">
                                <Button variant="outlined" aria-label="login"
                                        className={classes.button}
                                        style={{ marginRight: '15px' }}>
                                    Login
                                </Button>
                            </Link>
                            <Link href="/admin/register">
                                <Button variant="outlined" aria-label="signUp"
                                        className={classes.button} >
                                    SignUp
                                </Button>
                            </Link>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="secondary"
                            >
                                <Avatar className={classes.avatar}> A </Avatar>
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            {renderMenu}
            {renderMobileMenu}

            <ScrollTop {...props}>
                <Fab className={classes.scrollTop} color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon color="primary" />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}
