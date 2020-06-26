import React, {useContext} from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CssBaseline from '@material-ui/core/CssBaseline';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Avatar from "@material-ui/core/Avatar";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Menu from "@material-ui/core/Menu";
import Grow from "@material-ui/core/Grow";
import Fab from '@material-ui/core/Fab';
import dynamic from "next/dynamic";
import NextLink from 'next/link';
import UserContext from "../store/userContext";
import {Cookies} from "react-cookie";

const ScrollTop = dynamic(() => import('../utils/scrollTop'));
const Link = dynamic(() => import('../utils/link'));

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

const cookies = new Cookies();
const NavigationBar = (props) => {
    const classes = useStyles();
    const {login, signOut} = useContext(UserContext);
    const user = cookies.get('user')

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

    const doSignOut = () => {
        signOut();
        handleMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const NavBarLogo = (
            <React.Fragment>
                <Card elevation={0} className={classes.navLogo}>
                    <Link href="/">
                        <img height="60" src={"/images/logo_navbar.png"} alt="Logo NavBar"/>
                    </Link>
                </Card>
            </React.Fragment>
    )

    const MenuBar = (
        <React.Fragment>
            <NextLink href={'/courses'}>
                <Typography className={classes.menu} variant="h6" noWrap>
                    Courses
                </Typography>
            </NextLink>
            <Typography className={classes.menu} variant="h6" noWrap>
                Certification
            </Typography>
            <NextLink href={'/courses/phase/[id]'} as={`/courses/phase/${1}`}>
                <Typography className={classes.menu} variant="h6" noWrap>
                    All Courses
                </Typography>
            </NextLink>
            <Typography className={classes.menu} variant="h6" noWrap>
                Help
            </Typography>
        </React.Fragment>
    )

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Popper open={isMenuOpen}
                anchorEl={anchorEl}
                role={undefined}
                transition
                disablePortal
        >
            {({ TransitionProps, placement}) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'center bottom' }}
                >
                    <Paper elevation={1} className={classes.paper}>
                        <div className={classes.menuLogo}>
                            <img height="60" src={"/images/logo_popper.png"} alt="Logo NavBar"/>
                        </div>
                        <div className={classes.infoUser}>
                            <div className={classes.avatarPop}>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="primary"
                                >
                                    <Avatar src={'/images/avatar_example.jpg'}/>
                                </IconButton>
                            </div>
                            <div className={classes.infoName}>
                                <Typography style={{fontSize: '18px'}}> {user.full_name} </Typography>
                                <Typography style={{fontSize: '14px'}}> {user.email} </Typography>
                            </div>
                        </div>
                        <ClickAwayListener onClickAway={handleMenuClose}>
                            <MenuList autoFocusItem={isMenuOpen} id="menu-list-grow" >
                                <Link href={'/mentee/[profile]'} as={`/mentee/${user.username}`}>
                                    <MenuItem onClick={handleMenuClose} className={classes.popMenu}>
                                        <IconButton aria-label="show 4 new mails" color="inherit">
                                            <SettingsIcon/>
                                        </IconButton>
                                        <p>Manage Your Account</p>
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={doSignOut} className={classes.popMenu}>
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
        <div>
            <CssBaseline />
            <AppBar>
                <Toolbar classes={{gutters:classes.toolbar}}>
                    {NavBarLogo}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {MenuBar}
                        <div className={'menuButton'}>
                            {login ?
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="secondary"
                                >
                                    <Avatar className={classes.avatar} src={'/images/avatar_example.jpg'}/>
                                </IconButton> :
                                <>
                                    <Link href={'/login'}>
                                        <Button variant="outlined" aria-label="login"
                                                className={classes.button}
                                                style={{marginRight: '15px'}}>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href={'/register'}>
                                        <Button variant="outlined" aria-label="signUp"
                                                className={classes.button}>
                                            SignUp
                                        </Button>
                                    </Link>
                                </>
                            }
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
        </div>
    );
}

export default NavigationBar;
