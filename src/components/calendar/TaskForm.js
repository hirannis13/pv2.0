import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@mui/material";
import useModal from "../../hooks/useModal";
import styled from "@emotion/styled";
import { storeTaskInFirestore } from "../../service/authService";
import convertSelectedDay from "../utils/DateConversion";
import { useSnackbar } from "../utils/SnackBarContext";

const StyledForm = styled("form")``;

const ColorButtonSubmit = styled(Button)`
  color: var(--white);
  background-color: var(--green);
  &:hover {
    color: var(--yellow);
    background-color: var(--green);
  }
`;

const ColorButtonCancel = styled(Button)`
  color: var(--green);
  border-style: solid;
  border-color: var(--green);
  border-width: 1px;
  &:hover {
    color: var(--yellow);
    background-color: var(--green);
  }
`;

const TaskForm = ({ selectedDay }) => {
  const [startTime, setStartTime] = useState("");
  const [task, setTask] = useState("");
  const { updateModalState } = useModal();
  const showSnackbar = useSnackbar();

  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        timeOptions.push(
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        );
      }
    }
    return timeOptions;
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleTaskChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 200) {
      setTask(inputValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    storeTaskInFirestore(
      convertSelectedDay(selectedDay),
      startTime,
      task,
      showSnackbar
    );
    // Reset form fields
    setStartTime("");
    setTask("");
    updateModalState(false);
  };

  const handleCloseModal = () => {
    updateModalState(false);
    setStartTime("");
    setTask("");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Box sx={{ columnGap: "2rem" }}>
        <FormControl fullWidth>
          <InputLabel id="start-time-label">Start Time</InputLabel>
          <Select
            labelId="start-time-label"
            id="start-time"
            value={startTime}
            onChange={handleStartTimeChange}
            required
          >
            {generateTimeOptions()}
          </Select>
        </FormControl>

        <TextField
          label="Describe your task in less than 200 chars"
          id="task"
          value={task}
          onChange={handleTaskChange}
          multiline
          fullWidth
          required
          inputProps={{ maxLength: 200 }}
        />
      </Box>
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          marginTop: "5%",
        }}
      >
        <ColorButtonSubmit type="submit" sx={{ width: "20%" }}>
          Submit
        </ColorButtonSubmit>
        <ColorButtonCancel sx={{ width: "20%" }} onClick={handleCloseModal}>
          Cancel
        </ColorButtonCancel>
      </Box>
    </StyledForm>
  );
};

export default TaskForm;
