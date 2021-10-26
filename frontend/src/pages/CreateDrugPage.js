import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import _ from "lodash";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const useStyles = makeStyles((theme) => ({
  gridItems: {
    marginTop: "20px",
  },
}));

export const CreateDrugPage = () => {
  const styles = useStyles();
  const [Name, setName] = useState("");
  const [ActiveIngredient, setActiveIngredient] = useState("");
  const [Strength, setStrength] = useState(0);
  const [SideEffects, setSideEffects] = useState("");
  const [Contraindications, setContraindications] = useState("");
  const [nonValid, setnonValid] = useState([]);
  const [Success, setSuccess] = useState(false);
  const handleButtonClick = async () => {
    setSuccess(false);
    if (Validation()) {
      //logic for axios
      let res = await SendToDB();
      setSuccess(true);
    }
  };
  const SendToDB = async () => {
    axios.post("http://127.0.0.1:8000/api/drugs", {
      name: Name,
      active_ingredient: ActiveIngredient,
      strength: Strength,
      side_effects: SideEffects,
      contraindications: Contraindications,
    });
  };
  const Validation = () => {
    let isDataValid = true;
    setnonValid([]);
    if (!_.isString(Name) || _.isEqual(Name, "")) {
      isDataValid = false;
      setnonValid((oldVals) => [
        ...oldVals,
        "Drug name is either empty or non-string.",
      ]);
    }
    if (!_.isString(ActiveIngredient) || _.isEqual(ActiveIngredient, "")) {
      isDataValid = false;
      setnonValid((oldVals) => [
        ...oldVals,
        "Drug Active Ingredient is either empty or non-string.",
      ]);
    }
    if (!_.isNumber(Strength)) {
      isDataValid = false;
      setnonValid((oldVals) => [...oldVals, "Drug Strength must be a number."]);
    }
    if (
      !_.isString(SideEffects) ||
      _.isEqual(SideEffects, "") ||
      (SideEffects.length === 1 && !_.isEqual(SideEffects, "-"))
    ) {
      isDataValid = false;
      setnonValid((oldVals) => [
        ...oldVals,
        'Side Effects are being filled with no info. Please use "-" symbol.',
      ]);
    }
    if (
      !_.isString(Contraindications) ||
      _.isEqual(Contraindications, "") ||
      (Contraindications.length === 1 && !_.isEqual(Contraindications, "-"))
    ) {
      isDataValid = false;
      setnonValid((oldVals) => [
        ...oldVals,
        'Contraindications are being filled with no info. Please use "-" symbol.',
      ]);
    }
    return isDataValid;
  };

  return (
    <Container>
      <div>
        <h3>Create a new drug entry</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBlock: "20px",
          }}
        >
          <Button variant="outlined" href="/drugs">
            <ArrowBackIcon /> Go back to the list
          </Button>
        </div>
        {nonValid.length === 0 ? (
          <></>
        ) : (
          <Alert
            variant="filled"
            severity="error"
            style={{ textAlign: "left" }}
          >
            <AlertTitle>Error</AlertTitle>
            Your input data is not valid and does not follow the guidelines:
            <ul>
              {nonValid.map((entry) => (
                <li>{entry}</li>
              ))}
            </ul>
          </Alert>
        )}
        {Success ? (
          <Alert
            variant="filled"
            severity="success"
            style={{ textAlign: "left" }}
          >
            <AlertTitle>Success</AlertTitle>
            Your input data has been successfully uploaded to database.
          </Alert>
        ) : (
          <></>
        )}
        <Grid
          container
          component={Paper}
          paddingBottom={"20px"}
          paddingRight={"20px"}
          marginTop={"20px"}
          spacing={2}
        >
          <Grid className={styles.gridItems} item xs={12} md={3}>
            <TextField
              fullWidth
              variant={"outlined"}
              required
              label="Drug name"
              value={Name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid className={styles.gridItems} item xs={12} md={6}>
            <TextField
              fullWidth
              variant={"outlined"}
              required
              label="Drug Active Ingredient"
              value={ActiveIngredient}
              onChange={(event) => setActiveIngredient(event.target.value)}
            />
          </Grid>
          <Grid className={styles.gridItems} item xs={12} md={3}>
            <TextField
              fullWidth
              variant={"outlined"}
              required
              label="Drug Strength"
              value={Strength}
              onChange={(event) => setStrength(event.target.value)}
            />
          </Grid>
          <Grid className={styles.gridItems} item xs={12}>
            <Typography variant="body1">
              For the following fields fill everything that applies. If nothing
              applies for one or both fields, DO NOT leave them empty. Type in
              "-" sign.
            </Typography>
          </Grid>
          <Grid className={styles.gridItems} item xs={12}>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant={"outlined"}
              required
              label="Drug Side Effects"
              value={SideEffects}
              onChange={(event) => setSideEffects(event.target.value)}
            />
          </Grid>
          <Grid className={styles.gridItems} item xs={12}>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant={"outlined"}
              required
              label="Drug Contraindications"
              value={Contraindications}
              onChange={(event) => setContraindications(event.target.value)}
            />
          </Grid>
        </Grid>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" onClick={handleButtonClick}>
            {" "}
            Save Drug Data
          </Button>
        </div>
      </div>
    </Container>
  );
};
