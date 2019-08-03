import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";

export const SelectInput = withStyles(theme => ({
  root: {
    width: "100%"
  },
  input: {
    borderRadius: 6,
    position: "relative",
    color: "#3a4c5a",
    backgroundColor: "#fff",
    border: "2px solid #f6f7fb",
    fontSize: 12,
    padding: "9px 31px 8px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 6,
      borderColor: "#f6f7fb",
      backgroundColor: "#fff"
    }
  }
}))(InputBase);
