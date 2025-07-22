import {
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        <h1 className="flex justify-center items-center gap-3 text-3xl text-indigo-500">
          <FaRegUserCircle /> Buyer Login
        </h1>
      </div>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              autoComplete="email"
              className="shadow-lg"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              autoComplete="current-password"
              className="shadow-lg bg-transparent"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <VisibilityOff />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white transition-all duration-300 transform hover:scale-105"
              sx={{ padding: "12px" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="mt-4 flex justify-center items-center">
        <p>Don't have an account?</p>
        <button className="ml-2 text-indigo-500 hover:underline">
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
