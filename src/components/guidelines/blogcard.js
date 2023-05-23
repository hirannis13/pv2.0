import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const TwoLineText = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  hyphens: auto;
  white-space: wrap;
  margin: 1.5vh 0 4vh 0;
  hyphens: auto;
`;

function BlogCard({ data }) {
  const navigate = useNavigate();

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }

  const handleOpenPost = (urls) => {
    navigate("/readblog", { state: { data: urls } });
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 7 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {data.map((urls, index) => (
        <Grid
          key={index}
          item
          xs={2}
          sm={4}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <MuiCard
            sx={{
              width: "16vw",
              boxShadow: 4,
              height: "40vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "1.2rem",
            }}
            key={index}
          >
            <CardMedia
              component="img"
              image={urls.acf?.mainimg.url}
              alt={urls.acf?.category}
              height={"40%"}
            />
            <CardContent sx={{ height: "12vh" }}>
              <Typography
                gutterBottom
                component="div"
                sx={{ textAlign: "center", fontSize: "1.3rem" }}
              >
                {urls.acf?.title}
              </Typography>
              <TwoLineText variant="h6" color="text.secondary">
                Open this blog of you want to know more about it!
              </TwoLineText>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "center",
                marginTop: "auto",
                paddingBottom: "1rem",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  handleOpenPost(urls);
                }}
                sx={{
                  color: "var(--green)",
                  borderRadius: "0.7rem",
                  textTransform: "lowercase",
                  border: "var(--green) 0.2px solid",
                  boxShadow: 2,
                  fontSize: "0.9rem",
                  width: "fit-content",
                  "&:hover": {
                    backgroundColor: "var(--green)",
                    color: "var(--white)",
                  },
                }}
              >
                Read more
              </Button>
            </CardActions>
          </MuiCard>
        </Grid>
      ))}
    </Grid>
  );
}

export default BlogCard;
