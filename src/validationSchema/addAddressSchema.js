import {
  WHITE_SPACES_REGEX_PASSWORD,
  EMAIL_REGEX,
  NEW_PASSWORD_REGEX,
  MOBILE_NUMBER_REGEX,
} from "../assets/AppConstant";
import * as Yup from "yup";

export const addAddressSchema = Yup.object().shape({
  firstName: Yup.string().required("name is mandatory"),

  contactNumber: Yup.string()
    .required("Phone number is mandatory")
    .test("check_all_zero", "Phone number is invalid", (val) => +val > 0)
    .matches(MOBILE_NUMBER_REGEX, "Phone number is invalid")
    .max(10, "Phone number should not exceed 10 digits"),

  // pinCode: Yup.string().required("pincode is mandatory"),
  address: Yup.string().required("Address is mandatory"),
  location: Yup.string().required("Location is mandatory"),
  homeOffice: Yup.string(),
});
