import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./container/LoginPage";
import PageNotFound from "./container/PageNotFound";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { LANDING_PAGE, LOGIN, PRODUCT_DETAIL, SIGNUP, ADD_TO_CART, ORDER_PAGE } from "./Routes/Routes";
import SignUp from "./container/SignupPage";
import LandingPage from "./container/LandingPage";
import ProductDetail from "./container/ProductDetailPage";
import HorizontalLinearStepper from "./container/CartPaymentFlow/CartPaymentStepper/CartPaymentStepper";

import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import OrderPage from "./container/OrderPage";

const App = () => {


  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={LANDING_PAGE} element={<LandingPage />} />
            <Route path={LOGIN} element={<Login />} />
            <Route path={SIGNUP} element={<SignUp />} />
            <Route path={PRODUCT_DETAIL} element={<ProductDetail />} />
            <Route path={ADD_TO_CART} element={<HorizontalLinearStepper />} />
            <Route path={ORDER_PAGE} element={<OrderPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer /> {/* Add the ToastContainer */}
      </ThemeProvider>
    </>
  );
};

export default App;
