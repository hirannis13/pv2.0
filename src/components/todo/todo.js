import React from "react";
import { Typography } from "@mui/material";

function Todo() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/images/comingsoon.svg`}
        alt="Coming Soon"
      />
      <Typography variant="h3" sx={{ color: "var(--mtext)" }}>
        Coming Soon...
      </Typography>
    </div>
  );
}

export default Todo;
