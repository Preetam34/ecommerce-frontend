import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FMDeliveryDropdown = ({ name, options, id, onChange, sx, defaultValue, placeholder }) => {
    const [quantityOption, setQuantityOption] = useState(defaultValue);
    const optionChangeHandler = (e) => {
        setQuantityOption(e.target.value);
        onChange(e);
    };

    useEffect(() => {
        setQuantityOption(defaultValue);
    }, [defaultValue]);

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

                <MenuItem key={options[0]?.id} value={options[0]?.label} disabled selected>
                    {options[0]?.label}
                </MenuItem>

                {options && options
                    .slice(1) 
                    .map((option) => (
                        <MenuItem key={option?.id} value={option?.label}>
                            {option?.label}
                        </MenuItem>
                    ))}
            </Select>
        </Box>
    );
};

export default FMDeliveryDropdown;
