import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Iconify from "../utils/Iconify";
import {
  IconButton,
  Card,
  Grid,
  CardContent,
  Typography,
  Divider,
  CardMedia,
} from "@mui/material";
import { useEffect } from "react";
import styled from "@emotion/styled";

const RenderedContent = styled("div")`
  margin: 10vh 15vw 0 15vw;
`;

function BlogFull(data) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when navigation occurs
    window.scrollTo(0, 0);
  }, [location]);

  if (Object.values(data).length <= 0) {
    return null;
  }

  return (
    <div>
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
        sx={{ position: "absolute", left: "11vw", top: "7vh" }}
      >
        <Iconify
          icon={"material-symbols:arrow-back-rounded"}
          width={24}
          height={24}
          color={"var(--highlight)"}
        />
      </IconButton>
      {Object.values(data).map((urls, index) => (
        <Fragment key={index}>
          <Grid
            sx={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0",
                width: "80vw",
                height: "40vh",
                boxShadow: 4,
                borderRadius: "1.7rem",
                backgroundColor: "var(--green)",
                marginTop: "5vh",
              }}
            >
              <CardMedia
                sx={{
                  width: "25vw",
                  transformOrigin: "center",
                  marginLeft: "9%",
                  transform: "scale(1)",
                  borderRadius: "1.7rem",
                }}
                component="img"
                image={urls.acf?.mainimg.url}
                title={urls.acf?.title}
              ></CardMedia>
              <CardContent
                sx={{
                  width: "40%",
                  paddingRight: "5%",
                  paddingLeft: "3%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "left",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--stext)",
                  }}
                >
                  {urls.acf?.category}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ margin: "2vh 0 6vh 0", color: "var(--white)" }}
                >
                  {urls.acf?.title}
                </Typography>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "30vw",
                  }}
                >
                  <Typography
                    sx={{ marginRight: "1vw", color: "var(--stext)" }}
                    variant="h5"
                  >
                    {urls.acf?.date}
                  </Typography>
                  <Divider
                    orientation="vertical"
                    role="presentation"
                    flexItem
                    sx={{
                      borderRightWidth: "2px",
                      borderColor: "var(--stext)",
                      borderRadius: "5px",
                    }}
                  ></Divider>
                  <Typography
                    sx={{
                      marginRight: "auto",
                      marginLeft: "1vw",
                      color: "var(--stext)",
                    }}
                    variant="h5"
                  >
                    {urls.acf?.readtime}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
            <RenderedContent
              dangerouslySetInnerHTML={{
                __html: `${urls.content.rendered}`,
              }}
            ></RenderedContent>
          </Grid>
        </Fragment>
      ))}
    </div>
  );
}

export default BlogFull;
