import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import AdminContext from "../../../store/adminContext";
import ErrorPage from "next/error";

const FilterMentee = dynamic(() =>
  import("../../../components/admin/FilterMentee")
);
const TableMentee = dynamic(() =>
  import("../../../components/admin/TableMentee")
);
const Footer = dynamic(() => import("../../../components/FooterBar"));
const NavigationAdminBar = dynamic(() =>
  import("../../../components/admin/NavigationBarAdmin")
);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0, 2, 0),
    backgroundColor: "#F4F7FC",
    minHeight: `calc(100vh - 179px)`,
  },
  main: {
    margin: theme.spacing(4, 8),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2.5, 2),
      fontSize: "14px",
    },
  },
}));

export default function Mentee() {
  const classes = useStyles();
  const { admin_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;

  if (admin.role !== "super") {
    return <ErrorPage statusCode={404} />;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>Admin | Mentee</title>
        </Head>
        <NavigationAdminBar />
        <main className={classes.root}>
          <div className={classes.main}>
            <FilterMentee />
            <TableMentee />
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}
