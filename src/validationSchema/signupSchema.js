import {
  WHITE_SPACES_REGEX_PASSWORD,
  EMAIL_REGEX,
  NEW_PASSWORD_REGEX,
} from "../assets/AppConstant";
import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("name is mandatory"),
  lastName: Yup.string().required("Last name is mandatory"),
   email: Yup.string()
    .required("User name is mandatory")
    .matches(EMAIL_REGEX, "Please enter valid email")
    .min(6, "Username should be 6 to 100 characters long")
    .max(100, "Username should be 6 to 100 characters long"),
  password: Yup.string()
    .required("Password is required")
    .matches(WHITE_SPACES_REGEX_PASSWORD, "Password is invalid")
    .min(6, "Password should be 6 to 20 characters long")
    .max(20, "Password should be 6 to 20 characters long")
    .matches(NEW_PASSWORD_REGEX, "Password is invalid"),
  confirmPassword: Yup.string()
    .required("Password is required")
    .matches(WHITE_SPACES_REGEX_PASSWORD, "Please enter valid password")
    .oneOf([Yup.ref("password"), null], "Password does not match"),
});
