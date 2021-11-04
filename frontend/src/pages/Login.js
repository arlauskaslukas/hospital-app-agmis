import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Error } from "../components/Error";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cookies from "universal-cookie";
import { Alert, AlertTitle } from "@mui/material";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBlock: "20px",
  },
}));

export const Login = () => {
  const styles = useStyles();
  const [Errors, setErrors] = useState([]);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const cookies = new Cookies();
  let history = useHistory();

  const HandleLogin = async () => {
    if (ValidateForm()) {
      axios
        .post("http://127.0.0.1:8000/api/login", {
          email: Email,
          password: Password,
        })
        .then((results) => {
          console.log(results);
          cookies.set("Authorization", results.data.token);
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            setErrors((oldvals) => [...oldvals, "Invalid credentials"]);
            return;
          }
        });
    }
  };
  const ValidateForm = () => {
    let email_regex = new RegExp("\\w+@\\w+\\.[a-z]+");
    setErrors([]);
    let isDataValid = true;
    if (!email_regex.test(Email)) {
      isDataValid = false;
      setErrors((oldvals) => [
        ...oldvals,
        "Email is not valid. It should follow the convention of example@example.com.",
      ]);
    }
    if (Password === "") {
      isDataValid = false;
      setErrors((oldvals) => [
        ...oldvals,
        "Password field should not be empty.",
      ]);
    }
    return isDataValid;
  };
  let auth = cookies.get("Authorization");
  const logout = () => {
    cookies.remove("Authorization");
  };
  if (auth != null || auth != undefined) {
    return (
      <div>
        <Alert
          variant="filled"
          severity="warning"
          style={{ textAlign: "left" }}
        >
          <AlertTitle>
            You are already logged in. Please consider doing one of the
            following actions:
          </AlertTitle>
          <ul>
            <li>
              Return to
              <a href="/"> your dashboard</a>
            </li>
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </Alert>
      </div>
    );
  }
  return (
    <div>
      <Container
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        {Errors.length === 0 ? (
          <></>
        ) : (
          <Error title="Login failed:" nonValid={Errors} />
        )}
        <Paper elevation={2} style={{ padding: "30px", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button variant="outlined" href="/">
              <ArrowBackIcon /> Homepage
            </Button>
          </div>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            LOGIN
          </Typography>
          <TextField
            fullWidth
            variant={"outlined"}
            label={"Email"}
            className={styles.formField}
            required
            value={Email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            fullWidth
            variant={"outlined"}
            label={"Password"}
            className={styles.formField}
            required
            type={"password"}
            value={Password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => HandleLogin()} variant={"contained"}>
              Login
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};
