import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";

const AddAdmin = dynamic(() => import("../../../components/admin/AddAdmin"));
const FilterAdmin = dynamic(() => import("../../../components/admin/FilterAdmin"));
const TableAdmin = dynamic(() => import("../../../components/admin/TableAdmin"));
const Footer = dynamic(() => import("../../../components/FooterBar"));
const NavigationAdminBar = dynamic(() => import("../../../components/admin/NavigationBarAdmin")
);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0, 2, 0),
    backgroundColor: "#F4F7FC",
  },
  main: {
    margin: theme.spacing(4, 8),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2.5, 2),
      fontSize: "14px",
    },
  },
}));

export default function ManageAdmin() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>Admin | Data Admin</title>
      </Head>
      <NavigationAdminBar />
      <main className={classes.root}>
        <div className={classes.main}>
          <FilterAdmin />
          <AddAdmin />
          <TableAdmin />
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
