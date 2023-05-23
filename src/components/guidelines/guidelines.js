import React from "react";
import BlogCard from "./blogcard";
import { Divider, Typography } from "@mui/material";
import Carousel from "../utils/CategorySelectionCarousell";
import { useState, useEffect } from "react";

function Guidelines() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Search");
  const [filteredData, setFilteredData] = useState([]);
  const [searchedData, setSearchedData] = useState("");
  const [data, setData] = useState([]);
  const categories = [
    {
      type: "Search",
      pictureUrl:
        "https://images.unsplash.com/photo-1526415302530-ad8c7d818689?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      type: "Content Creation",
      pictureUrl:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    },
    {
      type: "Communication",
      pictureUrl:
        "https://images.unsplash.com/photo-1530819568329-97653eafbbfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
    },
    {
      type: "General Social Media",
      pictureUrl:
        "https://images.unsplash.com/photo-1556800467-7b7ba9da0bf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      type: "Specific Social Media",
      pictureUrl:
        "https://images.unsplash.com/photo-1622549037543-49cf1ca0babc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const urls = [
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/content_creation?_embed&v=9999",
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/communication?_embed&v=9999",
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/specific_socialmedia?_embed&v=9999",
    "https://partyvikings.dorikeczko.com/wp-json/wp/v2/general_social_media?_embed&v=9999",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const jsonData = await Promise.all(
          responses.map((response) => response.json())
        );
        const combinedData = jsonData.reduce(
          (accumulator, currentData) => accumulator.concat(currentData),
          []
        );
        setData(combinedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      Array.isArray(data) &&
      data.length > 0 &&
      selectedCategory?.toLocaleLowerCase() !== "search"
    ) {
      const filteredCards = data.filter(
        (urls) => urls.acf?.category === selectedCategory?.toLocaleLowerCase()
      );
      setFilteredData(filteredCards);
    }
  }, [data, selectedCategory]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const filteredCards = data.filter((urls) =>
        urls.acf?.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchedData(filteredCards);
    }
  }, [data, searchValue]);

  return (
    <>
      <Carousel
        categories={categories}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSelectedCategory={setSelectedCategory}
      />
      <Typography variant="h5" sx={{ marginLeft: "5rem", marginTop: "5rem" }}>
        {" "}
        Blogs
      </Typography>
      <Divider sx={{ marginBottom: "5vh" }} />

      {selectedCategory === "Search" ? (
        searchValue === "" ? (
          <BlogCard data={data} />
        ) : (
          <BlogCard data={searchedData} />
        )
      ) : (
        <BlogCard data={filteredData} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "90%",
          marginBottom: "5vh",
        }}
      ></div>
    </>
  );
}

export default Guidelines;
