import React from "react";

import { InputAdornment, Grid, TextField, IconButton } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input = ({
    half,
    name,
    label,
    autoFocus,
    type,
    handleChange,
    handleShowPassword,
}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                label={label}
                autoFocus={autoFocus}
                type={type}
                fullWidth
                // button at the side of input for show password
                InputProps={
                    name === "password"
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton onClick={handleShowPassword}>
                                          {type === "password" ? (
                                              <VisibilityIcon />
                                          ) : (
                                              <VisibilityOffIcon />
                                          )}
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }
                        : null
                }
            />
        </Grid>
    );
};

export default Input;
