import React from "react";
import UserList from "../utils/UserList";

function Accounts() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "90%",
          marginBottom: "5vh",
        }}
      ></div>
      <UserList />
    </>
  );
}

export default Accounts;
