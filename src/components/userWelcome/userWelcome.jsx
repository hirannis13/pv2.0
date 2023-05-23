import React, { useState, useEffect } from "react";
import { auth, db } from "../../service/authService";
import { doc, getDoc } from "firebase/firestore";
import { Card, CardContent, Typography } from "@mui/material";
import "./welcome.css";

const UserWelcome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        getDoc(userRef)
          .then((doc) => {
            if (doc.exists) {
              setUser({ uid: authUser.uid, name: doc.data().name });
            } else {
              console.log("No user data found");
            }
          })
          .catch((error) => {
            console.log("Error getting user data:", error);
          });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Card
      sx={{
        display: "flex",
        height: "15vh",
        width: "70%",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "1.7rem",
        boxShadow: 4,
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          zIndex: "2",
          position: "absolute",
          left: "0",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: "2rem", color: "var(--mtext)" }}
        >
          {user ? `Hello, ${user.name}` : "Not logged in"}
        </Typography>
      </CardContent>
      <CardContent sx={{ p: "0" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={`${process.env.PUBLIC_URL}/images/mainimg.png`}
            alt="welcome"
            loading="lazy"
            width="1500vw"
            height="auto"
            className="welcome-img"
            style={{
              position: "relative",
              zIndex: 0,
              marginTop: "15vh",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                "linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
              zIndex: 1,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserWelcome;
