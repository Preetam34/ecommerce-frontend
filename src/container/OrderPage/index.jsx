import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import FMTypography from "../../components/FMTypography/FMTypography";
import { getOrders } from "../../Redux/Slices/OrderSlice/Order";
import { Col } from "react-bootstrap";
import FMButton from "../../components/FMButton/FMButton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import HeaderWithoutNav from "../../components/HeaderWithoutNav";
import Footer from "../../components/Footer";

const useStyles = makeStyles((theme) => ({
  boxContainer2: {
    borderRadius: "20px",
    display: "flex",
    width: "auto",
    padding: "2rem 1rem",
    [theme.breakpoints.down('sm')]: {
      padding: "1rem",
    },
  },
}));

const OrderPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const textRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const orderData = useSelector(
    (state) => state?.myOrders?.getOrderDetails?.orders
  );

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      if (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      ) {
        element.classList.add("ellipsis");
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true)
    dispatch(getOrders());
    setIsLoading(false)
  }, [dispatch]);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const getFullAddress = (address) => {
    const {
      name,
      mobileNumber,
      pinCode,
      locality,
      address: streetAddress,
      cityDistrictTown,
      state,
      landmark,
      alternatePhone,
      addressType,
    } = address;

    return `${streetAddress}, ${locality}, ${cityDistrictTown}, ${landmark}`;
  };

  return (
    <>
    <HeaderWithoutNav/>
      <Grid
        sx={{
          padding: isMobile ? "0 30px" : "0 100px",
          transition:
            "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
          marginTop: isMobile ? "20px" : "20px",
        }}
      >
        <Col style={{ padding: "0 3rem" }}>
          <Box style={{
            display: 'flex', justifyContent: "space-between",
            alignItems: 'center', background: "#fff", marginTop: "10px",
            marginBottom: isMobile ? "10px" : "1rem", borderRadius: "4px",
            boxShadow: "0px 3px 6px 0 rgb(212 212 212 / 35%)",
          }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0 1rem",
              }}
            >
              <FMTypography
                displayText={`Your Order
                `}
                styleData={{
                  fontWeight: "600",
                  fontSize: isMobile ? "14px" : "1.5rem",
                  textTransform: "capitalize",
                }}
              />
              <Box className={classes.boxContainer2}>
                <FMTypography
                  displayText={orderData && `| ${orderData?.length} Orders`}
                  styleData={{
                    fontWeight: "300",
                    fontSize: isMobile ? "14px" : "1.5rem",
                    lineHeight: "30px",
                    color: "#717171",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Col>

        <Grid
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexBasis: "33.333333%",
            justifyContent: "space-evenly",
            gap: "2rem",
            padding: "1rem 0",
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <CircularProgress color="primary" />
            </div>
          ) : orderData && orderData?.length > 0 ? (
            orderData?.map((elem, index) => (
              <Box
                key={index}
                //     onClick={() => onCardClick(elem._id)}
                style={{ position: "relative" }}
              >
                <Card sx={{ width: isMobile ? "320px" : "400px", borderRadius: "20px" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="283"
                      width="283"
                      image={
                        elem?.items[0]?.productId?.productPictures ||
                        "default_image_url"
                      }
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        ref={textRef}
                        className={`${classes.textLimit}`}
                        sx={{
                          fontSize: "18px",
                          color: "#222222",
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      >
                        {elem?.items[0]?.productId?.name || "N/A"}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              fontWeight: "600",
                            }}
                          >
                            ₹ {elem?.items[0]?.productId?.price || "N/A"}
                          </Typography>
                        </span>
                        <Typography
                          variant="body2"
                          sx={{ color: "#801317", fontWeight: "400" }}
                        >
                          Qty {elem?.items[0]?.purchasedQty || "N/A"}
                        </Typography>
                      </Box>
                      <hr style={{ margin: "4px 0" }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Col>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#717171",
                              fontWeight: "400",
                              textTransform: "capitalize",
                            }}
                          >
                            Receiver Name
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",
                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.address?.name || "N/A"}
                          </Typography>
                        </Col>
                        <Col>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#717171",
                              fontWeight: "400",
                              textAlign: "end",
                              textTransform: "capitalize",
                            }}
                          >
                            Mobile Number
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",
                              textAlign: "end",
                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.address?.mobileNumber || "N/A"}
                          </Typography>
                        </Col>
                      </Box>
                      <hr style={{ margin: "4px 0" }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Col>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#717171",
                              fontWeight: "400",
                              textTransform: "capitalize",
                            }}
                          >
                            Payment Status
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",
                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.paymentStatus || "N/A"}
                          </Typography>
                        </Col>
                        <Col>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#717171",
                              fontWeight: "400",
                              textAlign: "end",
                              textTransform: "capitalize",
                            }}
                          >
                            Order Status
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",
                              textAlign: "end",
                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.orderStatus.find((ele) => ele.isCompleted)
                              ?.type || "N/A"}
                          </Typography>
                        </Col>
                      </Box>

                      <hr style={{ margin: "4px 0" }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Col>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#717171",
                              fontWeight: "400",
                              textTransform: "capitalize",
                            }}
                          >
                            Address Type
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",
                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.address?.addressType || "N/A"}
                          </Typography>
                        </Col>

                        <Col>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#717171",
                              fontWeight: "400",
                              textAlign: "end",
                              textTransform: "capitalize",
                            }}
                          >
                            Delivery Pincode
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",
                              textAlign: "end",
                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.address?.pinCode || "N/A"}
                          </Typography>
                        </Col>
                      </Box>
                      <hr style={{ margin: "4px 0" }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Col md={9}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#717171",
                              fontWeight: "400",
                              textTransform: "capitalize",
                            }}
                          >
                            Shipping Address
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",

                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.address
                              ? getFullAddress(elem?.address)
                              : "N/A"}
                          </Typography>
                        </Col>

                        <Col>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#717171",
                              fontWeight: "400",
                              textAlign: "end",
                              textTransform: "capitalize",
                            }}
                          >
                            Delivery State
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",
                              textAlign: "end",
                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.address?.state || "N/A"}
                          </Typography>
                        </Col>
                      </Box>

                      <hr style={{ margin: "4px 0" }} />
                      <Box
                        className="pt-3"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Col>
                          <FMButton
                            displayText={
                              <>
                                <LocalShippingIcon
                                  style={{
                                    marginRight: "8px",
                                    color: "#801317",
                                  }}
                                />
                                Track Order
                              </>
                            }
                            variant="outlined"
                            styleData={{
                              borderRadius: "10px",
                              textTransform: "capitalize",
                              color: "black",
                              fontWeight: "600",
                              fontSize: isMobile ? "12px" : "14px",
                            }}
                          //   onClick={reviewNavHandler}
                          />
                        </Col>

                        <Col style={{ textAlign: "end" }}>
                          <FMButton
                            displayText={
                              <>
                                <AssignmentReturnIcon
                                  style={{
                                    marginRight: "8px",
                                    color: "#801317",
                                  }}
                                />
                                Return Order
                              </>
                            }
                            variant="outlined"
                            styleData={{
                              borderRadius: "10px",
                              textTransform: "capitalize",
                              color: "black",
                              fontWeight: "600",
                              fontSize: isMobile ? "12px" : "14px",
                            }}
                          //   onClick={reviewNavHandler}
                          />
                        </Col>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            ))
          ) : (
            <Box>
              <Card
                sx={{
                  width: "280px",
                  borderRadius: "20px",
                }}
              >
                <CardContent style={{ height: "4rem", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: "18px", color: "#801317" }}
                  >
                    No orders available!
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
};

export default OrderPage;
