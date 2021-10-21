import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import _, { isFunction } from "lodash";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const PatientList = () => {
  const [page, setPage] = useState(1);
  const [entriesInPage, setEntriesInPage] = useState(5);
  const [Patients, setPatients] = useState([]);
  const [CurrentElements, setCurrentElements] = useState([]);
  const [pageQuantity, setPageQuantity] = useState(1);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const handleElementQtyChange = (e) => {
    setEntriesInPage(e.target.value);
  };

  useEffect(() => {
    const axiosCall = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/patients");
      setPatients(res.data);
      setPageQuantity(Math.ceil(res.data.length / entriesInPage));
      let elements = _.slice(res.data, 0, entriesInPage);
      setCurrentElements(elements);
    };
    axiosCall();
  }, []);

  useEffect(() => {
    //prevent the index problem
    if (page * entriesInPage > Patients.length) setPage(pageQuantity);
    let pageStartIndex = (page - 1) * entriesInPage;
    let pageEndIndex = page * entriesInPage;
    let elements = _.slice(Patients, pageStartIndex, pageEndIndex);
    setPageQuantity(Math.ceil(Patients.length / entriesInPage));
    setCurrentElements(elements);
    console.log(CurrentElements);
  }, [page, entriesInPage]);
  return (
    <div>
      <Container>
        <Typography variant={"h4"} textAlign="left">
          Patients List
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBlock: "20px",
          }}
        >
          <Button variant="contained" href="/patients/create">
            <AddCircleOutlineIcon /> Register new patient
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBlock: "30px",
            paddingBlock: "20px",
          }}
        >
          <FormControl style={{ width: "7vw", marginTop: "20px" }}>
            <InputLabel id="patientsentries">Entries in page</InputLabel>
            <Select
              labelId="patiententries"
              id="patiententries-select"
              value={entriesInPage}
              label="Entries in one page"
              onChange={handleElementQtyChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Full Name</b>
                </TableCell>
                <TableCell>
                  <b>Age</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>View detailed info</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CurrentElements.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.full_name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={"/patient/" + patient.id}
                    >
                      <VisibilityIcon /> MORE INFORMATION
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {Patients.length > entriesInPage ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              count={pageQuantity}
              defaultPage={1}
              showFirstButton
              showLastButton
              page={page}
              onChange={handlePagination}
              variant={"text"}
              color="primary"
              size={"large"}
            />
          </div>
        ) : (
          <></>
        )}
        Currently on page {page}
      </Container>
    </div>
  );
};
