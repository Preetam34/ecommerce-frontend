import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, InputBase } from "@mui/material";

import { tests } from "../../assets/AppConstant";
import {  LOGIN } from "../../Routes/Routes";
import FMButton from "../../components/FMButton/FMButton";
import FMTypography from "../../components/FMTypography/FMTypography";
import { commonStyle } from "../../assets/styles/commonStyles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FMOutlinedInput from "../../components/FMOutlinedInput/FMOutlinedInput";
import { signUpSchema } from "../../validationSchema/signupSchema";
import { signUpUser } from "../../Redux/Slices/SignUp/SignUp";
import HeaderWithoutNav from "../../components/HeaderWithoutNav";

const SignUp = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [passwordErrors, setPassowordErrors] = useState({
    length: true,
    upperCase: true,
    lowerCase: true,
    symbol: true,
    digits: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const passwordToggle = () => {
    setPasswordType(!passwordType);
  };
  const confirmPasswordToggle = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };

  const handelPasswordChange = (e) => {
    const value = e.target.value;

    Object.keys(tests).forEach((error) => {
      const pattern = tests[error];
      setPassowordErrors((prev) => ({
        ...prev,
        [error]: !pattern.test(value),
      }));
    });
  };

  const registerField = (field, options = {}) => {
    const { onChange: fieldOnChange, ...restProps } = register(field);
    const { onChange } = options;

    const handleChange = (e) => {
      onChange?.(e);
      fieldOnChange(e);
    };

    return { onChange: handleChange, ...restProps };
  };

  const onSubmit = (data) => {
    const postData = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      password: data?.password,
    };
    dispatch(signUpUser(postData))
      .unwrap()
      .then((res) => {
        if (res) {
          navigate(LOGIN);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <HeaderWithoutNav />
      <Grid container sx={commonStyle.mainGridContainer}>
        <Grid item sx={{ ...commonStyle.innerGrid, width: "25rem" }}>
          <Box sx={commonStyle.formDetailsContainer}>
            <FMTypography
              displayText="Sign Up"
              styleData={commonStyle.headingStyle}
            />
          </Box>
          <Box sx={commonStyle.formOuterBoxStyle}>
            <Box component="form" xs={12} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={commonStyle.flexStyle}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ marginRight: "1rem" }}>
                    <InputBase
                      required
                      id="firstName"
                      name="firstName"
                      placeholder="Name"
                      sx={{
                        ...commonStyle.inputFieldStyle,

                        ...(errors.firstName && commonStyle.errorStyle),
                      }}
                      {...register("firstName")}
                      error={errors.firstName ? true : false}
                    />
                    {errors.lastName?.message && (
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.firstName?.message}
                      />
                    )}
                  </Box>
                  <Box>
                    <InputBase
                      required
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      sx={{
                        ...commonStyle.inputFieldStyle,
                        ...(errors.lastName && commonStyle.errorStyle),
                      }}
                      {...register("lastName")}
                      error={errors.lastName ? true : false}
                    />
                    {errors.lastName?.message && (
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.lastName?.message}
                      />
                    )}
                  </Box>
                </Box>


                <InputBase
                  required
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  sx={{
                    ...commonStyle.inputFieldStyle,

                    ...(errors.email && commonStyle.errorStyle),
                  }}
                  {...register("email")}
                  error={errors.email ? true : false}
                />
                {errors.email?.message && (
                  <FMTypography
                    styleData={commonStyle.errorText}
                    displayText={errors.email?.message}
                  />
                )}

                <FMOutlinedInput
                  // inputLabel="Password"
                  placeholder="New Password"
                  type={passwordType ? "password" : "text"}
                  register={registerField("password", {
                    onChange: handelPasswordChange,
                  })}
                  error={!!errors.password}
                  passwordToggle={passwordToggle}
                  passwordType={passwordType}
                  errors={errors}
                  errorKey="password"
                />
 {/* Password Instructions */}
 <Box sx={{ marginTop: "1rem" }}>
                  <FMTypography
                    displayText="Password must include:"
                    styleData={{ fontWeight: "bold", fontSize: "0.9rem" }}
                  />
                  <ul style={{ listStyleType: "none", padding: 0, margin: "0.5rem 0" }}>
                    <li style={{ color: passwordErrors.length ? "red" : "green" }}>
                      At least 8 characters
                    </li>
                    <li style={{ color: passwordErrors.upperCase ? "red" : "green" }}>
                      At least one uppercase letter
                    </li>
                    <li style={{ color: passwordErrors.lowerCase ? "red" : "green" }}>
                      At least one lowercase letter
                    </li>
                    <li style={{ color: passwordErrors.digits ? "red" : "green" }}>
                      At least one digit
                    </li>
                    <li style={{ color: passwordErrors.symbol ? "red" : "green" }}>
                      At least one special character (e.g., @, #, $, etc.)
                    </li>
                  </ul>
                </Box>
                <FMOutlinedInput
                  // inputLabel="Password"
                  placeholder="Confirm New Password"
                  type={confirmPasswordType ? "password" : "text"}
                  register={registerField("confirmPassword")}
                  error={!!errors.confirmPassword}
                  passwordToggle={confirmPasswordToggle}
                  passwordType={confirmPasswordType}
                  errors={errors}
                  errorKey="confirmPassword"
                />

                <FMButton
                  displayText={"Sign up"}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    marginTop: "5px",
                  }}
                  onClick={handleSubmit(onSubmit)}
                />
                <input type={"submit"} hidden />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <FMTypography displayText={"Already have an acoount?"} />
                <Link to={LOGIN}>
                  <FMButton
                    variant={"outlined"}
                    displayText={"Log in"}
                    styleData={{
                      textTransform: "capitalize",
                      color: "#222222",
                      padding: "0",
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginLeft: ".5rem",
                      marginTop: "-.1rem",

                    }}
                  />
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
