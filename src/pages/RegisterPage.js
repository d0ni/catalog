import React from "react";
import "./RegisterPage.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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

export default function RegisterPage() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const authorization = type => () => {
    const url = `http://smktesting.herokuapp.com/api/${type}/`;
    const body = JSON.stringify({
      username: values.username,
      password: values.password
    });
    let requestText = "";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(body);
    if (xhr.status !== 200) {
      console.error(xhr.status + ": " + xhr.statusText);
    } else {
      requestText = JSON.parse(xhr.responseText);
      localStorage.setItem("Token", requestText.token);
      // document.location.href = "/";
      window.history.back();
    }
  };

  const type = window.location.pathname === "/register/" ? "register" : "login";

  return (
    <div className="register-page">
      <TextField
        id="outlined-name"
        label="User-name"
        className={classes.textField}
        value={values.username}
        onChange={handleChange("username")}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        className={classes.textField}
        type="password"
        value={values.password}
        onChange={handleChange("password")}
        // autoComplete="current-password"
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
