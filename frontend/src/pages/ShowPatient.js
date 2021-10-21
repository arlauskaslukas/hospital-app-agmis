import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  Button,
  Container,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import _ from "lodash";

export const ShowPatient = () => {
  let { id } = useParams();
  const [Patient, setPatient] = useState(null);
  useEffect(() => {
    const axiosCall = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/patients/${id}`);
      setPatient(res.data);
      console.log(res.data);
    };
    axiosCall();
  }, []);
  const formatDate = (string) => {
    let returnable = _.replace(string, new RegExp(".[0-9]*Z"), "");
    returnable = _.replace(returnable, "T", " ");
    return returnable;
  };
  if (Patient === null) {
    return <Typography variant="h3">Loading...</Typography>;
  }
  return (
    <div>
      <Container>
        <Typography variant="h5" textAlign="left">
          Basic information about the patient{" "}
          {Patient === null ? "" : Patient.full_name}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBlock: "20px",
          }}
        >
          <Button variant="outlined" href="/patients">
            <ArrowBackIcon /> Go back to the list
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableRow>
              <TableCell>
                <b>Patient's full name</b>
              </TableCell>
              <TableCell>{Patient.full_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Age</b>
              </TableCell>
              <TableCell>{Patient.age}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Patient email</b>
              </TableCell>
              <TableCell>{Patient.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Patient's known contraindications</b>
              </TableCell>
              <TableCell>{Patient.possible_contraindications}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Patient added to the subsystem at</b>
              </TableCell>
              <TableCell>{formatDate(Patient.created_at)}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <Typography
          variant="h5"
          textAlign="left"
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
          {Patient.appointments.length === 0
            ? "Patient has no appointments"
            : "Patient's appointments"}
        </Typography>
        {Patient.appointments.map((appointment) => (
          <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Appointment Reason</b>
                  </TableCell>
                  <TableCell>{appointment.appointment_reason}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Appointment Time</b>
                  </TableCell>
                  <TableCell>
                    {formatDate(appointment.appointment_time)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}

        <Typography
          variant="h5"
          textAlign="left"
          style={{ paddingBlock: "20px" }}
        >
          {Patient.prescriptions.length === 0
            ? "Patient has no prescription records"
            : "Patient's prescriptions"}
        </Typography>
        {Patient.prescriptions.map((prescription) => (
          <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Prescribed drug and active ingredient</b>
                  </TableCell>
                  <TableCell>
                    {prescription?.drug[0].name} -{" "}
                    {prescription?.drug[0].active_ingredient}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Prescribed drug usage</b>
                  </TableCell>
                  <TableCell>
                    {prescription.special_usage_instructions}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Valid until</b>
                  </TableCell>
                  <TableCell>{prescription.valid_until}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Prescribed at</b>
                  </TableCell>
                  <TableCell>{formatDate(prescription.created_at)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Doctor name and specialty</b>
                  </TableCell>
                  <TableCell>
                    {prescription.doctor.personal_data.name},{" "}
                    {prescription.doctor.specialty}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </Container>
    </div>
  );
};
