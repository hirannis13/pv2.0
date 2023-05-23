import { Fragment, useEffect, useState } from "react";
import { db } from "../../service/authService";
import { collection, getDocs } from "firebase/firestore";
import { Person } from "@mui/icons-material";
import {
  Avatar,
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import Iconify from "./Iconify";
import Modal from "./Modal";
import useModal from "../../hooks/useModal";
import AccountEditForm from "../accounts/addccountEditForm";
import { auth } from "../../service/authService";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { openModal, updateModalState } = useModal();
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser(""); // Set a default value if user is null
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [openModal]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setUsers(userList);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [openModal]);

  const CustomPerson = ({ imageUrl }) => (
    <div>
      {imageUrl && (
        <img
          style={{ height: "9vh", transform: "translate(0, 1vh)" }}
          src={imageUrl}
          alt="Person"
        />
      )}
    </div>
  );
  const summonEditUserModal = () => {
    updateModalState(true);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {users.length > 0 ? (
          <Card
            sx={{
              width: "30rem",
              boxShadow: 4,
              borderRadius: "1.7rem",
              padding: "3vh 1vw",
            }}
          >
            {users.map((user) => (
              <Fragment key={user.id}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ height: "4rem", width: "4rem", margin: "0 2vw 0 0" }}
                  >
                    {user.imgUrl ? (
                      <CustomPerson
                        key={user.imgId}
                        imageUrl={`${process.env.PUBLIC_URL}` + user.imgUrl}
                      />
                    ) : (
                      <Person />
                    )}
                  </Avatar>
                  <Grid>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "var(--mtext)" }}
                    >
                      {user.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "var(--stext)" }}>
                      {user.email}
                    </Typography>
                  </Grid>
                  {currentUser === user.email ? (
                    <IconButton
                      sx={{
                        marginLeft: "auto",
                        "&:hover": {
                          color: "var(--yellow)",
                        },
                      }}
                      onClick={summonEditUserModal}
                    >
                      <Iconify
                        icon={"material-symbols:edit"}
                        width={24}
                        height={24}
                      />
                    </IconButton>
                  ) : (
                    <IconButton disabled />
                  )}
                </CardContent>
                <Divider
                  orientation="horizontal"
                  role="presentation"
                  flexItem
                  sx={{
                    borderColor: "#48494B",
                    borderRadius: "5px",
                  }}
                />
              </Fragment>
            ))}
          </Card>
        ) : (
          <p>No users found.</p>
        )}
        <IconButton
          disableRipple
          sx={{ transform: "translate(0, -2rem)" }}
          onClick={() => {
            navigate("/signUp");
          }}
        >
          <Iconify
            icon={"material-symbols:add-circle-rounded"}
            width={48}
            height={48}
            sx={{
              backgroundColor: "var(--white)",
              color: "var(--green)",
              borderRadius: "100%",
              "&:hover": {
                color: "var(--yellow)",
              },
            }}
          />
        </IconButton>
      </Box>
      {openModal && (
        <Modal title={"Edit the user"} content={<AccountEditForm />} />
      )}
    </>
  );
};

export default UserList;
