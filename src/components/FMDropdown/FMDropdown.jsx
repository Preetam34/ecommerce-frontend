// FMDropdown.js
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FMDropdown = ({ name, options, id, onChange, sx, value, placeholder }) => {
  const [quantityOption, setQuantityOption] = useState(value !== undefined ? value : '');
  const optionChangeHandler = (e) => {
    setQuantityOption(e.target.value);
    onChange(e);
  };

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setQuantityOption(value);
    } else {
      setQuantityOption(options[0].label);
    }
  }, [value, options]);

  return (
    <Box sx={{ ...sx }}>
      <Select
        id={id || name}
        name={name}
        onChange={optionChangeHandler}
        value={quantityOption}
        sx={sx}
        displayEmpty
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default FMDropdown;
