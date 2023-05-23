import React, { useState, useEffect } from "react";
import { Card, Typography, Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../service/authService";
import CircularAnalyticsWithLabel from "../utils/CircularAnalyticsWithLabel";

const InstagramComponent = () => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchDays = async () => {
      const querySnapshot = await getDocs(collection(db, "igcheck"));
      const daysData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      setDays(daysData);
    };

    fetchDays();
  }, []);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const findCurrentDay = days.find((day) =>
    day.id.includes(currentDay.toLowerCase())
  );

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "fit-content",
          borderRadius: "1.7rem",
          padding: "2vh 3vw",
          boxShadow: 4,
          backgroundImage:
            "linear-gradient(to bottom, rgba(138, 58, 185, 0.15), rgba(188, 42, 141, 0.15), rgba(251, 173, 80, 0.15))",
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: "0 2vw 0 0",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularAnalyticsWithLabel percentage={findCurrentDay?.percentage} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            flexDirection: "column",
            paddingX: "2vh",
          }}
        >
          <Typography variant="h5" sx={{ color: "var(--mtext)" }}>
            Instagram
          </Typography>
          <Typography
            variant="h6"
            fontSize={"1rem"}
            sx={{
              padding: "0 0 1vh 0",
              color: "var(--stext)",
            }}
          >
            {currentDay}
          </Typography>
          <Typography variant="h6" sx={{ color: "var(--mtext)" }}>
            {" "}
            {findCurrentDay?.timeone}
          </Typography>
          <Typography variant="h6" sx={{ color: "var(--mtext)" }}>
            {" "}
            {findCurrentDay?.timetwo}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default InstagramComponent;
