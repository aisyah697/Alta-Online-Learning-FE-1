import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import AdminContext from "../../store/adminContext";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: "#F4F7FC",
    borderRadius: "6px",
  },
  search: {
    margin: theme.spacing(1),
    width: `calc(29em + 25vw)`,
    backgroundColor: "white",
    borderRadius: "10px",
    color: theme.palette.secondary.secondary,
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  dropDown: {
    margin: theme.spacing(1),
    width: `calc(9em + 2vw)`,
    backgroundColor: "white",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  iconSearch: {
    color: "silver",
  },
  item: {
    color: theme.palette.secondary.secondary,
  },
}));

export default function FilterAdmin() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    keyword: "",
    role: "",
    sort: "",
  });

  const { admin_, list_, load_ } = useContext(AdminContext);
  const [admin, setAdmin] = admin_;
  const [list, setList] = list_;
  const [load, setLoad] = load_;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  console.log("CEK VALUES", values);
  return (
    <Card variant="outlined" className={classes.root}>
      <CardActions>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <TextField
            className={classes.search}
            size="small"
            variant="outlined"
            id="search"
            placeholder="Search"
            onChange={handleChange("keyword")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchSharpIcon className={classes.iconSearch} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            variant="outlined"
            size="small"
            className={classes.dropDown}
          >
            <InputLabel color="secondary">Category</InputLabel>
            <Select
              label="category"
              value={values.role}
              name="role"
              onChange={handleChange("role")}
            >
              <MenuItem value="" className={classes.item}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"super"} className={classes.item}>
                Super
              </MenuItem>
              <MenuItem value={"academy"} className={classes.item}>
                Academy
              </MenuItem>
              <MenuItem value={"conseling"} className={classes.item}>
                Counsel
              </MenuItem>
              <MenuItem value={"bisnis"} className={classes.item}>
                Business
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.dropDown}
          >
            <InputLabel color="secondary">Sort by</InputLabel>
            <Select
              label="Sort by"
              value={values.sort}
              name="sort"
              onChange={handleChange("sort")}
            >
              <MenuItem value="" className={classes.item}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"name"} className={classes.item}>
                Name
              </MenuItem>
              <MenuItem value={"username"} className={classes.item}>
                Username
              </MenuItem>
              <MenuItem value={"role"} className={classes.item}>
                Role
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </CardActions>
    </Card>
  );
}
