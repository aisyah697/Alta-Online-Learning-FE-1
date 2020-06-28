import React, {useContext} from "react";
import Head from "next/head";
import FooterBar from "../../../../components/FooterBar";
import NavigationAdminBar from "../../../../components/admin/NavigationBarAdmin";
import FormEditProfileAdmin from "../../../../components/admin/EditProfileAdmin";
import {makeStyles} from "@material-ui/core/styles";
import AdminContext from "../../../../store/adminContext";
import ErrorPage from "next/error";

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(3, 8),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2.5, 2),
            fontSize: "14px",
        },
    },
}));

export default function EditProfileAdmin() {
    const classes = useStyles();
    const {login_} = useContext(AdminContext);
    const [login, setLogin] = login_

    if (!login) {
        return <ErrorPage statusCode={404}/>
    } else {
        return (
            <React.Fragment>
                <Head>
                    <title>Admin | Edit Profile</title>
                </Head>
                <NavigationAdminBar/>
                <main className={classes.main}>
                    <FormEditProfileAdmin/>
                </main>
                <FooterBar/>
            </React.Fragment>
        );
    }
}
