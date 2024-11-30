import React, { useEffect, useRef } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
  CardActionArea,
  Box,
  useMediaQuery,
} from "@mui/material";
import FMTypography from "../../components/FMTypography/FMTypography";
import ratingStart from "../../assets/ratingStart.svg";
import { getProductsDetail } from "../../Redux/Slices/ProductPage/ProductsPageSlice";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  bestseller: {
    padding: "50px 80px 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 20px 20px",
    },
  },
  textLimit: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  headingText: {
    textAlign: "center",
    fontSize: "2.1875rem",
    fontWeight: 600,
    margin: 0,
    padding: "0 0 35px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  samecard: {
    "& .slick-slide img": {
      width: "225px",
      height: "300px",
      borderRadius: "20px",
      objectFit: "cover",
    },
    "& .slick-prev": {
      left: 0,
    },
    "& .slick-next": {
      right: "0px",
    },
    "& .slick-slide a": {
      display: "grid",
    },
    "& .slick-slide .card_name": {
      position: "absolute",
      bottom: "-5px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
    },
    "& .slick-slide .card_name h4": {
      color: "#fff",
      padding: "0 10px",
      fontSize: "1rem",
      fontWeight: 500,
    },
    "& .slick-slide .card_name p": {
      color: "#fff",
      padding: 0,
      fontSize: "1rem",
      fontWeight: 400,
      padding: "3px 0px",
    },
  },
}));

const SimilarProducts = ({ setIsLoading, pId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const textRef = useRef(null);

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
  const similarProductDetailedData = useSelector(
    (state) => state?.getProductsList?.getProductDetails?.similarProducts
  );

  useEffect(() => {
    if (
      !similarProductDetailedData ||
      similarProductDetailedData.length === 0
    ) {
      setIsLoading(true);
      dispatch(getProductsDetail(pId))
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, pId]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    draggable: true,
    centerPadding: "0px",
    autoplay: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true, 
          arrows: true,
        },
      },
    ],
  };

  const finalData =
    (similarProductDetailedData && similarProductDetailedData) || [];

  return (
    <div className={`${classes.bestseller} ${classes.samecard}`}>
      <Container fluid className="m-0 p-0">
        <Row>
          <Col md={12}>
            <div>
              <h3 className={classes.headingText}>You May Also Like This</h3>
            </div>
          </Col>
          <Col md={12} className="m-0 p-0">
            <Slider {...settings}>
              {finalData &&
                finalData?.map((elem, index) => (
                  <div
                    key={elem?._id}
                    className="banner_img zoomin-img-hover"
                    style={{
                      padding: "10px 8px",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Link to={`/product-detail/${elem?._id}`}>
                      <Box key={index} style={{ position: "relative" }}>
                        <Box
                          sx={{
                            backgroundColor: "#008539",
                            top: "3%",
                            display: "flex",
                            alignItems: "center",
                            width: "40px",
                            height: "30px",
                            justifyContent: "center",
                            position: "absolute",
                            left: "81%",
                            zIndex: "111",
                            borderRadius: "4px",
                            "@media (max-width: 600px)": {
                              left: "73%",
                            },
                          }}
                        >
                          <img
                            src={ratingStart}
                            alt="rating-star"
                            style={{ width: "14px", height: "auto" }}
                          />
                          <FMTypography
                            displayText={Math.round(elem?.rating * 10) / 10}
                            styleData={{
                              color: "#FFFFFF",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          />
                        </Box>
                        <Card
                          style={{
                            width: "250px",
                            borderRadius: "20px",
                            height: "auto",
                            ...(window.innerWidth <= 600 && {
                              borderRadius: "20px",
                              height: "auto",
                              width: "170px",
                            }),
                          }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              style={{
                                height: "250px",
                                width: "100%",
                                borderRadius: "0",
                                ...(window.innerWidth <= 600 && {
                                  height: "170px",
                                  width: "170px",
                                  borderRadius: "0",
                                }),
                              }}
                              image={elem?.productPictures}
                              alt={"elem?.productPictures"}
                            />
                            <CardContent>
                              <Typography
                                ref={textRef}
                                className={`${classes.textLimit}`}
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{
                                  marginBottom: "0",
                                  fontSize: "18px",
                                  color: "#222222",
                                  fontWeight: "500",
                                  textTransform: "capitalize",
                                }}
                              >
                                {elem?.name}
                              </Typography>
                              <span style={{ display: "flex" }}>
                                <del
                                  style={{ fontSize: "14px", color: "#717171" }}
                                >
                                  ₹ {elem?.price + elem?.price * 0.20}
                                </del>

                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#000000",
                                    marginLeft: ".5rem",
                                    fontWeight: "600",
                                  }}
                                >
                                  ₹ {elem?.price}
                                </Typography>
                              </span>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "#717171",
                                    fontWeight: "300",
                                    textTransform: "capitalize",
                                    padding: "2px 0",
                                  }}
                                >
                                  {"Same Day"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#008539", fontWeight: "400" }}
                                >
                                  Reviews {elem?.numReviews}
                                </Typography>
                              </Box>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Box>
                    </Link>
                  </div>
                ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SimilarProducts;
