import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Footer from "../../../components/Footer";
import AddToCart from "../AddToCart";
import ProductPayment from "../ProductPayment";
import AddAddress from "../AddAddress";
import { Col, Container, Row } from "react-bootstrap";
import FMButton from "../../../components/FMButton/FMButton";
import { commonStyle } from "../../../assets/styles/commonStyles";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import HeaderWithoutNav from "../../../components/HeaderWithoutNav";
import { notify } from "../../../components/FMToaster/FMToaster";
import { addOrder } from "../../../Redux/Slices/OrderSlice/Order";
import { useDispatch, useSelector } from "react-redux";
import { addToCartProductsFinal } from "../../../Redux/Slices/AddToCart/AddToCartSlice";
import { ORDER_PAGE } from "../../../Routes/Routes";

const steps = ["Cart", "Address", "Payment"];

const useStyles = makeStyles((theme) => ({
  arrowBack: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
}));
export default function HorizontalLinearStepper() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const value = state && state.value;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [totalAmount, setTotalAmount] = useState();
const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [outOfStock, setOutOfStock] = useState(false);
  const [outOfStockMessage, setOutOfStockMessage] = useState(false);
  const addedData = useSelector(
    (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
  );
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (totalAmt) => {
    setTotalAmount(totalAmt);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if(activeStep === 1){
      try {
        const itemsArray = [];
        addedData &&
          Object.values(addedData)?.map((item, index) => {
            itemsArray.push({
              productId: item?._id,
              purchasedQty: item?.qty,
            });
          });
        const orderData = {
          addressId: localStorage.getItem("selectedAddress"),
          totalAmount: totalAmt,
          paymentStatus: "completed",
          paymentType: "card",
          items: itemsArray,
        };
  
        dispatch(addOrder(orderData))
          .then((res) => {
            setIsLoading(false);
            if (res?.payload?.error?.response?.data?.error) {
              setOutOfStock(true);
              setOutOfStockMessage(
                res?.payload?.error?.response?.data?.error.message ||
                  "Failed to place order: Insufficient stock"
              );
              notify({
                type: "error",
                content: `Failed to place order: ${
                  res?.payload?.error?.response?.data?.error.message ||
                  "Failed to place order: Insufficient stock"
                }`,
              });
            }
             else {
              setTimeout(() => {
                navigate(ORDER_PAGE);
              }, 2000);
            }
          })
          .catch((err) => {
            console.error("Error adding order:", err);
          });
      } catch (error) {
        console.error("Error adding order:", error);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const dataOnStepper = () => {
    if (activeStep === 0) {
      return <AddToCart handleNext={handleNext} activeStep={activeStep} />;
    } else if (activeStep === 1) {
      return (
        <AddAddress
          handleNext={handleNext}
          totalAmount={totalAmount}
          activeStep={activeStep}
        />
      );
    } else if (activeStep === 2) {
      return (
        <ProductPayment totalAmount={totalAmount} activeStep={activeStep} isLoading={isLoading} outOfStock={outOfStock} outOfStockMessage={outOfStockMessage} />
      );
    }
  };

  useEffect(() => {
    dispatch(addToCartProductsFinal());
  }, [dispatch]);
  return (
    <>
      <HeaderWithoutNav />
      <Container fluid className=" m-0 p-0">
        <Row className=" m-0 p-0" style={{ width: "100%", marginTop: "40px" }}>
          <Col
            style={{
              padding: "1rem 0",
              display: "flex",
              justifyContent: "center",
              gap: "0.5",
              "@media (max-width: 600px)": {
                gap: "0.1rem",
              },
            }}
          >
            <Box>
              <FMButton
                variant={"outlined"}
                displayText={
                  <>
                    <ArrowBack className={classes.arrowBack} />
                    &nbsp;{isMobile ? "" : "Back"}
                  </>
                }
                disabled={activeStep === 0}
                onHover={"#801319"}
                styleData={{
                  ...commonStyle.buttonStyles,
                  backgroundColor: "none",
                  borderRadius: "10px",
                  fontFamily: "Poppins",
                  color: "#000",
                  fontSize: "1rem",
                  fontStyle: "normal",
                  padding: isMobile ? "0" : "5px 15px",
                  fontWeight: "500",
                  "@media (max-width: 600px)": {
                    fontSize: "10px",
                  },
                }}
                onClick={handleBack}
              />
            </Box>
            <Stepper
              activeStep={activeStep}
              sx={{
                ".MuiStepConnector-root": {
                  top: 0,
                },
                ".MuiStepConnector-root span": {
                  borderColor: "transparent",
                },
                ".MuiStepConnector-root span::before": {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  content: '">"',
                },
              }}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>
                      <span
                        style={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
                      >
                        {label}
                      </span>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <Box>
                <FMButton
                  displayText={activeStep === steps.length ? "Reset" : ""}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    width: "100%",
                  }}
                  onClick={handleReset}
                />
              </Box>
            ) : (
              <></>
            )}
          </Col>
          {activeStep === steps.length ? (
            <Col md={12} style={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ mt: 2, mb: 2, color: "green" }}>
                Payment has been done Successfully.
              </Typography>
            </Col>
          ) : (
            <Col
              md={12}
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            ></Col>
          )}

          {dataOnStepper()}
        </Row>
      </Container>
      <Footer />
    </>
  );
}
