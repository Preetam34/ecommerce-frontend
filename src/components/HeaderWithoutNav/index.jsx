import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import React,{useState,useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import { HeaderStyle } from "../../assets/styles/HeaderStyle";
import { commonStyle } from "../../assets/styles/commonStyles";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import { LANDING_PAGE, LOGIN } from "../../Routes/Routes";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cart from "../../assets/cart.svg";
import profileIcon from "../../assets/profileIcon.svg";
import { makeStyles } from "@mui/styles";
import { logout } from "../../Redux/Slices/Login/auth.slice";
import logoutIcon from "../../assets/logoutIcon.svg";
import LoginIcon from "@mui/icons-material/Login";

import { addToCartProductsFinal } from "../../Redux/Slices/AddToCart/AddToCartSlice";
import FMTypography from "../FMTypography/FMTypography";
const useStyles = makeStyles((theme) => ({
  commonStyle: {
    [theme.breakpoints.down("xs")]: {
      gap: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      gap: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      gap: "3rem",
    },
    [theme.breakpoints.up("lg")]: {
      gap: "3rem",
    },
    [theme.breakpoints.up("xl")]: {
      gap: "7rem",
    },
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  profileIconStyle: {
    width: "30px !important",
    height: "30px !important",
    [theme.breakpoints.down("sm")]: {
      width: "25px !important",
      height: "25px !important",
    },
  },
  locationIconStyle: {
    width: "30px !important",
    height: "30px !important",
    [theme.breakpoints.down("sm")]: {
      width: "25px !important",
      height: "25px !important",
    },
  },
  cartItemCountStyle: {
    position: "absolute",
    top: "-2px",
    right: "7px",
    backgroundColor: "#801317",
    color: "white",
    borderRadius: "50%",
    padding: "2px 10px",
    fontSize: "12px",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      padding: "2px 8px",
      fontSize: "10px",
      top: "-25%"
    },
  },
  pincodeItemCountStyle: {
    color: "white",
    fontSize: "12px",
    "&:hover": {
      color: "#801317",
    },
  },
  tagDesign: {
    fontSize: "0.9rem",
    cursor: "pointer",
    paddingBottom: "0.5rem",
    "&:hover": {
      color: "#801317",
    },
  },

  iconGridContainer: {
    margin: "0",
    display: "flex",
    justifyContent: "space-between",
    padding: "3px 50px",
    background: "rgb(252, 237, 238)",
  },
  mobileBackground: {
    background: "rgb(252, 237, 238) !important",
  },
  mobileInnerBackground: {
    background: "#801317 !important",
  },
  headerFullStyle: {
    backgroundColor: "white !important",
    boxShadow: "0 2px 4px rgba(0,0,0,.2)",
  },
  flexDisplayStyle: {
    display: "flex",
  },
  logoStyle: {
    display: "flex",
    alignItems: "center",
  },
  monkeyLogoStyle: {
    width: "45px",
    height: "45px",
    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "40px",
    },
  },
  logoStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      gap: "0.1rem",
    },
  },
  menuStyle: {
    padding: "2rem",
    ".MuiMenu-list": {
      width: "236px",
    },
    ".MuiPopover-paper": {
      padding: "1rem 1rem 1rem 0",
      borderRadius: "20px",
      width: "236px",
    },
  },
  menuDropdownStyle: {
    display: "flex",
    marginBottom: ".5rem",
    gap: "5px"
  },
  profileStyle: {
    marginLeft: "1rem",
  },
  menuFontSize: { fontSize: "14px" },
  buttonStyle: {
    color: "#717171",
    padding: "0",
    fontSize: "10px",
    backgroundColor: "none",
    borderRadius: "10px !important",
    border: "none",
    "&:hover": {
      backgroundColor: "white",
      border: "none",
    },
  },
  typoStyle: {
    color: "#717171",
    marginLeft: "12px",
    fontSize: "10px",
    color: "black",
  },
  menuItemImg: {
    marginRight: "12px",
  },

  navPadding: {
    padding: "0px 60px",
  },

  navbarContainerPadding: {
    display: "flex",
    flexWrap: "nowrap",
    margin: "0",
    padding: "0",
    justifyContent: "start",
  },

  navbarToggle: {
    margin: "5px 8px",
    background: "#FFF",
  },
  navbarTitle: {
    color: "#fff",
    fontWeight: "600",
  },
  menuItemStyle: {
    padding: "1rem !important",
  },

}));
const HeaderWithoutNav = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showErrorToastMessage, setShowErrorToastMessage] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");
  const personLoggedIn = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?.fullName;

  const logoutHandler = () => {
    dispatch(logout())
      .then((response) => {
        if (
          (response && response?.meta?.requestStatus === "fulfilled") ||
          !response
        ) {
          setAnchorEl(null);
          localStorage.clear();
          navigate("/login", {
            state: {
              showToastMessage: response?.payload?.message
                ? response?.payload?.message
                : "Logout successful. Have a great day!",
            },
          });
        } else {
          setShowErrorToast(true);
          setShowErrorToastMessage(response.paylaod.error.message);
        }
      })
      .catch((err) => {
        setShowErrorToast(true);
        setShowErrorToastMessage(err?.error?.response?.data?.message);
      });
  };

  const addedData = useSelector(
    (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
  );

  useEffect(() => {
    dispatch(addToCartProductsFinal());
  }, [dispatch]);


  return (
    <>
      <Grid sx={HeaderStyle.headerFullStyle}>
        <Row style={{ ...HeaderStyle.iconGridContainer, margin: "0" }}>
          <Col
            style={{
              ...commonStyle.flexDisplayStyle,
              justifyContent: "center",
            }}
          >
            <a
              href={LANDING_PAGE}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={monkeyLogo}
                alt="monkeyLogo"
                style={HeaderStyle.monkeyLogoStyle}
              />
          
                      <FMTypography
                  displayText={`𝔈𝔠𝔬𝔪𝔪𝔢𝔯𝔠𝔢`}
                  styleData={{
                    fontWeight: "300",
                    fontSize: isMobile ? "16px" : "2rem",
                    lineHeight: "30px",
                    color: "#801317",
                  }}
                />
              
            </a>
          </Col>

          {personLoggedIn ? (
            <Col className={`${classes.logoStyle}`}>
              <Box>
                <a href={`/add-to-cart`}>
                  <Button>
                    <img
                      src={cart}
                      alt="cart"
                      className={classes.profileIconStyle}
                    />

                    {addedData && Object.keys(addedData)?.length > 0 && (
                      <div class={classes.cartItemCountStyle}>
                        {Object.keys(addedData)?.length}
                      </div>
                    )}
                  </Button>
                </a>
              </Box>
              <Box>
                <Button>
                  <img
                    src={profileIcon}
                    alt="profileIcon"
                    className={classes.profileIconStyle}
                  />
                  &nbsp; {personLoggedIn}
                </Button>
              </Box>

              <Box>
                <Button
                  onClick={logoutHandler}
                  divider
                  className={`${classes.menuItemStyle}`}
                >
                  <img
                    src={logoutIcon}
                    alt="logout-icon"
                    className={`${classes.menuItemImg}`}
                  />
                  Log Out
                </Button>
              </Box>
            </Col>
          ) : (
            <Col className={`${classes.logoStyle}`}>
              <Button
                onClick={() => navigate(LOGIN)}
                divider
                className={`${classes.menuItemStyle}`}
              >
                <LoginIcon sx={{ marginRight: "8px" }} />
                Log in
              </Button>
            </Col>
          )}
        </Row>
      </Grid>
    </>
  );
};

export default HeaderWithoutNav;
