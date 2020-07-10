import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import dynamic from "next/dynamic";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import FormLabel from "@material-ui/core/FormLabel";

const AddAltaTest = dynamic(() => import("./AddAltatest"));
const EditAltaTest = dynamic(() => import("./EditAltatest"));
const DeleteAltaTest = dynamic(() => import("./DeleteAltatest"));

const useStyles = makeStyles((theme) => ({
  search: {
    margin: theme.spacing(1),
    width: "50%",
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
  dropDown: {
    margin: theme.spacing(1),
    width: "20%",
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
  button: {
    width: "20%",
  },
  card: {
    backgroundColor: "#F4F7FC",
    margin: theme.spacing(0, 0, 5, 0),
  },
  item: {
    color: theme.palette.secondary.secondary,
  },
  iconSearch: {
    color: "silver",
  },
}));

export default function AltaTestFilter(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    keyword: "",
    sort: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Card variant="outlined" elevation={0} className={classes.card}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <TextField
            className={classes.search}
            size="small"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
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
            <InputLabel color="secondary">Sort by</InputLabel>
            <Select
              label="phase"
              value={values.sort}
              onChange={handleChange("sort")}
            >
              <MenuItem value="" className={classes.item}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"name"} className={classes.item}>
                Name
              </MenuItem>
              <MenuItem value={"progress"} className={classes.item}>
                Progress
              </MenuItem>
              <MenuItem value={"id"} className={classes.item}>
                IdF
              </MenuItem>
            </Select>
          </FormControl>
          <AddAltaTest className={classes.button} />
        </Grid>
      </Card>
    </div>
  );
}
