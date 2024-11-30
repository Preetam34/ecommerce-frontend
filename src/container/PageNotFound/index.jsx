import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import notFoundDog from "../../assets/notFoundDog.svg";

import { Box, useMediaQuery } from "@mui/material";
import FMTypography from "../../components/FMTypography/FMTypography";
import HeaderWithoutNav from "../../components/HeaderWithoutNav";

const PageNotFound = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <HeaderWithoutNav />
      <Container>
        <div style={{ display: "flex" }}>
          <div style={{ padding: isMobile ? "10px 20px 20px" : "30px" }}>
            <FMTypography
              displayText={"Sorry"}
              styleData={{ fontSize: isMobile ? "40px" : "90px", fontWeight: "600" }}
            />
            <FMTypography
              displayText={"We couldn’t find that page"}
              styleData={{ fontSize: isMobile ? "18px" : "30px", fontWeight: "500" }}
            />
            <Box>
              <FMTypography
                displayText={<>
                  <span>Try again or go to</span>
                  <span
                    style={{
                      fontSize: isMobile ? "18px" : "24px",
                      fontWeight: "400",
                      marginLeft: ".5rem",
                      color: "#0095F6",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Homepage
                  </span>
                </>}
                styleData={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "400" }}
              />
            </Box>
          </div>
          <div style={{ padding: isMobile ? "3px" : "5px" }}>
            <img src={notFoundDog} alt="dog-img" width={isMobile ? "100%" : "644px"} height="425px" />
          </div>
        </div>
      </Container>
    </>
  );
};

export default PageNotFound;
