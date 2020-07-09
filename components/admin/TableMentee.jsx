import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useCookies } from "react-cookie";
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
import Link from "next/link";

import AdminContext from "../../store/adminContext";

const DeleteUserPopUp = dynamic(() => import("./DeleteMentee"));

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  scroll: {
    marginTop: theme.spacing(4),
    width: "100%",
    overflowY: "hiden",
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
    width: "2000px",
  },
  textInTable: {
    fontFamily: "Muli, sans-serif",
    height: "60px",
    fontSize: `calc(0.5em + 0.5vw)`,
    color: theme.palette.secondary.secondary,
  },
  link: {
    fontFamily: "Muli, sans-serif",
    height: "60px",
    fontSize: `calc(0.5em + 0.5vw)`,
    color: theme.palette.secondary.secondary,
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
    "&:-webkit-any-link": {
      textDecoration: "none",
    },
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

const headTable = [
  "Username",
  "Email",
  "Phone",
  "Address",
  "Birth Place",
  "Birth Date",
  "Background",
  "Github",
  "Current Progress",
  "Task 1",
  "Task 2",
  "Task 3",
  "",
];

export default function TableMentee() {
  const classes = useStyles();
  const [cookies] = useCookies();

  const { admin_, list_, load_, listMentee_, token_ } = useContext(
    AdminContext
  );
  const [load, setLoad] = load_;
  const [listMentee, setListMentee] = listMentee_;
  const [token, setToken] = token_;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/mentee";
    const auth = cookies.token_admin;
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + auth,
          },
        });
        if (response.status === 200) {
          setListMentee(response.data);
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
                  {listMentee
                    ? listMentee.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            className={classes.textInTable}
                            component="th"
                            scope="row"
                          >
                            {index + 1}
                          </TableCell>
                          <Link
                            className={classes.link}
                            href={"/admin/manage/mentee/[id]/[mentee_name]"}
                            as={`/admin/manage/mentee/${row.id}/${row.username}`}
                          >
                            <TableCell
                              className={classes.link}
                              component="th"
                              scope="row"
                            >
                              {row.full_name}
                            </TableCell>
                          </Link>
                        </TableRow>
                      ))
                    : null}
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
                  {listMentee
                    ? listMentee.map((row, key) => (
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
                            {row.background_education}
                          </TableCell>
                          <TableCell
                            className={classes.textInTable}
                            component="th"
                            scope="row"
                          >
                            {row.github}
                          </TableCell>
                          <TableCell
                            className={classes.textInTable}
                            component="th"
                            scope="row"
                          >
                            {row.progress}
                          </TableCell>
                          <TableCell
                            className={classes.textInTable}
                            component="th"
                            scope="row"
                          >
                            <TextField
                              className={classes.taskTextField}
                              size="small"
                              variant="outlined"
                              label={row.task1}
                              placeholder="nilai"
                              color="secondary"
                            />
                          </TableCell>
                          <TableCell
                            className={classes.textInTable}
                            component="th"
                            scope="row"
                          >
                            <TextField
                              className={classes.taskTextField}
                              size="small"
                              variant="outlined"
                              label={row.task2}
                              placeholder="nilai"
                              color="secondary"
                            />
                          </TableCell>
                          <TableCell
                            className={classes.textInTable}
                            component="th"
                            scope="row"
                          >
                            <TextField
                              className={classes.taskTextField}
                              size="small"
                              variant="outlined"
                              label={row.task3}
                              placeholder="nilai"
                              color="secondary"
                            />
                          </TableCell>
                          <TableCell
                            className={classes.deleteMentee}
                            component="th"
                            scope="row"
                          >
                            <DeleteUserPopUp
                              ID={row.id}
                              username={row.username}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
