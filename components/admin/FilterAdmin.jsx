import React, {useContext} from "react";
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
    // borderColor: theme.palette.primary.secondary,
  },
  search: {
    margin: theme.spacing(1),
    width: `calc(29em + 25vw)`,
    backgroundColor: "white",
    "& .MuiOutlinedInput-root": {
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
    "& .MuiOutlinedInput-root": {
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
}));

export default function FilterAdmin() {
  const classes = useStyles();
  const [values, setValues] = React.useState({ keyword: '', role: '', sort: '' })

  const {admin_, list_, load_} = useContext(AdminContext);
  const [admin, setAdmin] = admin_
  const [list, setList] = list_
  const [load, setLoad] = load_

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
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
            placeholder="search"
            onChange={handleChange('keyword')}
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
                onChange={handleChange('role')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"super"}>Super</MenuItem>
              <MenuItem value={"academy"}>Academy</MenuItem>
              <MenuItem value={"conseling"}>Conseling</MenuItem>
              <MenuItem value={"bisnis"}>Bisnis</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.dropDown}
          >
            <InputLabel color="secondary">Sort By</InputLabel>
            <Select 
                label="Sort By"
                value={values.sort}
                name="sort"
                onChange={handleChange('sort')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"id"}>ID</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"role"}>Role</MenuItem>
            </Select>
          </FormControl>
          <button onClick={fetchData}>
            aaaa
          </button>
        </Grid>
      </CardActions>
    </Card>
  );
}
