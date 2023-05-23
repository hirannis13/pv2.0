/* eslint-disable no-template-curly-in-string */
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { signUp, assignName } from "../../service/authService";
import Iconify from "../../components/utils/Iconify";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "../../components/utils/SnackBarContext";
import styled from "@emotion/styled";
import { Fragment } from "react";

const ColorButtonSubmit = styled(Button)`
  color: var(--white);
  background-color: var(--green);
  &:hover {
    color: var(--yellow);
    background-color: var(--green);
  }
`;

export const imageContainer = [
  { id: 1, imgUrl: `${process.env.PUBLIC_URL}/images/viking1.svg` },
  { id: 2, imgUrl: `${process.env.PUBLIC_URL}/images/viking2.svg` },
  { id: 3, imgUrl: `${process.env.PUBLIC_URL}/images/viking3.svg` },
  { id: 4, imgUrl: `${process.env.PUBLIC_URL}/images/viking4.svg` },
  { id: 5, imgUrl: `${process.env.PUBLIC_URL}/images/viking5.svg` },
];

export default function SignUp() {
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name cannot be empty");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = () => {
    if (email.trim() === "") {
      setEmailError("Email cannot be empty");
      return false;
    }
    if (!email.includes("@")) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleImageSelect = (imageId) => {
    const selectedImg = imageContainer.find((img) => img.id === imageId);
    setSelectedImage(selectedImg);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isNameValid && isEmailValid && isPasswordValid) {
      const data = new FormData(event.currentTarget);
      try {
        await signUp(data.get("email"), data.get("password"), showSnackbar);
        assignName(navigate, data.get("name"), selectedImage, showSnackbar);
      } catch (error) {
        showSnackbar(
          "Error signing up or assigning name",
          3000,
          "var(--yellow)",
          "black"
        );
      }
    }
  };

  return (
    <Fragment>
      {" "}
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <Iconify
          icon={"material-symbols:arrow-back-rounded"}
          width={24}
          height={24}
        />
      </IconButton>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!nameError}
                  helperText={nameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ marginTop: "1rem", justifyContent: "space-evenly" }}
            >
              {imageContainer.map((img) => (
                <Grid key={img.id} item>
                  <img
                    src={img.imgUrl}
                    alt={`Viking img ${img.id}`}
                    onClick={() => handleImageSelect(img.id)}
                    style={{
                      cursor: "pointer",
                      filter:
                        selectedImage?.id === img.id
                          ? "drop-shadow(0 0 5px blue)"
                          : "none",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <ColorButtonSubmit fullWidth type="submit" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </ColorButtonSubmit>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}
