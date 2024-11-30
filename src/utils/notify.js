import React, {useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export const SuccessToaster = ({
  showToast,
  setShowToast,
  showToastMessage,
  customMessage,
}) => {
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }
  }, [showToast, setShowToast]);
  return (
    <div className="custom_toaster custom_toaster_error_zindex">
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          className="top-end"
          delay={3000}
          style={{ borderRadius: "10px" }}
        >
          <Toast.Header style={{ borderRadius: "10px" }}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
              loading="lazy"
            />
            <strong className="me-auto">
              <i class="fa-solid fa-circle-check"></i>
              {showToastMessage ? showToastMessage : customMessage}
            </strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export const ErrorToaster = ({
  showErrorToast,
  setShowErrorToast,
  showErrorToastMessage,
  customErrorMessage,
}) => {
  useEffect(() => {
    if (showErrorToast) {
      setTimeout(() => {
        setShowErrorToast(false);
      }, 4000);
    }
  }, [showErrorToast, setShowErrorToast]);

  return (
    <div className="custom_toaster_error">
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          className="top-end"
          delay={3000}
          bg="danger"
          style={{ borderRadius: "10px" }}
        >
          <Toast.Header style={{ borderRadius: "10px" }}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
              loading="lazy"
            />
            <strong className="me-auto">
              <i className="fa-solid fa-circle-xmark"></i>{" "}
              {/* Changed the icon to a cross */}
              {showErrorToastMessage
                ? showErrorToastMessage
                : customErrorMessage}
            </strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </div>
  );
};
