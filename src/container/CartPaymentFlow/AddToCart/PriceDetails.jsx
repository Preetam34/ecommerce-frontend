import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import FMTypography from "../../../components/FMTypography/FMTypography";
import FMButton from "../../../components/FMButton/FMButton";
import { commonStyle } from "../../../assets/styles/commonStyles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const PriceDetails = ({
  convenienceFee,
  addedData,
  activeStep,
  handleNext,
  cartProducts,
  title,
  addressDetailsAddedLength,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  let resultDiscount = 0;
  addedData &&
    Object.keys(addedData)?.map(
      (elem, index) =>
      (resultDiscount +=
        addedData[elem]?.price * addedData[elem]?.qty -
        addedData[elem]?.price * addedData[elem]?.qty)
    );

  const calculateTotalMRP = () => {
    const totalMRP = cartProducts?.reduce((total, elem) => {
      return total + (elem?.price * addedData[elem?._id]?.qty || 0);
    }, 0);
  
    return totalMRP;
  };

  const calculateConvenienceFee = () => {
    const fee = convenienceFee; 
    return fee;
  };

  const calculateTotalAmount = () => {
    const totalMRP = parseFloat(calculateTotalMRP()); 
    const convenienceFee = parseFloat(calculateConvenienceFee()); 
    return totalMRP + convenienceFee;
  };
  

  return (
    <Box
      sx={{
        boxShadow:
          "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
        borderRadius: "20px",
        padding: isMobile ? "20px" : "40px",
        background: "#fff",
      }}
    >
      <FMTypography
        displayText={"Your Order"}
        styleData={{ paddingBottom: "10px", fontWeight: "600" }}
      />

      <hr />
      <Box>
        <FMTypography
          displayText={`Price Details ${
            addedData && Object.keys(addedData)?.length > 0
              ? Object.keys(addedData).length + " Items"
              : addedData && Object.keys(addedData)?.length === 1
              ? "1 Item"
              : " 0 Item"
          }`}
          styleData={{ fontWeight: "600" }}
        />
      </Box>
      <hr />
      {cartProducts &&
        cartProducts?.map((elem, index) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            key={elem._id}
          >
            <FMTypography
              displayText={`${index + 1}. ${
                elem?.name.slice(0, 10) + (elem?.name?.length > 10 ? "..." : "")
              }`}
              styleData={{ color: "#717171" }}
            />
            <FMTypography
              displayText={`₹${elem?.price}`}
              styleData={{ color: "#717171" }}
            />
            <FMTypography
              displayText={`x ${addedData[elem._id]?.qty}`}
              styleData={{ color: "#717171" }}
            />
            <FMTypography
              displayText={`= ₹${(
                elem?.price * addedData[elem._id]?.qty
              ).toFixed(2)}`}
              styleData={{ color: "#717171" }}
            />
          </Box>
        ))}

      <hr />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FMTypography
          displayText={`Convenience Fee`}
          styleData={{ color: "#717171" }}
        />
        <FMTypography
          displayText={`+ ₹${calculateConvenienceFee()}`}
          styleData={{ color: "#717171" }}
        />
      </Box>
      <hr />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FMTypography
          displayText={`Total Amount`}
          styleData={{ fontWeight: "600" }}
        />
        <FMTypography
          styleData={{ fontWeight: "600" }}
          displayText={`₹${calculateTotalAmount()}`}
        />
      </Box>
      <hr />
      {addressDetailsAddedLength && addressDetailsAddedLength > 0 ? (
        <FMButton
          displayText={title && title ? title : `Continue`}
          variant={"contained"}
          styleData={{
            ...commonStyle.buttonStyles,
            width: "100%",
            marginTop: "32px",
          }}
          onClick={()=> handleNext(calculateTotalAmount())}
        />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              backgroundColor: "#fff4f4", 
              border: "1px solid #801317", 
              borderRadius: "8px",
              margin: "10px 0",
            }}
          >
            <InfoOutlinedIcon
              sx={{
                color: "#801317",
                marginRight: "8px", 
              }}
            />
            <Typography
              sx={{
                fontWeight: "600",
                color: "#801317",
                fontSize: "16px",
              }}
            >
              Add Address to Proceed
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PriceDetails;
