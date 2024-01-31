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
import "./ResetPassword.css";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

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
        <h6 className="auth-heading">Reset Password</h6>
        <Stack spacing={1}>
          <Box>
            <InputLabel className="input-label">Email</InputLabel>
            <TextField
              size="small"
              name="email"
              onChange={() => {}}
              value={""}
              fullWidth
              id="my-input"
            />
          </Box>
          <Box>
            <InputLabel className="input-label">Reset Code</InputLabel>
            <TextField
              size="small"
              name="name"
              onChange={() => {}}
              value=""
              fullWidth
              id="my-input"
            />
          </Box>
          <Box>
            <InputLabel className="input-label">New Password</InputLabel>
            <TextField
              size="small"
              name="New Password"
              type={showPassword ? "text" : "password"}
              onChange={() => {}}
              value={""}
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
              name="New Password"
              type={showPassword ? "text" : "password"}
              onChange={() => {}}
              value={""}
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
        </Stack>

        <Stack
          direction="row"
          className="footer-stack new-account"
          style={{ justifyContent: "space-between", display: "flex" }}
          spacing={2}>
          <Link className="acc-link" to="/forgot-password">
            Back
          </Link>
          <Button
            variant="contained"
            color="primary"
            disabled={false}
            className="signin-btn"
            size="large"
            onClick={""}>
            CONTINUE
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
