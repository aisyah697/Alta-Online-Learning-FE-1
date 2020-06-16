import React from 'react';
import Link from '../utils/Link'
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    bannerBox: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F4F7FC'
    },
    bannerTitle: {
        position: 'absolute',
        color: theme.palette.common.white,
        fontSize: `calc(1rem + 1.5vw)`,
        padding: theme.spacing(3),
        fontFamily: 'Bellota, cursive',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // bannerButton: {
    //     marginTop: theme.spacing(2),
    //     width: '100%',
    //     height: theme.spacing(6),
    //     borderRadius: theme.spacing(10),
    //     borderColor: '#939292',
    //     color: theme.palette.common.white,
    //     [theme.breakpoints.up("lg")]: {
    //         width: '100%',
    //     },
    //     '&:hover': {
    //         backgroundColor: 'rgba(111,227,61,0.85)',
    //         color: '#090101',
    //         borderColor: 'rgba(47,34,30,0.62)',
    //     }
    // },
    // bannerImage: {
    //     display: 'block',
    //     boxSizing: 'border-box',
    //     width: '100%',
    //     height: '500px',
    //     objectFit: 'cover',
    //     [theme.breakpoints.down("sm")]: {
    //         height: 'auto',
    //         minHeight: '63vh'
    //     },
    // },
    // link: {
    //     width: '20%',
    //     [theme.breakpoints.down("sm")]: {
    //         width: 'auto'
    //     },
    // }
}));

export default function HomeBanner () {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Box pt={5} mt={1} width={'100%'} padding={0} className={classes.bannerBox}>
                <img src=""
                     alt="Cover"
                     className={classes.bannerImage}
                />
                <div className={classes.bannerTitle}>
                    ALTA ONLINE LEARNING

                    <Link href={"/about"} className={classes.link}>
                        <Button className={classes.bannerButton}
                                variant="outlined"
                                startIcon={<SearchIcon/>}
                        >
                            BROWSE
                        </Button>
                    </Link>
                </div>
            </Box>
        </React.Fragment>
    )
}