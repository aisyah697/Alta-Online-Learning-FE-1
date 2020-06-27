import React, {useContext} from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Router from "next/router";
import AdminContext from "../../store/adminContext";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    minWidth: theme.spacing(12),
    marginTop: theme.spacing(5),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  buttonInPop: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(10),
    color: theme.palette.common.white,
    marginBottom: theme.spacing(5),
    minWidth: theme.spacing(12),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
    background: "white",
    "&:hover label.Mui-focused": {
      color: "darkBlue",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "darkBlue",
      },
    },
  },
}));

export default function AddAdmin() {
  const classes = useStyles();
  const[open, setOpen] = React.useState(false);
  const[message, setMessage] = React.useState('')
  const{listAdmin, setListAdmin} = useContext(AdminContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const [values, setValues] = React.useState({
    password: "",
    username: "",
    role: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const postNewAdmin = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/admin'

    if (username != '' || password != '') {
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: values.username,
            password: values.password,
            role: values.role
          })
        });
        if (response.ok) {
          const data = await response.json();
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
        }
      } catch (error) {
        console.error("Something Wrong, Please Try Again!", error);
        throw new Error(error);
      }
    } else {
      setMessage('Please enter your username and password');
    }
  }

  const cek = () => {
    handleClose();
  }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        size="medium"
        className={classes.button}
        startIcon={<PersonAddIcon />}
      >
        Add Admin
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <DialogTitle id="form-dialog-title">Add Admin</DialogTitle>
          <DialogContent>
            <TextField
              className={classes.textField}
              variant="outlined"
              color="secondary"
              label="User Name"
              size="small"
              name="username"
              value={values.username}
              onChange={handleChange("username")}
            />
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              size="small"
              color="secondary"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                color="secondary"
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              size="small"
              color="secondary"
            >
              <InputLabel color="secondary">Category</InputLabel>
              <Select
                  label="category"
                  value={values.role}
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="outlined"
              size="medium"
              className={classes.buttonInPop}
            >
              Cancel
            </Button>
            <Button
              onClick={cek}
              variant="outlined"
              size="medium"
              className={classes.buttonInPop}
            >
              Add
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}
