import { Box, Grid } from "@mui/material";
// import {
//   getProductByCategoryIdAndTags,
//   getProductsBySorting,
// } from "../../Redux/Slices/ProductPage/ProductsPageSlice";
import FMButton from "../../components/FMButton/FMButton";
import FMDropdown from "../../components/FMDropdown/FMDropdown";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
const FMBoth = ({
  setDisplayedProducts,
  tagName,
  setIsLoading
}) => {
  // const dispatch = useDispatch();
  const [sortingValue, setSortingValue] = useState("Sort By");
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    setActiveTag(tagName);
  }, [tagName]);

  const sortByOptionsChangeHandler = (e) => {
    setIsLoading(true);
    const newSortingValue = e.target.value;
    const payload = {
      sort: newSortingValue,
    };

    // dispatch(getProductsBySorting(payload))
    //   .then((response) => {
    //     const updatedActiveTag = response?.payload?.tagName;
    //     setSortingValue(newSortingValue); 
    //     setActiveTag(updatedActiveTag);
    //     setPageTitle(response?.payload?.pageTitle);
    //     setDisplayedProducts(response?.payload?.sortedProducts);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  };

  const tagOptionsChangeHandler = (tag) => {
    setIsLoading(true);
    const payload = {
      sort: sortingValue,
    };
    // dispatch(getProductByCategoryIdAndTags(payload))
    //   .then((response) => {
    //     const updatedActiveTag = response?.payload?.tagName;
    //     setActiveTag(updatedActiveTag);
    //     setPageTitle(response?.payload?.pageTitle);
    //     setDisplayedProducts(response?.payload?.products);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  };

  const TagOptions = [
    "Best Sellers",
    "Birthday Cakes",
    "Anniversary Cakes",
    "Same Day Delivery",
  ];

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column" },
          gap: "1rem",
           }}
      >

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {TagOptions &&
            TagOptions?.map((tag) => (
              <FMButton
                key={tag}
                onClick={() => tagOptionsChangeHandler(tag)}
                displayText={tag}
                variant={"outlined"}
                styleData={{
                  fontWeight: "600",
                  color: "#801317",
                  background:
                    activeTag !== "" && activeTag === tag
                      ? "#f8d7da"
                      : "transparent",
                  borderRadius: "19px",
                  width: { xs: "46%", sm: "100%" }, 
                  fontSize: { xs: "12px", sm: "inherit" }, 
                  padding: { xs: "12px", sm: "8px 16px" }, 
                }}
              />
            ))}
        </Box>
      </Grid>
    </>
  );
};

export default FMBoth;
