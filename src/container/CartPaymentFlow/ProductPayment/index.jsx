import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { LANDING_PAGE, ORDER_PAGE } from "../../../Routes/Routes";
import { CircularProgress, useMediaQuery } from "@mui/material";

const ProductPayment = ({
  totalAmount,
  isLoading,
  outOfStock,
  outOfStockMessage,
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");


  return (
    <div
      style={{
        padding: isMobile ? "0px" : "10px 120px 0 120px",
        height: "90vh",
      }}
    >
      {isLoading ? (
        <>
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
        </>
      ) : outOfStock ? (
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#F44336",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="48px"
              height="48px"
            >
              <path d="M12 10.585l4.95-4.95 1.415 1.415L13.415 12l4.95 4.95-1.415 1.415L12 13.415l-4.95 4.95-1.415-1.415L10.585 12 5.636 7.05l1.415-1.415L12 10.585z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#F44336",
              textAlign: "center",
            }}
          >
            {outOfStockMessage}
          </div>
          <Link
            to={LANDING_PAGE}
            style={{
              fontSize: "1rem",
              color: "#008539",
              marginTop: "1rem",
              textDecoration: "underline",
            }}
          >
            Go back to product page
          </Link>
        </Col>
      ) : (
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#4CAF50",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="48px"
              height="48px"
            >
              <path d="M9 16.17l-3.88-3.88L4.29 13.29 9 18l11-11-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#4CAF50",
              textAlign: "center",
            }}
          >
            Your order has been placed successfully!
          </div>
        </Col>
      )}
    </div>
  );
};

export default ProductPayment;
