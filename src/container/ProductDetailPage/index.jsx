import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  InputBase,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCartSchema } from "../../validationSchema/addToCartSchema";
import { Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { notify } from "../../components/FMToaster/FMToaster";
import Footer from "../../components/Footer";
import FMDeliveryDropdown from "../../components/FMDeliveryDropdown";
import FMTypography from "../../components/FMTypography/FMTypography";
import FMButton from "../../components/FMButton/FMButton";
import FMRadioButtons from "../../components/FMRadioButton/FMRadioButton";
import ratingStart from "../../assets/ratingStart.svg";
import reviewBlackStar from "../../assets/reviewBlackStar.svg";
import {
  egglessOrNot,
  ExpressDelivery,
  FixedDelivery,
  StandardDelivery,
} from "../../assets/AppConstant";
import { BLACK } from "../../assets/colors";
import "./ProductDetail.css";
import { commonStyle } from "../../assets/styles/commonStyles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-image-gallery/styles/css/image-gallery.css";
import HeaderWithoutNav from "../../components/HeaderWithoutNav";
import {
  addToCart,
  getProductsDetail,
} from "../../Redux/Slices/ProductPage/ProductsPageSlice";
import SimilarProducts from "./SimilarProducts";
import { addToCartProductsFinal } from "../../Redux/Slices/AddToCart/AddToCartSlice";
import { io } from "socket.io-client";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const socket = io("https://ecommerce-backend-po3p.onrender.com");

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  customScrollColumn: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-track": {
      display: "none",
    },
  },

  rightInfoBox: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-track": {
      display: "none",
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
    height: "100%",
  },

  textLimit: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  gridPadding: {
    padding: "20px 80px",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 0",
    },
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const params = useParams();
  const { pId } = params;
  dayjs.extend(customParseFormat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responsiveMobile = useMediaQuery("(max-width: 600px)");
  const imageGalleryRef = useRef(null);
  const [eggOrNot, setEggOrNot] = useState(egglessOrNot);
  const [disabledAddToCart, setDisabledAddToCart] = useState(true);
  const [standardActive, setStandardActive] = useState(false);
  const [fixedActive, setFixedActive] = useState(false);
  const [midNightActive, setMidNightActive] = useState(false);
  const todaysDate = moment(new Date()).format("DDMMYY");
  const [date, setDate] = useState(null);
  const [isTodaysDate, setIsTodaysDate] = useState(true);
  const [selectedTime, setSelectedTime] = useState("");
  const [filterFixedOptions, setFilterFixedOptions] = useState([]);
  const [filterStandardOptions, setFilterStandardOptions] = useState([]);
  const [insertDate, setInsertDate] = useState(false);
  const [filterExpressOptions, setFilterExpressOptions] = useState([]);
  const [selectTodayDate, setSelectTodayDate] = useState(false);
  const [standard, setStandard] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [express, setExpress] = useState(false);
  const [addToCartFlag, setAddToCartFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [is10PM, setIs10PM] = useState(false);
  const [realTimeStockData, setRealTimeStockData] = useState();
  const isMobile = useMediaQuery("(max-width:600px)");
  const createUserOptions = [
    {
      label: "0.5 Kg",
      value: "0.5 Kg",
    },
    {
      label: "1 Kg",
      value: "1 Kg",
    },
    {
      label: "2 Kg",
      value: "2 Kg",
    },
  ].filter(Boolean);

  const [productQuantity, setProductQuantity] = useState(createUserOptions);

  const productDetailedData = useSelector(
    (state) => state?.getProductsList?.getProductDetails?.product
  );

  const reviewsCarouselData = useSelector(
    (state) => state?.getProductsList?.getProductDetails?.product?.reviews
  );

  const categoryName = useSelector(
    (state) => state?.getProductsList?.getProductDetails?.categoryName
  );

  const onClickHandler = () => {
    imageGalleryRef.current.toggleFullScreen();
  };

  const apiImgs = [
    {
      original: productDetailedData?.productPictures,
      thumbnail: productDetailedData?.productPictures,
    },
    {
      original: productDetailedData?.productDetailPic1,
      thumbnail: productDetailedData?.productDetailPic1,
    },
    {
      original: productDetailedData?.productDetailPic2,
      thumbnail: productDetailedData?.productDetailPic2,
    },
  ];

  const properties = {
    thumbnailPosition: responsiveMobile ? "bottom" : "left",
    infinite: false,
    autoPlay: false,
    showNav: false,
    disableThumbnailScroll: true,
    useBrowserFullscreen: false,
    showPlayButton: false,
    onClick: onClickHandler,
    originalHeight: "100%",
    originalWidth: "100%",
    items: apiImgs,
  };

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 4,
      slidesToSlide: 2,
      // partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 2,
      slidesToSlide: 2,
      // partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 200,
      },
      items: 4,
      slidesToSlide: 1,
      // partialVisibilityGutter: 30,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addToCartSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (realTimeStockData?.newStock === 0 || productDetailedData.stock === 0) {
      notify({
        type: "error",
        content: `Failed to add items: Insufficient stock ${
          realTimeStockData?.productName || productDetailedData.name
        }`,
      });
    } else {
      if (pId) {
        const cartItems = [];
        const payload = {
          cartItems: [
            {
              product: pId,
              quantity: 1,
            },
          ],
          convenienceFee: fixed ? 150 : express ? 250 : 0,
        };

        dispatch(addToCart(payload)).then((res) => {
          if (res) {
            setAddToCartFlag(true);
            dispatch(addToCartProductsFinal());
          }
        });
      }
    }
  };

  const handleBuyNow = async (data) => {
    if (pId) {
      const cartItems = [];
      const payload = {
        cartItems: [
          {
            product: pId,
            quantity: 1,
          },
        ],
        convenienceFee: fixed ? 150 : express ? 250 : 0,
      };

      dispatch(addToCart(payload)).then((res) => {
        if (
          res?.payload?.error?.response?.status === 400 ||
          res?.payload?.error?.response?.status === 500
        ) {
          notify({
            type: "error",
            content: `Failed to add items: ${res?.payload?.error?.response?.data?.message}`,
          });
        } else {
          dispatch(addToCartProductsFinal());
          notify({
            type: "success",
            content: `Items added successfully to cart`,
          });
          navigate(`/add-to-cart`, {
            state: { value: productDetailedData?.vendorName },
          });
        }
      });
    }
  };

  const handleWeightChange = (option) => {
    setProductQuantity(option);
  };

  const onDateChange = (date) => {
    setDate(date);
    const newdate = new Date();
    const isPast10PM = newdate.getHours() >= 22;
    const curTime = newdate.getHours();
    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const formattedDay = day < 10 ? "0" + day : day;
      const formattedMonth = month < 10 ? "0" + month : month;
      const year = date.getFullYear();
      return `${formattedDay}/${formattedMonth}/${year}`;
    };
    const todayDate = formatDate(newdate);
    let currentDate;
    if (date) {
      const selectedDate = new Date(date);
      currentDate = formatDate(selectedDate);
    }

    const newFixedArray = FixedDelivery.filter((el) => el.value > curTime + 1);
    const newExpressArray = ExpressDelivery.filter(
      (el) => el.value > curTime + 1
    );
    const newStandardArray = StandardDelivery.filter(
      (el) => el.value >= curTime
    );
    if (currentDate === todayDate) {
      setIs10PM(isPast10PM);
      setFilterExpressOptions(newExpressArray);
      setFilterFixedOptions(newFixedArray);
      setFilterStandardOptions(newStandardArray);
      setSelectTodayDate(true);
    } else {
      setSelectTodayDate(false);
      setIs10PM(false);
    }
    todayDate ? setInsertDate(true) : setInsertDate(false);
  };

  const standardDelivery = () => {
    setStandard(true);
    setExpress(false);
    setFixed(false);
    setMidNightActive(false);
    setStandardActive(true);
    setFixedActive(false);
    setDisabledAddToCart(false);
  };

  const fixedDelivery = () => {
    setStandard(false);
    setExpress(false);
    setFixed(true);
    setMidNightActive(false);
    setStandardActive(false);
    setFixedActive(true);
    setDisabledAddToCart(false);
  };

  const expressDelivery = () => {
    setStandard(false);
    setExpress(true);
    setFixed(false);
    setMidNightActive(true);
    setStandardActive(false);
    setFixedActive(false);
    setDisabledAddToCart(false);
  };

  const onStandardDeliveryChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const onFixedDeliveryChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const onExpressDeliveryChange = (e) => {
    setSelectedTime(e.target.value);
  };

  useEffect(() => {
    setIsTodaysDate(
      () => date && date.format && date.format("DDMMYY") === todaysDate
    );
  }, [date]);

  useEffect(() => {
    dispatch(getProductsDetail(pId))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [pId, dispatch]);

  const formatSpecifications = (specifications) => {
    if (!specifications) return ""; // Handle cases where specifications may be undefined or null

    // Split the specifications string by ", " and wrap each in <li> tags
    const formattedSpecs = specifications
      .split(", ")
      .map((spec) => `<li>${spec}</li>`)
      .join("");

    // Wrap the list items in a <ul> tag
    return `<ul>${formattedSpecs}</ul>`;
  };

  const handleNotifyMe = () => {
    notify({
      type: "error",
      content: `We’ll notify you when ${
        realTimeStockData?.productName || productDetailedData.name
      } product is back in stock`,
    });
  };

  socket.on("stockUpdate", (data) => {
    setRealTimeStockData(data);
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pId]);

  return (
    <>
      <HeaderWithoutNav />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          <div
            className={`${classes.gridPadding} ${classes.root}`}
            style={{ marginTop: isMobile ? "0px" : "20px" }}
          >
            <Container>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.customScrollColumn}
                >
                  <ImageGallery
                    ref={imageGalleryRef}
                    {...properties}
                    onThumbnailClick={(e, index) => {}}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={`${classes.rightInfoBox} right-info-box`}
                >
                  <Col
                    component="form"
                    className="right-info-box"
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                      overflowY: "auto",
                      height: "100vh",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <FMTypography
                      displayText={productDetailedData?.name}
                      styleData={{
                        fontSize: isMobile ? "2rem" : "2.2rem",
                        fontWeight: "600",
                        lineHeight: "1.2",
                      }}
                    />
                    <Box sx={{ display: "flex" }}>
                      <Box
                        sx={{
                          backgroundColor: "#008539",
                          display: "flex",
                          padding: ".5rem",
                          width: "auto",
                          borderRadius: "4px",
                        }}
                      >
                        <img
                          src={ratingStart}
                          alt="rating-star"
                          style={{ width: "14px" }}
                        />
                        <FMTypography
                          displayText={
                            Math.round(productDetailedData?.rating * 10) / 10
                          }
                          styleData={{ color: "#FFFFFF", fontSize: "12px" }}
                        />
                      </Box>
                      <FMButton
                        displayText={`Reviews ${productDetailedData?.numReviews}`}
                        variant={"outlined"}
                        styleData={{
                          textDecoration: "underline",
                          marginLeft: "6px",
                          lineHeight: "0.3px",
                          textTransform: "capitalize",
                          color: "#717171",
                          border: "none",
                          fontSize: "18px",
                          "&:hover": {
                            border: "none",
                            color: "#fff",
                            backgroundColor: "#801317",
                            textDecoration: "none",
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <del
                        style={{
                          fontSize: "24px",
                          color: "#717171",
                          paddingTop: ".5rem",
                        }}
                      >
                        ₹ {parseFloat(productDetailedData?.price  + productDetailedData?.price * 0.20)}
                      </del>
                      <Typography
                        sx={{
                          fontSize: "32px",
                          color: "#000000",
                          marginLeft: "1rem",
                        }}
                      >
                        ₹ {productDetailedData?.price}
                      </Typography>

                      <FMTypography
                        displayText={`${20}% OFF`}
                        styleData={{
                          color: "#008539",
                          fontSize: "18px",
                          marginLeft: "1rem",
                          paddingTop: ".7rem",
                        }}
                      />
                    </Box>
                    {categoryName && categoryName?.toLowerCase() === "cakes" ? (
                      <Box sx={{ marginTop: "17px" }}>
                        <FMRadioButtons
                          formLabel="Select Weight"
                          imageIcon={productDetailedData?.productPictures}
                          radioButtons={createUserOptions}
                          onChecked={(option) => handleWeightChange(option)}
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
                          value={productQuantity}
                          required={true}
                        />
                      </Box>
                    ) : (
                      <></>
                    )}
                    <Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Select Date"
                          disablePast
                          inputFormat="DD/MM/YYYY"
                          value={date}
                          onChange={onDateChange}
                          renderInput={(startProps) => (
                            <>
                              <TextField {...startProps} id="date-picker" />
                            </>
                          )}
                          className="datePickerStyle"
                          sx={{ height: "3,5rem" }}
                        />
                      </LocalizationProvider>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color:
                            realTimeStockData?.productId ===
                            productDetailedData?._id
                              ? "#801317"
                              : productDetailedData?.stock >= 1
                              ? "#2E7D32"
                              : "#801317",
                          marginTop: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        {realTimeStockData?.productId ===
                        productDetailedData?._id
                          ? "Sold Out - This item is currently out of stock"
                          : productDetailedData?.stock >= 1
                          ? "In Stock"
                          : "Sold Out - This item is currently out of stock"}
                      </Typography>
                    </Box>
                    {categoryName?.toLowerCase() === "cakes" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <FMRadioButtons
                          radioButtons={egglessOrNot}
                          onChecked={(option) =>
                            option === "Eggless"
                              ? setEggOrNot("Eggless")
                              : setEggOrNot("With Egg")
                          }
                          formLabelStyling={{
                            radioButtonStyle: {
                              fontWeight: "600",
                              lineHeight: "1.3125rem",
                              fontSize: "0.875rem",
                              color: BLACK,
                            },
                          }}
                          value={eggOrNot}
                          required={false}
                        />
                        <InputBase
                          required
                          id="text"
                          name="text"
                          placeholder="Message on Cake"
                          sx={{
                            ...commonStyle.inputFieldStyle,
                            width: "215px",
                            marginLeft: "1rem",

                            ...(errors.cakeMessage && commonStyle.errorStyle),
                          }}
                          {...register("cakeMessage")}
                          error={errors.cakeMessage ? true : false}
                        />
                      </Box>
                    ) : (
                      <></>
                    )}
                    {insertDate ? (
                      <Row className="my-2">
                        <Col md={12}>
                          <Box>
                            <FMTypography
                              displayText={"Select Delivery Type"}
                              styleData={{
                                fontSize: "20px",
                                fontWeight: "500",
                                marginTop: "1rem",
                                marginBottom: "1rem",
                              }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "8px 16px",
                                border: "1px solid #801317",
                                borderRadius: "10px",
                              }}
                            >
                              <Box
                                className={
                                  selectTodayDate ? "standard-is-disabled" : ""
                                }
                              >
                                <FMButton
                                  displayText={
                                    <div>
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Standard Time
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "10px",
                                          color: "#178013",
                                        }}
                                      >
                                        Free
                                      </div>
                                    </div>
                                  }
                                  variant="outlined"
                                  styleData={{
                                    opacity: isTodaysDate ? 0.5 : 1,
                                    borderRadius: "100px",
                                    width: "132px",
                                    cursor: isTodaysDate
                                      ? "not-allowed"
                                      : "pointer",
                                    height: "48px",
                                    color: "black",
                                    backgroundColor: standardActive
                                      ? "#FCEEED"
                                      : "white",
                                    textTransform: "capitalize",
                                    marginRight: "27px",
                                  }}
                                  onClick={standardDelivery}
                                />
                              </Box>

                              <Box>
                                <FMButton
                                  displayText={
                                    <div>
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Fixed Time
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "10px",
                                          color: "#178013",
                                        }}
                                      >
                                        ₹ 150
                                      </div>
                                    </div>
                                  }
                                  variant="outlined"
                                  styleData={{
                                    borderRadius: "100px",
                                    width: "132px",
                                    height: "48px",
                                    color: "black",
                                    backgroundColor: fixedActive
                                      ? "#FCEEED"
                                      : "white",
                                    textTransform: "capitalize",
                                    marginRight: "27px",
                                  }}
                                  onClick={fixedDelivery}
                                />
                              </Box>

                              <Box>
                                <FMButton
                                  displayText={
                                    <div>
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Mid Night
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "10px",
                                          color: "#178013",
                                        }}
                                      >
                                        ₹ 250
                                      </div>
                                    </div>
                                  }
                                  variant="outlined"
                                  styleData={{
                                    borderRadius: "100px",
                                    width: "132px",
                                    height: "48px",
                                    color: "black",
                                    backgroundColor: midNightActive
                                      ? "#FCEEED"
                                      : "white",
                                    textTransform: "capitalize",
                                    marginRight: "27px",
                                  }}
                                  onClick={expressDelivery}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Col>

                        <Col>
                          {!is10PM && selectTodayDate && !fixed && !express ? (
                            <div
                              class="my-2 alert alert-danger"
                              role="alert"
                              style={{ width: "150px" }}
                            >
                              Not Applicable for Standard Delivery!
                            </div>
                          ) : (
                            <></>
                          )}

                          {standard && !selectTodayDate ? (
                            <>
                              <div className="mt-3 mb-2">
                                <div className="fw-bold">
                                  <h6
                                    style={{
                                      color: "#636363",
                                      fontSize: "18px",
                                    }}
                                  >
                                    Select Standard Time Slot
                                  </h6>
                                </div>
                              </div>
                              <FMDeliveryDropdown
                                sx={{
                                  ...commonStyle.dropdownStyle,
                                  width: "15rem",
                                }}
                                defaultValue={"Select Time Slot"}
                                onChange={onStandardDeliveryChange}
                                options={
                                  selectTodayDate
                                    ? filterStandardOptions
                                    : StandardDelivery
                                }
                              />
                            </>
                          ) : fixed && !is10PM ? (
                            <>
                              <div className="mt-3 mb-2">
                                <div className="fw-bold">
                                  <h6
                                    style={{
                                      color: "#636363",
                                      fontSize: "18px",
                                    }}
                                  >
                                    Select Fixed Time Slot
                                  </h6>
                                </div>
                              </div>
                              <FMDeliveryDropdown
                                sx={{
                                  ...commonStyle.dropdownStyle,
                                  width: "15rem",
                                }}
                                defaultValue="Select Time Slot"
                                onChange={onFixedDeliveryChange}
                                options={
                                  selectTodayDate
                                    ? filterFixedOptions
                                    : FixedDelivery
                                }
                              />
                            </>
                          ) : express && !is10PM ? (
                            <>
                              <div className="mt-3 mb-2">
                                <div className="fw-bold">
                                  <h6
                                    style={{
                                      color: "#636363",
                                      fontSize: "18px",
                                    }}
                                  >
                                    Select Express Time Slot
                                  </h6>
                                </div>
                              </div>

                              <FMDeliveryDropdown
                                sx={{
                                  ...commonStyle.dropdownStyle,
                                  width: "15rem",
                                }}
                                defaultValue={"Select Time Slot"}
                                onChange={onExpressDeliveryChange}
                                options={
                                  selectTodayDate
                                    ? filterExpressOptions
                                    : ExpressDelivery
                                }
                              />
                            </>
                          ) : is10PM ? (
                            <>
                              <div
                                class="my-2 alert alert-danger"
                                role="alert"
                                style={{ width: "150px" }}
                              >
                                Not Applicable for Delivery Now Please Change
                                Date!
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    ) : (
                      <></>
                    )}

                    {productDetailedData?.stock <= 0 ||
                    realTimeStockData?.productId ===
                      productDetailedData?._id ? (
                      <Box sx={{ marginTop: "50px", display: "flex" }}>
                        <FMButton
                          displayText={"Notify Me"}
                          variant="outlined"
                          styleData={{
                            borderRadius: "10px",
                            width: "215px",
                            color: "black",
                            fontWeight: "600",
                            fontSize: "1rem",
                            textTransform: "capitalize",
                            marginRight: "27px",
                          }}
                          onClick={handleNotifyMe}
                        />
                      </Box>
                    ) : (
                      <>
                      
                      {disabledAddToCart ? (
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
                              Select Date & Time to Proceed
                            </Typography>
                          </Box>
                        ) : (
                          <></>
                        )}
                 
                      <Box sx={{ marginTop: "50px", display: "flex" }}>
                    
                        <FMButton
                          disabled={disabledAddToCart}
                          displayText={"Add To Cart"}
                          variant="outlined"
                          styleData={{
                            borderRadius: "10px",
                            width: "215px",
                            color: "black",
                            fontWeight: "600",
                            fontSize: "1rem",
                            textTransform: "capitalize",
                            marginRight: "27px",
                          }}
                          onClick={handleSubmit(onSubmit)}
                        />
                        <FMButton
                          disabled={disabledAddToCart}
                          displayText={addToCartFlag ? "Go To Cart" : "Buy Now"}
                          variant={"contained"}
                          styleData={{
                            ...commonStyle.buttonStyles,
                            width: "215px",
                          }}
                          onClick={handleBuyNow}
                        />
                        <input type={"submit"} hidden />
                      </Box>
                      </>
                    )}
                    <Box sx={{ marginTop: "50px", display: "block" }}>
                      <FMTypography
                        displayText={"Product Description"}
                        styleData={{ fontSize: "20px", fontWeight: "500" }}
                      />
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "300",
                          color: "#717171",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: productDetailedData?.description,
                        }}
                      />
                    </Box>

                    <Box sx={{ marginTop: "50px", marginBottom: "50px" }}>
                      <FMTypography
                        displayText={"Product Specifications"}
                        styleData={{ fontSize: "20px", fontWeight: "500" }}
                      />
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "300",
                          color: "#717171",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formatSpecifications(
                            productDetailedData?.specifications
                          ),
                        }}
                      />
                    </Box>
                  </Col>
                </Grid>
              </Grid>
            </Container>
          </div>
          <Grid className={classes.gridPadding}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex" }}>
                  <img
                    src={reviewBlackStar}
                    alt="star"
                    style={{ paddingBottom: "20px" }}
                  />
                  <FMTypography
                    displayText={
                      Math.round(productDetailedData?.rating * 10) / 10
                    }
                    styleData={{
                      fontSize: "20px",
                      paddingTop: "6px",
                      paddingRight: "6px",
                    }}
                  />
                  <FMButton
                    displayText={`${productDetailedData?.numReviews} Reviews `}
                    variant={"outlined"}
                    styleData={{
                      textDecoration: "underline",
                      fontWeight: "500",
                      textTransform: "capitalize",
                      color: "#222222",
                      border: "none",
                      transitionDuration: "0.4s",
                      fontSize: "20px",
                      transition: "background-color 0.4s ease",
                      marginBottom: "1rem",
                      "&:hover": {
                        border: "none",
                        color: "#fff",
                        backgroundColor: "#801317",
                        textDecoration: "none",
                        transition: "background-color 0.4s ease",
                      },
                    }}
                  />
                </Box>
              </Box>

              {reviewsCarouselData && (
                <Carousel
                  showDots={false}
                  deviceType={responsive.deviceType}
                  autoPlay={responsive.deviceType !== "mobile" ? true : false}
                  ssr
                  slidesToSlide={1}
                  containerClass="carousel-with-custom-dots"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  responsive={responsive}
                  partialVisible
                  infinite
                >
                  {reviewsCarouselData?.map((elem, index) => (
                    <Box style={{ paddingBottom: "1rem" }} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          border: "1px solid #801317",
                          borderRadius: "20px",
                          width: "283px",
                          padding: "24px",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ margin: " 0 12px" }}
                        >
                          <Avatar
                            src={
                              reviewsCarouselData?.profilePicture
                                ? reviewsCarouselData?.profilePicture
                                : "/broken-image.jpg"
                            }
                          />
                        </Stack>
                        <Box>
                          <FMTypography displayText={elem?.name} />
                          <Box sx={{ display: "flex" }}>
                            <FMTypography
                              displayText={moment(elem?.createdAt).format(
                                "DD.MM.YYYY"
                              )}
                            />
                            <Box
                              sx={{
                                backgroundColor: "#008539",
                                display: "flex",
                                padding: ".3rem .5rem",
                                width: "auto",
                                marginLeft: "1rem",
                                borderRadius: "4px",
                              }}
                            >
                              <img
                                src={ratingStart}
                                alt="rating-star"
                                style={{ width: "14px" }}
                              />
                              <FMTypography
                                displayText={
                                  Math.round(productDetailedData?.rating * 10) /
                                  10
                                }
                                styleData={{
                                  color: "#FFFFFF",
                                  fontSize: "12px",
                                }}
                              />
                            </Box>
                          </Box>

                          <p style={{ marginTop: "15px" }}>{elem?.comment}</p>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Carousel>
              )}
            </Box>
          </Grid>
          <SimilarProducts pId={pId} setIsLoading={setIsLoading} />
        </>
      )}

      <Footer />
    </>
  );
};

export default ProductDetail;
