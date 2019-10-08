import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    width: "100%"
  },
  resize: {
    fontSize: "20px"
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    fontSize: "16px",
    width: "220px",
    marginLeft: "10px"
  }
});

class SearchForm extends Component {
  state = { value: "" };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="outlined-name"
          label="Search for a user"
          value={this.state.value}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
          InputProps={{
            classes: { input: classes.resize }
          }}
          InputLabelProps={{
            classes: { root: classes.resize }
          }}
        />
        <div className={classes.buttonDiv}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Search
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(SearchForm);
