import React from "react";
import "./RegisterPage.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default class RegisterPage extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    const { username, password } = this.state;
    const classes = makeStyles(theme => ({
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
      },
      button: {
        margin: theme.spacing(1),
        width: 200
      }
    }));

    const handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    };

    const authorization = type => () => {
      const url = `http://smktesting.herokuapp.com/api/${type}/`;
      const body = JSON.stringify({
        username: username,
        password: password
      });
      let requestText = "";

      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, false);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(body);
      if (xhr.status === 200 || xhr.status === 201) {
        requestText = JSON.parse(xhr.responseText);
        localStorage.setItem("Token", requestText.token);
        window.history.back();
      } else {
        console.error(xhr.status + ": " + xhr.statusText);
      }
    };

    const {
      match: {
        params: { type }
      }
    } = this.props;

    return (
      <div className="register-page">
        <TextField
          id="outlined-name"
          label="User-name"
          className={classes.textField}
          value={username}
          onChange={handleChange("username")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          value={password}
          onChange={handleChange("password")}
          margin="normal"
          variant="outlined"
        />
        <Button
          onClick={authorization(type)}
          variant="outlined"
          color="primary"
          className={classes.button}
        >
          {type}
        </Button>
      </div>
    );
  }
}
