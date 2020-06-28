import React, {useContext} from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import AdminContext from "../../../../store/adminContext";
const ProfileAdmin = dynamic(() => import('../../../../components/admin/ProfileAdmin'))
const NavigationAdminBar = dynamic(() => import('../../../../components/admin/NavigationBarAdmin'))
const FooterBar = dynamic(() => import('../../../../components/FooterBar'))

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(3, 8),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2.5, 2),
            fontSize: "14px",
        },
    },
}));

const ProfileAdminPage = () => {
    const classes = useStyles();
    const {login_} = useContext(AdminContext);
    const [login, setLogin] = login_

    if (!login) {
        return <ErrorPage statusCode={404}/>
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