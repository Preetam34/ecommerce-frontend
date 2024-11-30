import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FMDetailTypography from "../../../components/FMDetailTypography/FMDetailTypography";
import FMTypography from "../../../components/FMTypography/FMTypography";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAddress } from "../../../Redux/Slices/AddToCart/DeleteAddress";
import { notify } from "../../../components/FMToaster/FMToaster";
import {
  addToCartAddress,
  setDefaultAddress,
} from "../../../Redux/Slices/AddToCart/AddAddress";

const AllAddressComponent = React.memo(
  ({ styleData, addressDetailsAdded, isLoading }) => {
    const dispatch = useDispatch();

    const [selectedAddress, setSelectedAddress] = useState(() =>
      getInitialSelectedAddress()
    );

    const handleRemoveAddress = (addressId) => {
      dispatch(deleteAddress(addressId)).then((resultAction) => {
        if (deleteAddress.fulfilled.match(resultAction)) {
          if (selectedAddress === addressId) {
            setSelectedAddress(getInitialSelectedAddress());
          }
          const deletedAddress = resultAction.payload;
          notify({
            type: "success",
            content: `Address for ${deletedAddress.address} deleted successfully`,
          });
          dispatch(addToCartAddress());
        } else if (deleteAddress.rejected.match(resultAction)) {
          const error = resultAction.payload;
          notify({
            type: "error",
            content: `Failed to delete the address: ${error}`,
          });
        }
      });
    };

    function getInitialSelectedAddress() {
      const defaultAddress =
        (addressDetailsAdded ?? []).find((address) => address.isDefault) ||
        (addressDetailsAdded ?? [])[0];
      localStorage.setItem("selectedAddress", defaultAddress?._id);
      return defaultAddress?._id || null;
    }

    useEffect(() => {
      dispatch(addToCartAddress());
    }, [dispatch]);




    const handleRadioChange = (id) => {
      setSelectedAddress(id);
      dispatch(setDefaultAddress(id));
    };

    useEffect(() => {
      setSelectedAddress(getInitialSelectedAddress());
    }, [addressDetailsAdded]);
    if (isLoading) {
      return (
        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Grid>
      );
    }

    return (
      <>
        <Grid >
          <RadioGroup
            value={selectedAddress}
            onChange={(event) => handleRadioChange(event.target.value)}
          >
            {addressDetailsAdded && addressDetailsAdded.length > 0 ? (
              addressDetailsAdded.map((elem) => (
                <Box
                  key={elem?._id}
                  sx={{
                    position: "relative",
                    boxShadow:
                      "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                    background: "#fff",
                    borderRadius: "20px",
                    padding: "40px",
                    marginBottom: "2rem",
                    ...styleData,
                  }}
                >
                  <Box>
                    <IconButton
                      color="secondary"
                      aria-label="remove address"
                      onClick={() => handleRemoveAddress(elem?._id)}
                      sx={{
                        position: "absolute",
                        right: "10px",
                      }}
                    >
                      <DeleteIcon style={{ color: "#801317" }} />
                    </IconButton>
                  </Box>

                  <FormControlLabel
                    value={elem?._id}
                    control={<Radio />}
                    label={`${elem?.name} (${elem?.addressType})`}
                  />

                  <FMTypography
                    displayText={elem?.address}
                    styleData={{
                      fontSize: "1rem",
                      color: "#717171",
                      fontWeight: "400",
                      marginBottom: "1rem",
                    }}
                  />
                  <FMDetailTypography
                    displayText1={"Mobile"}
                    displayText2={elem?.mobileNumber}
                    styleData1={{ marginBottom: "1rem" }}
                  />
                  <FMTypography
                    displayText={"Pay On Delivery Available"}
                    styleData={{ fontSize: "1rem", color: "#717171" }}
                  />
                </Box>
              ))
            ) : (
              <></>
            )}
          </RadioGroup>
        </Grid>
      </>
    );
  }
);

export default AllAddressComponent;
