import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto, sans-serif",
  },
  table: {
    maxWidth: "100%",
    border: "none",
    fontSize: "14px",
  },
  tableBody: {
    borderBottom: "none",
    fontSize: "16px",
    padding: "6px 10px 10px 0px",
    color: theme.palette.secondary.secondary
  },
  h1: {
    color: theme.palette.secondary.secondary,
  },
  viewProfile: {
    margin: "auto",
    textAlign: "right",
  },
  buttonProfile: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
    boxShadow: "none",
    cursor: "pointer",
    border: "1px solid #F47522",
    WebkitBorderRadius: "2em",
    padding: theme.spacing(1, 2),
    transition: "all 0.5s ease",
    textTransform: "capitalize",
    letterSpacing: ".02em",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#ffffff",
      boxShadow: "none",
      border: "1px solid #F47522",
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "left",
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
      justifyContent: "center",
    },
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(22),
      height: theme.spacing(22),
    },
  },
  size: {
    paddingLeft: "0px",
  },
}));

export default function ProfileMentee(props) {
  const classes = useStyles();

  function createData(key, data) {
    return { key, data };
  }

  const rows = [
    createData("Full Name", ": Yopi Ragil Permana Putra"),
    createData("Email", ": ragil@alterra.id"),
    createData("Birthday", ": Jombang, 24 April 1994"),
    createData("Telephone", ": 081556852960"),
    createData("Background", ": Teacher"),
    createData("GitHub", ": github.com/yopiragil"),
  ];

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h1 className={classes.h1}>My Profile</h1>
        </Grid>
        <Grid item xs={6} className={classes.viewProfile}>
          <Link href="/mentee/profile/edit">
            <Button
              className={classes.buttonProfile}
              variant="contained"
              color="primary"
            >
              Edit My Profile
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} style={{ margin: "auto" }}>
          <div className={classes.avatar}>
            <Avatar className={classes.large} src={'/images/avatar_example.jpg'}/>
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TableContainer>
            <Table className={classes.size} aria-label="a dense table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.key}>
                    <TableCell className={classes.tableBody} scope="row">
                      {row.key}
                    </TableCell>
                    <TableCell className={classes.tableBody}>
                      {row.data}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
