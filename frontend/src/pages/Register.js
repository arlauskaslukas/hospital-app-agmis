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

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBlock: "20px",
  },
}));

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [HospitalsFromDB, setHospitalsFromDB] = useState([]);
  const [Specialty, setSpecialty] = useState("");
  const [Hospital, setHospital] = useState(0);
  const [Errors, setErrors] = useState([]);
  const cookies = new Cookies();
  const RetrieveHospitals = async () => {
    const results = await axios.get("http://127.0.0.1:8000/api/hospitals");
    setHospitalsFromDB(results.data);
  };
  useEffect(() => RetrieveHospitals(), []);
  const styles = useStyles();

  const HandleRegistration = async () => {
    if (ValidateForm()) {
      //logic for registering.
      const results = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        profession: profession,
        hospital_id: Hospital,
        specialty: Specialty,
      });
      console.log(results);
      cookies.set("Authorization", results.data.token);
    }
  };

  const ValidateForm = () => {
    let email_regex = new RegExp("\\w+@\\w+\\.[a-z]+");
    setErrors([]);
    let isDataValid = true;
    if (name === "") {
      isDataValid = false;
      setErrors((oldvals) => [...oldvals, "Name should not be empty."]);
    }
    if (!email_regex.test(email)) {
      isDataValid = false;
      setErrors((oldvals) => [
        ...oldvals,
        "Email is not valid. It should follow the convention of example@example.com.",
      ]);
    }
    if (email !== emailConfirmation) {
      isDataValid = false;
      setErrors((oldvals) => [...oldvals, "Email in both fields don't match."]);
    }
    if (password === "") {
      isDataValid = false;
      setErrors((oldvals) => [
        ...oldvals,
        "Password field should not be empty.",
      ]);
    }
    if (profession === "") {
      isDataValid = false;
      setErrors((oldvals) => [
        ...oldvals,
        "Profession field should not be left empty.",
      ]);
    }
    if (Hospital === 0) {
      isDataValid = false;
      setErrors((oldvals) => [
        ...oldvals,
        "Hospital should be picked, regardless of your profession.",
      ]);
    }
    if (profession === "Doctor" && Specialty === "") {
      isDataValid = false;
      setErrors((oldvals) => [
        ...oldvals,
        "Specify of which specialty doctor you are.",
      ]);
    }
    return isDataValid;
  };

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
          <Error title="Registration failed:" nonValid={Errors} />
        )}
        <Paper elevation={2} style={{ padding: "30px", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button variant="outlined" href="/drugs">
              <ArrowBackIcon /> Go back to the list
            </Button>
          </div>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            REGISTER AS A NEW RECEPTIONIST OR DOCTOR
          </Typography>
          <TextField
            fullWidth
            variant={"outlined"}
            label={"Full Name"}
            className={styles.formField}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            fullWidth
            variant={"outlined"}
            label={"Email"}
            className={styles.formField}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            fullWidth
            variant={"outlined"}
            label={"Confirm email"}
            className={styles.formField}
            required
            value={emailConfirmation}
            onChange={(event) => setEmailConfirmation(event.target.value)}
          />
          <TextField
            fullWidth
            variant={"outlined"}
            label={"Password"}
            className={styles.formField}
            required
            type={"password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Grid container spacing={2} className={styles.formField}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="hospitalselect">Select Hospital</InputLabel>
                <Select
                  fullWidth
                  labelId="hospitalselect"
                  id={"hospitals"}
                  value={Hospital}
                  label="Select Hospital"
                  onChange={(event) => setHospital(event.target.value)}
                >
                  {HospitalsFromDB.map((hospital) => (
                    <MenuItem value={hospital.id}>
                      {hospital.title} - {hospital.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="professionselect">Select Profession</InputLabel>
                <Select
                  fullWidth
                  id={"professionselect"}
                  value={profession}
                  label="Select Profession"
                  onChange={(event) => setProfession(event.target.value)}
                >
                  <MenuItem value="Doctor">Doctor</MenuItem>
                  <MenuItem value="Receptionist">Receptionist</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {profession === "Doctor" ? (
            <TextField
              required
              fullWidth
              variant={"outlined"}
              label={"Specialty"}
              className={styles.formField}
              value={Specialty}
              onChange={(event) => setSpecialty(event.target.value)}
            />
          ) : (
            <></>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => HandleRegistration()} variant={"contained"}>
              Register
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};
