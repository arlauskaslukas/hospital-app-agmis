import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export const Error = ({ title, nonValid = [] }) => {
  return (
    <div>
      <Alert variant="filled" severity="error" style={{ textAlign: "left" }}>
        <AlertTitle>Error</AlertTitle>
        {title}
        <ul>
          {nonValid.map((entry) => (
            <li>{entry}</li>
          ))}
        </ul>
      </Alert>
    </div>
  );
};
