import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  textFieldQuestion: {
    width: "100%",
    // marginTop: theme.spacing(5),
    width: "100%",
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
  button: {
    background: "#3364ff",
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0, 0, 0, 2),
    color: theme.palette.common.white,
    marginBottom: theme.spacing(5),
    minWidth: theme.spacing(8),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.secondary,
      textDecoration: "none",
      borderColor: theme.palette.secondary.secondary,
    },
  },
  isiChoice: {
    fontFamily: "Muli, sans-serif",
    fontSize: `calc(0.5em + 0.5vw)`,
    color: theme.palette.secondary.secondary,
  },
  expansionChoice: {
    marginLeft: theme.spacing(6),
  },
  buttonPosition: {
    marginLeft: theme.spacing(6),
  },
}));

export default function EditChoice() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel elevation={0}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label=""
          />
          <Typography className={classes.isiChoice}>
            Heldy pertama-tama akan pergi ke Jalan Perintis Kemerdekaan.
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionChoice}>
          <TextField
            id="outlined-multiline-static"
            label="Edit Choice"
            multiline
            color="secondary"
            className={classes.textFieldQuestion}
            rows={2}
            variant="outlined"
          />
        </ExpansionPanelDetails>
        <div className={classes.buttonPosition}>
          <Button className={classes.button} variant="outlined" size="small">
            No
          </Button>
          <Button
            variant="outlined"
            size="small"
            autoFocus
            className={classes.button}
          >
            Yes
          </Button>
        </div>
      </ExpansionPanel>
    </div>
  );
}
