import { useState } from "react";
import styled from "@emotion/styled";
import { IconButton, Typography, Card } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { ChevronRight } from "@mui/icons-material";
import TaskList from "./TaskList";
import Iconify from "../utils/Iconify";
import useModal from "../../hooks/useModal";

const CalendarControlContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const TaskListContainer = styled(Card)`
  width: 17vw;
  border-radius: 1.7rem 0rem 0rem 1.7rem;
  max-height: 50vh;
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom, #6b8d8a 0%, var(--green) 100%);
`;

const MonthYear = styled(Typography)`
  margin: 1vh 0;
`;

const CalendarWithTasksContainer = styled("div")`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const CalendarContainer = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 48%;
  padding: 2rem;
  border-radius: 1.7rem;
  height: 53vh;
  background-color: white;
`;

const ArrowIconLeft = styled(ChevronLeft)`
  font-size: 2rem;
`;
const ArrowIconRight = styled(ChevronRight)`
  font-size: 2rem;
`;

const GridContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 1rem;
  column-gap: 4rem;
  margin-top: 4vh;

  .weekdays {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    font-weight: 0;
    font-size: 1.2rem;
    color: var(--stext);
  }
`;

const DayCell = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  cursor: pointer;

  &.current-day {
    background-color: var(--highlight);
    color: var(--mtext);
    border-radius: 50%;
  }

  &.selected-day {
    background-color: transparent;
    color: var(--mtext);
    background-color: transparent;
    color: black;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px var(--yellow);
  }
`;

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { updateModalState } = useModal();
  const handleOpenModal = () => {
    updateModalState(true);
  };

  const handlePreviousMonth = () => {
    setSelectedDate((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1;
      const prevYear = prevDate.getFullYear();
      return new Date(prevYear, prevMonth, 1);
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1;
      const nextYear = prevDate.getFullYear();
      return new Date(nextYear, nextMonth, 1);
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
    const days = [];

    const currentDate = new Date(); // Get the current date

    const handleDayClick = (day) => {
      setSelectedDate(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
      );
    };

    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < weekdays.length; i++) {
      days.push(
        <div key={`weekday-${i}`} className="weekdays">
          {weekdays[i]}
        </div>
      );
    }

    for (let i = 1; i < firstDayOfMonth; i++) {
      days.push(<DayCell key={`prev-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay =
        i === currentDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      const isSelectedDay =
        i === selectedDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      days.push(
        <DayCell
          key={i}
          onClick={() => handleDayClick(i)}
          className={`${isCurrentDay ? "current-day" : ""} ${
            isSelectedDay ? "selected-day" : ""
          }`}
        >
          {i}
        </DayCell>
      );
    }

    return days;
  };
  return (
    <CalendarWithTasksContainer>
      <div>
        <TaskListContainer
          sx={{
            boxShadow: 4,
            padding: "2vh 0",
            position: "relative",
            top: "3vh",
          }}
        >
          <TaskList selectedDate={selectedDate} />
        </TaskListContainer>
        <IconButton
          disableRipple
          sx={{
            position: "relative",
            left: "40%",
          }}
          onClick={handleOpenModal}
        >
          <Iconify
            icon={"material-symbols:add-circle-rounded"}
            width={48}
            height={48}
            sx={{
              color: "var(--green)",
              backgroundColor: "var(--white)",
              borderRadius: "100%",
              "&:hover": {
                color: "var(--yellow)",
              },
            }}
          />
        </IconButton>
      </div>
      <CalendarContainer sx={{ boxShadow: 4 }}>
        <CalendarControlContainer>
          <IconButton onClick={handlePreviousMonth}>
            <ArrowIconLeft sx={{ color: "var(--mtext)" }} />
          </IconButton>
          <MonthYear
            sx={{ width: "20vw", textAlign: "center", color: "var(--mtext)" }}
            variant="h5"
          >
            {selectedDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </MonthYear>
          <IconButton onClick={handleNextMonth}>
            <ArrowIconRight sx={{ color: "var(--mtext)" }} />
          </IconButton>
        </CalendarControlContainer>
        <GridContainer>{renderCalendarDays()}</GridContainer>
      </CalendarContainer>
    </CalendarWithTasksContainer>
  );
};

export default Calendar;
