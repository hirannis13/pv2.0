import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import UserWelcome from "../userWelcome/userWelcome";
import TiktokComponent from "../socialcheck/tiktok";
import Calendar from "../calendar/Calendar";
import InstagramComponent from "../socialcheck/instagram";

function Dashboard() {
  // const showSnackbar = useSnackbar();

  // const handleAction = () => {
  //   showSnackbar("Action completed!", 3000, "green", "white");
  // };

  return (
    <div>
      <Grid
        container
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={"5vh"}
      >
        <UserWelcome />
        <Grid
          container
          columnSpacing={"22vw"}
          rowSpacing={"5vh"}
          justifyContent={"center"}
          marginTop={"7vh "}
        >
          <Grid item>
            <InstagramComponent />
          </Grid>
          <Grid item>
            <TiktokComponent />
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop={"13vh"} marginBottom={"10vh"}>
        <Calendar />
      </Box>
    </div>
  );
}

export default Dashboard;
