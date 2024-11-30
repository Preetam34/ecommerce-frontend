
import { Grid } from "@mui/material";
// import {
//   getProductByCategoryIdAndTags,
//   getProductsBySorting,
// } from "../../Redux/Slices/ProductPage/ProductsPageSlice";
import FMDropdown from "../../components/FMDropdown/FMDropdown";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
const FMSort = ({
  pageInfo,
  setPageTitle,
  pincodeData,
  tagName,
  sendCategoryId,
  setIsLoading,
  setDisplayedProducts,
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
      pageInfo,
      categoryId: sendCategoryId,
      tagName: activeTag || tagName,
      pincodeData,
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

  const sortByOptions = [
    { id: 0, label: "Sort By" },
    { id: 1, label: "New to Old" },
    { id: 2, label: "Old to New" },
    { id: 3, label: "Price: High to Low" },
    { id: 4, label: "Price: Low to High" },
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
        <FMDropdown
          name="department_id"
          value={sortingValue}
          options={sortByOptions}
          sx={{ width: { xs: "100%", sm: "13rem", height: "2.5rem" } }}
          placeholder="Please select department"
          onChange={sortByOptionsChangeHandler}
        />

      </Grid>
    </>
  );
};

export default FMSort;
