import React, { useState } from "react";
import styled from "@emotion/styled";
import { Card, CardContent, IconButton, Input } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const CarouselContainer = styled("div")`
  display: flex;
  align-items: center;
  padding: 6vh 0 8vh 0;
  margin: 0 0 2vh 0;
  justify-content: center;
  background-color: #2a403e;
  color: var(--white);
`;

const CardStyled = styled(Card)(({ active, pictureurl, issearchcard }) => ({
  flex: "0 0 17%",
  maxWidth: "17%",
  margin: "0 8px",
  height: active === "true" ? "20vh" : "15vh",
  backgroundColor: active === "true" ? "var(--white)" : "var(--white)",
  color: active === "true" ? "(var(--white))" : "var(--white)",
  backgroundImage: `url(${pictureurl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  ...(issearchcard === "true" && {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "1.7rem",
  }),
}));

const Carousel = ({
  categories,
  searchValue,
  setSearchValue,
  setSelectedCategory,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
    setSelectedCategory(
      categories[(activeIndex - 1 + categories.length) % categories.length].type
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedCategory(categories[(activeIndex + 1) % categories.length].type);
  };

  const handleCardClick = (index) => {
    if (index === -1) {
      setActiveIndex(categories.length - 1);
      setSelectedCategory(categories[categories.length - 1].type); // Pass the selected category to the parent component
    } else {
      setActiveIndex(index);
      setSelectedCategory(categories[index].type); // Pass the selected category to the parent component
    }
  };
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const visibleCards = [activeIndex - 1, activeIndex, activeIndex + 1].map(
    (index) => categories[(index + categories.length) % categories.length]
  );

  // eslint-disable-next-line no-unused-vars
  let active = "";
  // eslint-disable-next-line no-unused-vars
  let issearchcard = "";

  return (
    <CarouselContainer>
      <IconButton onClick={handlePrev}>
        <ArrowBack sx={{ color: "white" }} />
      </IconButton>
      {visibleCards.map((category, index) => (
        <CardStyled
          key={index}
          active={index === 1 ? (active = "true") : (active = "false")}
          pictureurl={category.pictureUrl}
          issearchcard={
            category.type === "Search"
              ? (issearchcard = "true")
              : (issearchcard = "false")
          }
          onClick={() =>
            handleCardClick((activeIndex - 1 + index) % categories.length)
          }
        >
          <CardContent>
            <h3>{category.type}</h3>
          </CardContent>
          {category.type === "Search" && (
            <Input
              sx={{ backgroundColor: "whitesmoke" }}
              type="search"
              placeholder="Search..."
              style={{ marginBottom: "16px" }}
              value={searchValue}
              onChange={handleInputChange}
            />
          )}
        </CardStyled>
      ))}
      <IconButton onClick={handleNext}>
        <ArrowForward sx={{ color: "white" }} />
      </IconButton>
    </CarouselContainer>
  );
};

export default Carousel;
