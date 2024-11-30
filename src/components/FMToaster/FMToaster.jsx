import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Slide from "@mui/material/Slide";

import {
  BLACK,
  ERROR_RED,
  LIGHT_GREEN,
  LIGHT_RED,
  SUCCESS_GREEN,
} from "../../assets/colors";
// import FMTypography from "./FMTypography";
import { Bounce, toast } from "react-toastify";
import { Box } from "@mui/system";
import FMTypography from "../../components/FMTypography/FMTypography";

const toastConfig = {
  position: "top-right",
  transition: Bounce,
  autoClose: 2000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  bodyStyle: {
    padding: 0,
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: 0,
  },
  style: {
    padding: 0,
    marginLeft: "-10rem",
    width: "auto",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  closeButton: false,
};

const styles = {
  AlertStyles: {
    backgroundColor: "white",
    flex: 1,
    border: "0.063rem solid rgba(26,26,26,0.12)",
    boxShadow: "0rem 0.5rem 1rem rgba(26,26,26,0.04)",
    padding: "0rem 0rem",
    borderRadius: "0.5rem",
    "& .MuiAlert-root": {
      padding: "0.063rem 0.063rem",
    },
    "& .MuiAlert-icon": {
      padding: "1.813rem 1rem",
      backgroundColor: LIGHT_GREEN,
      color: SUCCESS_GREEN,
    },
  },
  CloseIconStyle: {
    marginTop: "1.313rem",
    marginRight: "0.938rem",
  },
  AlertTitleStyle: {
    fontWeight: 500,
    fontSize: "0.875",
    lineHeight: "1.313rem",
    marginTop: "0.5rem",
    color: BLACK,
  },
  AlertMessageStyle: {
    fontWeight: 400,
    fontSize: "0.875",
    lineHeight: "1.313rem",
    color: "rgba(26, 26, 26, 0.7)",
    flex: 1,
  },
  toasterPosition: {
    zIndex: 999999,
  },
  outerBoxFlex: { display: "flex" },
  alertMessageBox: { display: "flex", flex: 1 },
};

export default function FMToaster({
  alertTitle,
  alertMessage,
  type,
  outerWidth,
}) {
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={styles.outerBoxFlex}>
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Alert
          severity={type}
          icon={
            type === "success" ? (
              <CheckCircleSharpIcon />
            ) : (
              <WarningRoundedIcon />
            )
          }
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              disableRipple={true}
              onClick={() => {
                setOpen(false);
              }}
              sx={styles.CloseIconStyle}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            ...styles.AlertStyles,
            ...(type === "error"
              ? {
                  "& .MuiAlert-icon": {
                    padding: "1.813rem 1rem",
                    backgroundColor: LIGHT_RED,
                    color: ERROR_RED,
                    marginRight: "1rem",
                  },
                }
              : {
                  "& .MuiAlert-icon": {
                    padding: "1.813rem 1rem",
                    backgroundColor: LIGHT_GREEN,
                    color: SUCCESS_GREEN,
                    marginRight: "1rem",
                  },
                }),
            flex: 1,
            ...outerWidth,
          }}
        >
          <AlertTitle sx={styles.AlertTitleStyle}>{alertTitle}</AlertTitle>
          <Box sx={styles.alertMessageBox}>
            <FMTypography
              displayText={alertMessage}
              styleData={{ ...styles.AlertMessageStyle }}
            />
          </Box>
        </Alert>
      </Slide>
    </Box>
  );
}

export const notify = ({ type, content, config }) => {

  const toastId = toast(
    <FMToaster
      onClose={() => toast.dismiss(toastId)}
      title={type}
      type={type}
      alertTitle={type === "success" ? "Success" : "Error"}
      alertMessage={content}
    >
      {content}
    </FMToaster>,
    { ...toastConfig, ...config }
  );
};
