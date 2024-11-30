import { BLACK, CANCEL_GREY_BORDER, LIGHT_GREY_BORDER } from "./colors";
export const commonStyle = {
  flexDisplayStyle: { display: "flex" },
  capitalizeTextStyle: { textTransform: "capitalize" },
  mainGridContainer: {
    display: "flex",
    alignItems: "center",
    background: "white",
    // height: "75vh",
    justifyContent: "center",
  },
  innerGrid: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(91, 105, 135, 0.22)",
    justifyContent: "center",
    padding: "2rem",
    marginTop: "1rem",
    marginBottom: "2rem",
    borderRadius: "20px",
    boxShadow:
      " 0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
  },
  formOuterBoxStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
  },
  flexStyle: {
    display: "flex",
    flexDirection: "column",
  },
  inputFieldStyle: {
    width: "100%",
    height: "2.75rem",
    padding: "1rem",
    marginTop: "0.5rem",
    marginBottom: "1rem",
    border: `0.063rem solid grey`,
    boxSizing: "border-box",
    boxShadow: "0rem 0.25rem 0.5rem rgba(0,0,0,0.04)",
    borderRadius: "0.5rem",
    color: "black",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      color: "black",
    },
    "&::placeholder": {
      color: "black",
      opacity: 1,
    },
  },
  inputFieldPincodeStyle: {
    width: "100%",
    height: "3.5rem",
    marginTop: "0.5rem",
    marginBottom: "0.375rem",
    border: `0.063rem solid grey`,
    boxSizing: "border-box",
    boxShadow: "0rem 0.25rem 0.5rem rgba(0,0,0,0.04)",
    borderRadius: "0.5rem",
    color: "black",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      color: "black",
    },
    "&::placeholder": {
      color: "black",
      opacity: 1,
    },
  },
  errorStyle: {
    border: "0.125rem solid red",
    "&:hover": {
      border: "0.125rem solid red",
    },
  },
  errorText: {
    width: "100%",
    color: "red",
    height: "1.25rem",
    fontSize: "0.875rem",
    marginTop: "0.375rem",
  },
  couponText: {
    width: "100%",
    color: "#178013",
    height: "1.25rem",
    fontSize: "0.875rem",
    marginTop: "0.375rem",
  },

  paddingZero: {
    padding: 0,
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "1rem",
  },
  buttonStyles: {
    width: "auto",
    height: "2.75rem",
    backgroundColor: "#801317",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "1.5rem",
    textTransform: "none",

  },
  textTransformStyle: {
    textTransform: "none",
    fontFamily: " 'Poppins', sans-serif",
    fontWeight: "600",
  },
  disableRippleStyle: {
    color: "#717171",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  inputLabelStyle: {
    fontStyle: "normal",
    fontFamily: " 'Poppins', sans-serif",
    fontSize: "1.063rem",
    marginTop: "1rem",
    lineHeight: "1.25rem",
    color: "rgba(26,26,26,0.4)",
    fontWeight: "600",
  },
  headingStyle: {
    // fontFamily: " 'Poppins', sans-serif",
    fontWeight: "600",
    fontSize: "1.5rem",
  },
  dropdownStyle: {
    background: "white",
    boxShadow: `0rem 0.0625rem 0.125rem ${LIGHT_GREY_BORDER}`,
    borderRadius: "0.5rem",
    height: "2.75rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: `0.0625rem solid ${CANCEL_GREY_BORDER}`,
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: `0.0625rem solid ${CANCEL_GREY_BORDER}`,
      },
    },
  },
  detailTypographyStyle: {
    fontStyle: "normal",
    textTransform: "capitalize",
    fontWeight: 400,
    fontFamily: " 'Poppins', sans-serif",
    fontSize: "1rem",
    // lineHeight: "1.25rem",
    color: "rgba(26,26,26,0.4)",
  },
  detailTypographyStyleData: {
    fontFamily: " 'Poppins', sans-serif",
    fontStyle: " normal",
    fontWeight: " 400",
    fontSize: "1rem",
    // lineHeight: "1.5rem",
    color: BLACK,
  },
};
