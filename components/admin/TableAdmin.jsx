import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AdminContext from "../../store/adminContext";

const DeleteUserPopUp = dynamic(() => import("./DeleteUser"));

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  scroll: {
    marginTop: theme.spacing(1),
    width: "100%",
    overflowY: "hiden",
    overflowX: "auto",
  },
  table: {
    backgroundColor: "#F4F7FC",
  },
  headerTable: {
    color: "white",
    height: "60px",
    fontSize: `calc(0.5em + 0.5vw)`,
    backgroundColor: theme.palette.secondary.secondary,
  },
  paperTable: {
    width: "100vw",
  },
  textInTable: {
    fontFamily: "Muli, sans-serif",
    height: "60px",
    fontSize: `calc(0.5em + 0.5vw)`,
    color: theme.palette.secondary.secondary,
  },
  taskTextField: {
    height: "20px",
    width: "60px",
    marginTop: "-10px",
    padding: 0,
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  tableNameId: {
    [theme.breakpoints.up("lg")]: {
      paddingBottom: "12px",
    },
  },
}));

import useFetch from "../../utils/useFetch";
import axios from "axios";

export default function TableMentee() {
  const classes = useStyles();

  const { admin_, list_, load_, token_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [list, setList] = list_;
  const [load, setLoad] = load_;
  const [token, setToken] = token_;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/admin";
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });
        if (response.status === 200) {
          setList(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
        setLoad(false);
      }
    };
    fetchData();
  }, [load]);

  const headTable = [
    "Username",
    "Role",
    "Email",
    "Phone",
    "Address",
    "Birth Place",
    "Birth Date",
    "Github",
    "Delete",
  ];

  return (
    <div>
      <Grid container>
        <Grid item xs={4} lg={3}>
          <TableContainer className={classes.root} component={Paper}>
            <Paper className={classes.tableNameId}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.headerTable}>
                  <TableRow>
                    <TableCell className={classes.headerTable} align="left">
                      ID
                    </TableCell>
                    <TableCell className={classes.headerTable} align="left">
                      Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.full_name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
        </Grid>
        <Grid item xs={8} lg={9}>
          <TableContainer
            className={(classes.root, classes.scroll)}
            component={Paper}
          >
            <Paper className={classes.paperTable}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {headTable.map((data, index) => (
                      <TableCell
                        key={index}
                        className={classes.headerTable}
                        align="left"
                      >
                        {data}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((row, key) => (
                    <TableRow key={key}>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.username}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.role}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.phone}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.address}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.place_birth}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.date_birth}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.github}
                      </TableCell>

                      <TableCell
                        className={classes.deleteMentee}
                        component="th"
                        scope="row"
                      >
                        <DeleteUserPopUp ID={row.id} username={row.username} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
