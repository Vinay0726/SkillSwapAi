import {
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React from "react";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        <h1 className="flex justify-center items-center text-3xl gap-3 text-green-500">
          <FaUserPlus /> Buyer Register
        </h1>
      </div>

      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              variant="outlined"
              className="shadow-lg"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              variant="outlined"
              className="shadow-lg"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              className="shadow-lg"
            />
            <Button
              variant="contained"
              size="small"
              className="mt-2 bg-blue-500 text-white"
            >
              Send OTP
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="otp"
              name="otp"
              label="Enter OTP"
              fullWidth
              variant="outlined"
              className="shadow-lg"
            />
            <Button
              variant="contained"
              size="small"
              className="mt-2 bg-green-500 text-white"
            >
              Verify OTP
            </Button>
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
              className="shadow-lg"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <FaEye />
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
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all duration-300 transform hover:scale-105"
              sx={{ padding: "12px" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="mt-4 flex justify-center items-center">
        <p>Already have an account?</p>
        <button className="ml-2 text-green-500 hover:underline">Login</button>
      </div>
    </div>
  );
};

export default RegisterForm;
