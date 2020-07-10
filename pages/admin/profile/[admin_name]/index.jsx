import React, { useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { makeStyles } from "@material-ui/core/styles";

const NavigationAdminBar = dynamic(() => import('../../../../components/admin/NavigationBarAdmin'))
const ProfileAdmin = dynamic(() => import('../../../../components/admin/ProfileAdmin'))
const FooterBar = dynamic(() => import('../../../../components/FooterBar'))
const Loading = dynamic(() => import('../../../../components/Loading'))

import AdminContext from "../../../../store/adminContext";

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(3, 8),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2.5, 2),
            fontSize: "14px",
        },
        minHeight: `calc(100vh - 230px)`
    },
}));

const ProfileAdminPage = () => {
    const classes = useStyles()

    const {login_} = useContext(AdminContext);
    const [login, setLogin] = login_

    if (!login) {
        return <Loading />
    } else {
        return (
            <React.Fragment>
                <Head>
                    <title>Admin | Profile</title>
                </Head>
                <NavigationAdminBar/>
                <main className={classes.main}>
                    <ProfileAdmin/>
                </main>
                <FooterBar/>
            </React.Fragment>
        );
    }
}

export default ProfileAdminPage;