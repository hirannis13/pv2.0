import React, { createContext, useState } from "react";
import { Snackbar, Slide, SnackbarContent } from "@mui/material";
import styled from "@emotion/styled";

const StyledSnackbarContent = styled(SnackbarContent)`
  && {
    background-color: ${({ backgroundcolor }) => backgroundcolor};
    color: ${({ textcolor }) => textcolor};
    display: flex;
    align-items: center;
    & .MuiSvgIcon-root {
      margin-right: 8px; /* Adjust the margin as needed */
    }
  }
`;

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState();
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");

  const showSnackbar = (message, duration, backgroundColor, textColor) => {
    setMessage(message);
    setDuration(duration);
    setBackgroundColor(backgroundColor);
    setTextColor(textColor);
    setOpen(true);
    setTimeout(() => {
      handleClose();
    }, duration || 3000);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage("");
    setBackgroundColor("");
    setTextColor("");
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={duration || 3000}
        onClose={handleClose}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "left" }}
      >
        <StyledSnackbarContent
          message={message}
          backgroundcolor={backgroundColor}
          textcolor={textColor}
        />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const showSnackbar = React.useContext(SnackbarContext);
  if (!showSnackbar) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return showSnackbar;
};
