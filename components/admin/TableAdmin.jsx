import React from "react";
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
const DeleteUserPopUp = dynamic(() => import("./DeleteUser"));

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  scroll: {
    marginTop: theme.spacing(1),
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

function createData(
  id,
  name,
  username,
  role,
  email,
  phoneNumber,
  alamat,
  tempatLahir,
  tanggalLahir,
  githubLink,
  deleteMentee
) {
  return {
    id,
    name,
    username,
    role,
    email,
    phoneNumber,
    alamat,
    tempatLahir,
    tanggalLahir,
    githubLink,
    deleteMentee,
  };
}

const headTable = [
  "Username",
  "Role",
  "Email",
  "Phone number",
  "Alamat",
  "Tempat lahir",
  "Tanggal lahir",
  "Github Link",
  "",
];

const rows = [
  createData(
    1,
    "Aji Pangestu",
    "ajip",
    "Super Admin",
    "ahmadajip@gmail.com",
    "081992828282828",
    "Malang",
    "Klaten",
    "11/11/20000",
    "githubLink.com/ajay",
    ""
  ),
  createData(
    2,
    "Yopi Ragil",
    "yopiragil",
    "Admin Conseling",
    "yopiragil@gmail.com",
    "081992828282828",
    "Malang",
    "Jombang",
    "11/11/20000",
    "githubLink.com/ajay",
    ""
  ),
  createData(
    3,
    "Agus Dwi S",
    "suga",
    "Admin Super",
    "agus.suga@gmail.com",
    "081992828282828",
    "Malang",
    "Solo",
    "11/11/20000",
    "githubLink.com/ajay",
    ""
  ),
  createData(
    4,
    "Aisyah",
    "aisy",
    "Admin Academy",
    "umi.aisyah@gmail.com",
    "081992828282828",
    "Malang",
    "Depok",
    "11/11/20000",
    "githubLink.com/ajay",
    ""
  ),
  createData(
    5,
    "SyahRizal S",
    "badboy",
    "Admin Bisnis",
    "iam.badboy@gmail.com",
    "081992828282828",
    "Malang",
    "Mojokerto",
    "11/11/20000",
    "githubLink.com/ajay",
    ""
  ),
];

export default function TableMentee() {
  const classes = useStyles();

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
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.name}
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
                  {rows.map((row, key) => (
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
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.alamat}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.tempatLahir}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.tanggalLahir}
                      </TableCell>
                      <TableCell
                        className={classes.textInTable}
                        component="th"
                        scope="row"
                      >
                        {row.githubLink}
                      </TableCell>

                      <TableCell
                        className={classes.deleteMentee}
                        component="th"
                        scope="row"
                      >
                        <DeleteUserPopUp />
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
