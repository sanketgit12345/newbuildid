import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import buildLogo from "../assets/images/build_id_logo.png";
import loginBanner from "../assets/images/login_banner.png";
import "./Register.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { Postrequestcall } from "../apicall/Postrequest";
import { SIGNUP } from "../constant/Apipath";
import CryptoJS from 'crypto-js';

export default function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputvalue] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    retypePassword: "",
  })

  const inputValuechange = (e) => {
    setInputvalue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }

  const createNewUserAccount = async () => {
    const hash = CryptoJS.SHA256(inputValue?.password).toString();
    let signupObj = {
      Email: inputValue?.email,
      Password: hash,
      FirstName: inputValue?.firstName,
      LastName: inputValue?.lastName,
    }
    console.log("request......", signupObj);
    let getSignupresponse = await Postrequestcall(SIGNUP, signupObj,null);
    if (getSignupresponse?.status === 201) {
      navigate("/verification")
    }
    console.log("getSignupresponse.....", getSignupresponse);
  }


  return (
    <Grid container spacing={2} className="login-grid">
      <Grid item xs={12} sm={12} lg={7} xl={8} className="banner-section">
        <div className="login-header">
          <div className="flex-row">
            <img src={buildLogo} className="logo" />
          </div>
        </div>
        <div className="banner">
          <img className="login-banner" src={loginBanner} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} lg={5} xl={4} className="auth-grid">
        <h6 className="auth-heading">Create New Account</h6>
        <Stack spacing={1}>
          <Box>
            <InputLabel className="input-label">Email</InputLabel>
            <TextField
              size="small"
              name="email"
              onChange={(e) => inputValuechange(e)}
              value={inputValue?.email}
              fullWidth
              id="my-input"
            />
          </Box>
          <Box>
            <InputLabel className="input-label">First Name</InputLabel>
            <TextField
              size="small"
              name="firstName"
              onChange={(e) => inputValuechange(e)}
              value={inputValue?.firstName}
              fullWidth
              id="my-input"
            />
          </Box>
          <Box>
            <InputLabel className="input-label">Last Name</InputLabel>
            <TextField
              size="small"
              name="lastName"
              onChange={(e) => inputValuechange(e)}
              value={inputValue?.lastName}
              fullWidth
              id="my-input"
            />
          </Box>
          <Box>
            <InputLabel className="input-label">Password</InputLabel>
            <TextField
              size="small"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => inputValuechange(e)}
              value={inputValue?.password}
              fullWidth
              id="password-input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex="-1"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <InputLabel className="input-label">Retype Password</InputLabel>
            <TextField
              size="small"
              name="retypePassword"
              type={showPassword ? "text" : "password"}
              onChange={(e) => inputValuechange(e)}
              value={inputValue?.retypePassword}
              fullWidth
              id="password-input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex="-1"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              disabled={false}
              className="signin-btn"
              size="large"
              style={{marginTop:"1rem"}}
              fullWidth
              onClick={() => createNewUserAccount()}>
              Register
            </Button>
          </Box>
          <Stack
            direction="row"
            className="footer-stack new-account"
            style={{ justifyContent: "start" }}
            spacing={2}>
            <Link color="primary" to="/" className="acc-link">
              Login account
            </Link>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
