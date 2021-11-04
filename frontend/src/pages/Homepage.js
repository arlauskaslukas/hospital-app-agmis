import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    marginBlock: "10px",
    height: "100%",
  },
  section: {},
}));

export const Homepage = ({ LoginStatus }) => {
  const classes = useStyles();
  if (!LoginStatus) {
    return (
      <div>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h4">
                  Welcome to the health system app
                </Typography>
                <Typography variant="h6" style={{ marginBlock: "41px" }}>
                  You are not logged in. Please log in or register to access
                  system.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                className={classes.paper}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginBlock: "20px" }}
                  href="/register"
                >
                  Register as a receptionist or doctor
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginBlock: "20px" }}
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginBlock: "20px" }}
                >
                  Forgot your password?
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <Paper className={classes.paper}>
            <Typography variant="h4" textAlign={"left"}>
              You are logged in.
            </Typography>
          </Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" textAlign="left">
                  User information
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Full name:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Email:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Profession:
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" textAlign="left">
                  Hospital information
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" textAlign="left">
                  Patients information
                </Typography>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button variant="outlined">Review hospital patients</Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" textAlign="left">
                  Your upcoming appointments
                </Typography>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button variant="outlined">Review your appointments</Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" textAlign="left">
                  Prescription drugs database
                </Typography>
                <Typography variant="body1" textAlign="left">
                  TOP 10 prescribed drugs by prescriptions quantity
                </Typography>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button variant="outlined">Access database</Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
};
