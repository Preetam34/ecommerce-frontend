import React, { useEffect, useState } from "react";
import { Box, InputBase } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import Pincode from "react-pincode";
import FMButton from "../../../components/FMButton/FMButton";
import FMTypography from "../../../components/FMTypography/FMTypography";
import FMRadioButtons from "../../../components/FMRadioButton/FMRadioButton";
import { commonStyle } from "../../../assets/styles/commonStyles";
import { locationHomeOrOffice } from "../../../assets/AppConstant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addAddressSchema } from "../../../validationSchema/addAddressSchema";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAddress } from "../../../Redux/Slices/AddToCart/AddAddress";
import { addToCartAddAddress } from "../../../Redux/Slices/AddToCart/AddToCartAddAddressSlice";
import AllAddressComponent from "./AllAddressComponent";
import PriceDetails from "../AddToCart/PriceDetails";
import { addToCartProductsFinal } from "../../../Redux/Slices/AddToCart/AddToCartSlice";
import { makeStyles } from "@mui/styles";
import { getAllProducts } from "../../../Redux/Slices/ProductPage/ProductsPageSlice";

const useStyles = makeStyles((theme) => ({
  columnContainer: {
    padding: "10px 80px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 20px",
    },
  },
}));
const AddAddress = ({ handleNext,activeStep }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [pincodeData, setPincodeData] = useState("");
  const [homeOfficeLocation, setHomeOfficeLocation] = useState("Home");
  const [displayFormData, setDisplayFormData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addedData = useSelector(
    (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
  );
  const convenienceFee = useSelector(
    (state) =>
      state?.addToCartProducts?.getAddToCartProductsListData?.convenienceFee
  );
  const getAllProduct = useSelector(
    (state) => state?.getProductsList?.getAllProducts.products
  );

  const addedDataArray = addedData && Object.values(addedData);
  const cartProducts = getAllProduct?.filter(
    (product) =>
      Array.isArray(addedDataArray) &&
      addedDataArray.some((cartItem) => cartItem._id === product._id)
  );
  const addressDetailsAdded = useSelector(
    (state) =>
      state?.addToCartAddress?.getAddToCartAddress?.userAddress?.address
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAddressSchema),
    mode: "onChange",
  });

  const getDataFunc = (data) => {
    setPincodeData(data);
    if (data?.pincode.length === 6) {
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      address: {
        name: data?.firstName,
        mobileNumber: data?.contactNumber,
        pinCode: pincodeData?.pincode,
        locality: data?.location,
        address: data?.address,
        cityDistrictTown: data?.cityDistrict,
        state: data?.state,
        landmark: data?.landmark,
        alternatePhone: data?.alternateNum,
        addressType: homeOfficeLocation,
      },
    };
    setIsLoading(true);
    await dispatch(addToCartAddAddress(payload))
      .then((response) => {
        dispatch(addToCartProductsFinal());
        setDisplayFormData(false);
        dispatch(addToCartAddress());
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  };

  const displayForm = () => {
    setDisplayFormData(true);
  };

  useEffect(() => {
    dispatch(addToCartProductsFinal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(addToCartAddress());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Row className="m-0">
        <Col className={classes.columnContainer}>
          <AllAddressComponent
            isLoading={isLoading}
            addressDetailsAdded={addressDetailsAdded}
            styleData={{ display: displayFormData ? "none" : "block" }}
          />
          <Box
            sx={{
              display: displayFormData ? "none" : "grid",
              justifyContent: "center",
              paddingBottom: "1rem",
            }}
          >
            <FMButton
              variant={"outlined"}
              displayText={"+ Add new Address"}
              onHover={"#801319"}
              styleData={{
                borderRadius: "10px",
                fontFamily: "Poppins",
                color: "#000",
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: "500",
              }}
              onClick={displayForm}
            />
          </Box>

          <Box
            sx={{
              boxShadow:
                "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
              borderRadius: "20px",
              marginTop: "24px",
              marginBottom: "24px",
              padding: "32px",
              display: displayFormData ? "block" : "none",
            }}
          >
            <Box component="form" xs={12}>
              <Box sx={commonStyle.flexStyle}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ marginRight: "1rem" }}>
                    <InputBase
                      required
                      id="firstName"
                      name="firstName"
                      placeholder="Name"
                      sx={{
                        ...commonStyle.inputFieldStyle,
                        ...(errors.firstName && commonStyle.errorStyle),
                      }}
                      {...register("firstName")}
                      error={errors.firstName ? true : false}
                    />
                    <FMTypography
                      styleData={{
                        ...commonStyle.errorText,
                        fontSize: "11px",
                      }}
                      displayText={errors.firstName?.message}
                    />
                  </Box>
                  <Box>
                    <InputBase
                      required
                      id="contactNumber"
                      name="contactNumber"
                      placeholder="Contact Number"
                      sx={{
                        ...commonStyle.inputFieldStyle,

                        ...(errors.contactNumber && commonStyle.errorStyle),
                      }}
                      {...register("contactNumber")}
                      error={errors.contactNumber ? true : false}
                    />
                    <FMTypography
                      styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                      displayText={errors.contactNumber?.message}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Box sx={{ marginRight: "2rem" }}>
                    <Pincode
                      showCity={false}
                      showDistrict={false}
                      showState={false}
                      invalidError="Please check pincode"
                      // lengthError="check length"
                      getData={getDataFunc}
                      showArea={pincodeData ? true : false}
                      pincodeInput={{
                        borderRadius: "10px",
                        width: "110%",
                        border: "1px solid grey",
                        height: "40px",
                        padding: "16.5px 14px",
                        marginRight: "1.7rem",
                        marginBottom: !pincodeData && "1.1rem",
                      }}
                      areaInput={{
                        backgroundColor: "white",
                        border: "none",
                        color: "red",
                        fontSize: "12px",
                      }}
                    />
                  </Box>
                  <Box>
                    <InputBase
                      required
                      id="location"
                      name="location"
                      placeholder="location/Town"
                      sx={{
                        ...commonStyle.inputFieldStyle,
                        marginTop: "-.1rem",

                        ...(errors.location && commonStyle.errorStyle),
                      }}
                      {...register("location")}
                      error={errors.location ? true : false}
                    />
                    <FMTypography
                      styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                      displayText={errors.location?.message}
                    />
                  </Box>
                </Box>

                <InputBase
                  required
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  sx={{
                    ...commonStyle.inputFieldStyle,

                    ...(errors.address && commonStyle.errorStyle),
                  }}
                  {...register("address")}
                  error={errors.address ? true : false}
                />
                <FMTypography
                  styleData={commonStyle.errorText}
                  displayText={errors.address?.message}
                />

                <Box sx={commonStyle.flexStyle}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ marginRight: "1rem" }}>
                      <InputBase
                        required
                        id="cityDistrict"
                        name="cityDistrict"
                        placeholder="city/District"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          ...(errors.cityDistrict && commonStyle.errorStyle),
                        }}
                        {...register("cityDistrict")}
                        error={errors.cityDistrict ? true : false}
                      />
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.cityDistrict?.message}
                      />
                    </Box>
                    <Box>
                      <InputBase
                        required
                        id="state"
                        name="state"
                        placeholder="State"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          ...(errors.state && commonStyle.errorStyle),
                        }}
                        {...register("state")}
                        error={errors.state ? true : false}
                      />
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.state?.message}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={commonStyle.flexStyle}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ marginRight: "1rem" }}>
                      <InputBase
                        id="landmark"
                        name="landmark"
                        placeholder="Landmark"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          ...(errors.landmark && commonStyle.errorStyle),
                        }}
                        {...register("landmark")}
                        error={errors.landmark ? true : false}
                      />
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.landmark?.message}
                      />
                    </Box>
                    <Box>
                      <InputBase
                        required
                        id="alternateNum"
                        name="alternateNum"
                        placeholder="Alternate Num"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          ...(errors.alternateNum && commonStyle.errorStyle),
                        }}
                        {...register("alternateNum")}
                        error={errors.alternateNum ? true : false}
                      />
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.alternateNum?.message}
                      />
                    </Box>
                  </Box>
                </Box>

                <FMRadioButtons
                  radioButtons={locationHomeOrOffice}
                  onChecked={(option) =>
                    option === "Office"
                      ? setHomeOfficeLocation("Office")
                      : setHomeOfficeLocation("Home")
                  }
                  formLabelStyling={{
                    radioButtonStyle: {
                      fontWeight: "600",
                      lineHeight: "1.3125rem",
                      fontSize: "0.875rem",
                      color: "black !important",
                    },
                  }}
                  labelStyle={{
                    color: "black !important",
                    fontSize: "20px !important",
                    fontWeight: "500 !important",
                  }}
                  value={homeOfficeLocation}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              ></Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <FMButton
                displayText={"Save & Delivery here"}
                variant={"contained"}
                styleData={{
                  ...commonStyle.buttonStyles,
                  width: "247px",
                  marginTop: "32px",
                  "@media (max-width: 600px)": {
                    padding: "0",
                  },
                }}
                onClick={handleSubmit(onSubmit)}
              />

              <FMButton
                variant={"outlined"}
                displayText={"Cancel"}
                onHover={"#801319"}
                styleData={{
                  ...commonStyle.buttonStyles,
                  backgroundColor: "none",
                  borderRadius: "10px",
                  marginTop: "32px",
                  fontFamily: "Poppins",
                  color: "#000",
                  fontSize: "1rem",
                  fontStyle: "normal",
                  fontWeight: "500",
                }}
                onClick={() => setDisplayFormData(false)}
              />
            </Box>
          </Box>
        </Col>
        <Col className={classes.columnContainer}>
          <PriceDetails
            title="Buy Now"
            activeStep={activeStep}
            addressDetailsAddedLength={addressDetailsAdded?.length}
            cartProducts={cartProducts}
            convenienceFee={convenienceFee}
            addedData={addedData}
            handleNext={handleNext}
          />
        </Col>
      </Row>
    </>
  );
};

export default AddAddress;
