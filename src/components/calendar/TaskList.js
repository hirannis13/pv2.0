import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import useModal from "../../hooks/useModal";
import Modal from "../utils/Modal";
import TaskForm from "./TaskForm";
import convertSelectedDay from "../utils/DateConversion";
import { fetchTasksFromFirestore } from "../../service/authService";
import styled from "@emotion/styled";
import { useSnackbar } from "../utils/SnackBarContext";

const TaskListContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 50vh;
  width: 100%;
`;
const Tasks = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 1vh 0 0 0;
`;

const TwoLineText = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  hyphens: auto;
  white-space: wrap;
  hyphens: auto;
  margin: 1vh 0.5vw 1vh 1vw;
`;

const TaskList = ({ selectedDate }) => {
  const { openModal } = useModal();
  const [tasks, setTasks] = useState({});
  const [tasksFetched, setTasksFetched] = useState(false);
  const showSnackbar = useSnackbar();

  const selectedDay = selectedDate.toLocaleDateString();
  let convertedDate = convertSelectedDay(selectedDay);

  useEffect(() => {
    fetchTasksFromFirestore(convertedDate, showSnackbar)
      .then((fetchedTask) => {
        setTasks(fetchedTask);
        setTasksFetched(true);
        if (fetchedTask.length === 0) {
          setTasksFetched(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
    setTasksFetched(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertedDate]);

  return (
    <>
      <TaskListContainer sx={{ height: "100%" }}>
        <Typography
          variant="h5"
          sx={{
            margin: "1vh 0 3vh 0",
            color: "var(--white)",
            fontWeight: "light",
            textAlign: "center",
          }}
        >
          To do for {selectedDay}
        </Typography>
        {tasksFetched &&
          tasks.map((task) => (
            <React.Fragment key={task.id}>
              <Tasks>
                <Typography
                  variant="h3"
                  sx={{
                    color: "var(--yellow)",
                    fontSize: "1.2rem",
                    fontWeight: "0",
                    margin: "0.5vh 0 0.5vh 0.5vw",
                  }}
                >
                  {task.startTime}
                </Typography>
                <TwoLineText
                  variant="h3"
                  sx={{
                    color: "var(--white)",
                    fontSize: "1.2rem",
                    fontWeight: "0",
                  }}
                >
                  {task.task}{" "}
                </TwoLineText>
                <Divider
                  sx={{
                    borderColor: "var(--grey)",
                  }}
                />
              </Tasks>
            </React.Fragment>
          ))}
        {!tasksFetched && (
          <Typography
            variant="h3"
            sx={{
              color: "var(--white)",
              fontSize: "1.2rem",
              fontWeight: "0",
              marginTop: "auto",
              marginBottom: "auto",
              textAlign: "center",
            }}
          >
            No tasks yet
          </Typography>
        )}
      </TaskListContainer>

      {openModal && (
        <Modal
          title={"Add a To-Do task"}
          content={<TaskForm selectedDay={selectedDay} />}
        />
      )}
    </>
  );
};

export default TaskList;
